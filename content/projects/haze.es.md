## Un grabador de pantalla diseñado pensando en el resultado final

Haze es un grabador de pantalla nativo para macOS, creado para demos de producto, tutoriales y explicaciones visuales. Lo diseñé y desarrollé alrededor de una idea sencilla: grabar debe ser rápido, pero el resultado también debe sentirse cuidado y profesional.

En lugar de limitarse a capturar la pantalla, Haze reúne grabación y posproducción en un único flujo de trabajo. Registra la pantalla y el cursor por separado, propone momentos de zoom útiles y permite ajustar cada movimiento antes de exportar.

<img width="1200" height="943" alt="Editor con línea de tiempo de Haze" src="assets/editor.png" />

## El reto de producto

La mayoría de grabadores se centran en guardar píxeles en un archivo. Un buen vídeo de producto necesita algo más: el espectador debe saber dónde mirar, el cursor tiene que moverse de forma natural y los zooms deben acompañar la explicación sin distraer.

Mi objetivo era hacer accesibles esos detalles de presentación sin convertir Haze en un editor de vídeo complejo. La interfaz debía mantenerse tranquila y clara, pero ofrecer control preciso sobre la captura, el ritmo, los fotogramas clave de zoom y la calidad de exportación.

## Un flujo de edición centrado

El editor utiliza una línea de tiempo en la que la grabación, los datos del cursor y los zooms permanecen sincronizados. Las sugerencias automáticas de zoom ofrecen un buen punto de partida, mientras que los fotogramas clave editables permiten ajustar el encuadre y el ritmo de cada momento.

Haze permite capturar una pantalla, una ventana o una región, además de configurar los fotogramas por segundo y la resolución. Durante la exportación reconstruye un movimiento de cursor fluido y transiciones de zoom cinematográficas para producir un vídeo limpio.

## Desarrollo nativo

Desarrollé Haze con Swift y SwiftUI para que la experiencia se sintiera propia de macOS. Metal se encarga del renderizado necesario para combinar de forma eficiente el vídeo capturado, la capa del cursor y el encuadre animado.

El proyecto combina diseño de producto, interfaces nativas, procesamiento multimedia y animación. El resultado es una herramienta que entiende la grabación de pantalla como un medio de presentación, no solo como una utilidad de captura.
