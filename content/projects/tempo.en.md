## Piano practice that stays focused on the music

Tempo is a native macOS companion for practicing piano with digital sheet music. It combines MusicXML scores with live MIDI input, following each performance and providing immediate feedback without pulling attention away from the piece.

I designed the app around a quiet, score-first workspace. The goal was not to add more dashboards to practice, but to make the score itself responsive and useful while learning, repeating a difficult passage, or playing through a complete performance.

## From static score to active guide

Traditional digital sheet music shows what to play but cannot react to the musician. Tempo tracks the current position, highlights what comes next, and distinguishes correct, missed, and extra notes as they are played on a connected piano or MIDI keyboard.

Different practice modes adapt that feedback to the task. Guided mode waits for the expected notes, Section mode isolates a passage for repetition, and Performance mode keeps feedback restrained until the session is complete. Hand selection, tempo controls, looping, and focus mode give the player control without cluttering the score.

## Designing a calm native experience

The interface puts notation at the center and reveals supporting controls only where they are useful. A visual keyboard makes note input and feedback easy to understand, while the library organizes imported pieces, favorites, folders, and practice history.

Tempo is built in Swift and SwiftUI. CoreMIDI handles low-latency instrument input, Verovio engraves MusicXML scores, and the practice state connects live notes to the correct position in the music. Session data then turns each performance into useful feedback such as accuracy, practice time, and note breakdowns.

## The result

Tempo explores how software can support deliberate practice without becoming the center of it. It brings notation, real-time input, focused repetition, and progress into one native experience—while keeping the musician's attention where it belongs: on the music.
