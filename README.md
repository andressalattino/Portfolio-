# Portfolio de Andres Salattino

Sitio estático con HTML, Tailwind CSS y JavaScript, disponible en inglés y español.

## Desarrollo local

Instalá Node.js y ejecutá desde esta carpeta:

```sh
npm ci
npm run dev
```

Abrí http://127.0.0.1:4173. Usá un servidor HTTP: los módulos JavaScript no se cargan al abrir el HTML con doble clic.
El sitio utiliza los CDN de Tailwind y Google Fonts; necesita conexión para esos recursos.

## Organización

- Los cinco HTML contienen el contenido y la navegación, con texto de respaldo en inglés.
- app.js inicializa los módulos de src/js: idioma, menú, tema y animación de inicio.
- src/js/translations.js concentra todos los textos en inglés y español. Los atributos data-i18n relacionan cada texto con su traducción; data-i18n-alt y data-i18n-aria traducen los nombres accesibles.
- src/js/tailwind-config.js comparte la configuración de Tailwind entre páginas.
- src/Styles.css contiene estilos propios y la animación de habilidades.
- assets/ e img/ contienen iconos e imágenes.

El selector guarda el idioma en localStorage (portfolio-language), y el tema conserva la clave original (tema). Si el navegador bloquea el almacenamiento, los controles siguen funcionando en la página actual.

## Identidad Arcane

El tema claro representa Piltover y el oscuro representa Zaun. `src/js/arcane.js`
comparte las atmósferas, los personajes y los efectos de los CTAs; `src/Styles.css`
define sus variables, capas y ajustes responsive. Se monta únicamente el arte del
tema activo, conservando los botones y enlaces nativos y las preferencias existentes.

- Inicio: cartel de The Last Drop como imagen principal, arma de Jinx pequeña abajo
  a la derecha y grafitis en Zaun; nubes pintadas y dos dirigibles en Piltover.
  En Zaun, Isha tiene cuatro poses pequeñas que cambian de lugar al tocarlas; el
  cuarto toque reemplaza el cartel por Isha y Jinx. La secuencia se reinicia al recargar.
- Sobre mí: avatar urbano o elegante, dentro del mismo espacio de 256 × 223 px.
- Educación: Heimerdinger en modo claro.
- Tecnologías, dentro de Educación: Viktor con dos seguidores tenues en modo oscuro.
- Contacto: Jinx en oscuro y Vi en claro, dentro del mismo espacio de 180 × 200 px.

Los recursos están optimizados en `assets/arcane/`. Inicio y Educación
usan las cuatro capas de la implementación proporcionada, con intensidad media y
12 partículas en escritorio (6 visibles en móvil). El desenfoque se prepara una vez
en cuatro WebP mediante `python scripts/render-zaun-fog.py` (requiere Pillow); el navegador anima
sus transformaciones sin recalcular filtros grandes. El componente no agrega
un fondo opaco ni una viñeta sobre el fondo común de las cinco páginas.
Sobre mí, Proyectos y Contacto conservan el gas con texturas. Las decoraciones no
interceptan eventos y respetan movimiento reducido; se simplifican en pantallas pequeñas.

Cada HTML incluye un bloque crítico en el head que aplica el tema guardado antes de cargar recursos externos. El contenido se mantiene oculto hasta que app.js termina de aplicar las traducciones y sincronizar el botón de tema, evitando mostrar el idioma o tema de respaldo al navegar. El fondo inicial coincide con el tema elegido. Si falla la descarga del módulo o tarda más de diez segundos, se muestra el contenido de respaldo en inglés para mantener el sitio accesible; sin JavaScript, el HTML se muestra normalmente. Este bloque debe mantenerse igual en las cinco páginas.

## Calidad de código

```sh
npm run check
npm run format
npm run lint
npm run fix
```

Biome está fijado a una versión exacta. Revisa JavaScript, JSON, CSS y HTML; el soporte de formato HTML se activa explícitamente porque aún es experimental. Los recursos gráficos y el archivo de dependencias quedan fuera del formato.

## Editar contenido

Para cambiar textos, actualizá ambas entradas (en y es) en translations.js y el texto de respaldo del HTML correspondiente. Los proyectos se editan en projects.html. Al agregar una página, mantené la navegación consistente en los cinco HTML.

## Publicación

No requiere compilación: el sitio se sirve desde la raíz. Conservá los HTML, app.js, src/, assets/ e img/ al publicarlo.
