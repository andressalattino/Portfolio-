"""Bake the supplied CSS fog gradients and blur once for inexpensive compositing."""

from pathlib import Path

from PIL import Image, ImageFilter

ASSETS = Path(__file__).resolve().parents[1] / "assets" / "arcane"
STOPS = {
    "a": [(0, (145, 169, 52, 153)), (0.35, (64, 123, 52, 102)), (0.7, (64, 123, 52, 0))],
    "b": [(0, (72, 61, 155, 153)), (0.45, (50, 91, 100, 77)), (0.73, (50, 91, 100, 0))],
    "c": [(0, (140, 171, 64, 136)), (0.48, (119, 115, 43, 51)), (0.72, (119, 115, 43, 0))],
    "d": [(0, (86, 94, 51, 119)), (0.67, (86, 94, 51, 0))],
}

# This ellipse uses the same farthest-corner falloff as the original CSS.
radial = Image.radial_gradient("L").resize((1024, 350), Image.Resampling.BICUBIC)
for name, stops in STOPS.items():
    colors = []
    for value in range(256):
        position = value / 255
        color = (0, 0, 0, 0)
        for (start, first), (end, second) in zip(stops, stops[1:]):
            if start <= position <= end:
                progress = (position - start) / (end - start)
                alpha = first[3] * (1 - progress) + second[3] * progress
                rgb = [
                    round((first[i] * first[3] * (1 - progress) + second[i] * second[3] * progress) / alpha)
                    if alpha else 0
                    for i in range(3)
                ]
                color = (*rgb, round(alpha))
                break
        colors.append(color)
    image = Image.merge("RGBA", [radial.point([color[channel] for color in colors]) for channel in range(4)])
    # Blur premultiplied channels so transparent edges cannot acquire a black fringe.
    image = image.convert("RGBa").filter(ImageFilter.GaussianBlur(25)).convert("RGBA")
    target = ASSETS / f"zaun-fog-{name}.webp"
    image.save(target, "WEBP", quality=90, method=6)
    print(f"{target.name}: {target.stat().st_size // 1024} KB")
