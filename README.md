This is a web app to help with doing color work with jelly cubes. It can render up to a 10x10 and supports all 3 styles of jelly cube.
Fair warning, rendering a 10x10 takes my PC about 5 seconds and adds a persistent 15% CPU load while the app window is open on my development/gaming PC.

Features:

- Color Selection Interface. Up to 5 colors can be preserved using the blue + button for quickly selecting between colors.
- The green slider bars adjust visibility on each of the layers to allow you to access the inner layers of the cube. The Show All Rings button will reset the visibility sliders so all rings are displayed again.
- Functions for saving/importing your colored cube data and saved color swatches
  Light and dark mode for changing your background color.
- _NEW_ Print Mode, lays your cube out layer by layer for easy building offline.

One small caveat: Colored rings preserve themselves as you change shape or increase or decrease shape, but once a color drops off from shrinking the cube it won't restore itself when the cube gets bigger. I'll try to preserve all color data in the future, but it's going to require a large-ish rewrite of data storage functions.

https://jelly-cube.onrender.com/
