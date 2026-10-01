# Portfolio de Andres Salattino

Sitio estático con HTML, Tailwind CSS y JavaScript, disponible en inglés y español.

## Desarrollo local

Instalá Node.js y ejecutá desde esta carpeta:

```sh
npm ci
npm run dev
```

Abrí http://127.0.0.1:4173. Usá un servidor HTTP: los módulos JavaScript no se cargan al abrir el HTML con doble clic.
El sitio utiliza los CDN de Tailwind, Google Fonts y Devicon; necesita conexión para esos recursos.

## Organización

- Los cinco HTML contienen el contenido y la navegación, con texto de respaldo en inglés.
- app.js inicializa los módulos de src/js: idioma, menú, tema y animación de inicio.
- src/js/translations.js concentra todos los textos en inglés y español. Los atributos data-i18n relacionan cada texto con su traducción; data-i18n-alt y data-i18n-aria traducen los nombres accesibles.
- src/js/tailwind-config.js comparte la configuración de Tailwind entre páginas.
- src/Styles.css contiene estilos propios y la animación de habilidades.
- assets/ e img/ contienen iconos e imágenes.

El selector guarda el idioma en localStorage (portfolio-language), y el tema conserva la clave original (tema). Si el navegador bloquea el almacenamiento, los controles siguen funcionando en la página actual.

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
