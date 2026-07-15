## Practicar piano manteniendo el foco en la música

Tempo es una aplicación nativa para macOS pensada para practicar piano con partituras digitales. Combina partituras MusicXML con entrada MIDI en directo, sigue cada interpretación y ofrece información inmediata sin apartar la atención de la pieza.

El objetivo era que la propia partitura respondiera y resultara útil al aprender, repetir un pasaje difícil o interpretar una pieza completa.

## De partitura estática a guía activa

Una partitura digital tradicional muestra qué tocar, pero no puede reaccionar al músico. Tempo sigue la posición actual, destaca lo que viene a continuación y diferencia las notas correctas, omitidas y adicionales mientras se tocan desde un piano conectado o teclado MIDI.

Los distintos modos adaptan esa respuesta a cada objetivo. El modo guiado espera las notas correctas, el modo de sección aísla un fragmento para repetirlo y el modo interpretación mantiene la información en segundo plano hasta terminar la sesión. La selección de manos, el tempo, los bucles y el modo concentración ofrecen control sin llenar la partitura de elementos innecesarios.

## Diseñar una experiencia nativa y tranquila

La interfaz sitúa la notación en el centro y muestra los controles de apoyo solo cuando son útiles. Un teclado visual facilita entender la entrada y la respuesta de las notas, mientras que la biblioteca organiza las piezas importadas, los favoritos, las carpetas y el historial de práctica.

Tempo está desarrollado con Swift y SwiftUI. CoreMIDI gestiona la entrada del instrumento con baja latencia, Verovio dibuja las partituras MusicXML y el estado de práctica conecta las notas en directo con su posición correcta en la música. Después, los datos de cada sesión se convierten en información útil como precisión, tiempo de práctica y desglose de notas.

## El resultado

Tempo explora cómo el software puede acompañar una práctica consciente sin convertirse en su centro. Reúne notación, entrada en tiempo real, repetición enfocada y progreso en una única experiencia nativa, manteniendo la atención del músico donde debe estar: en la música.
