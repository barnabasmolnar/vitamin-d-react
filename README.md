# Get some vitamin D

The same application as described [here](https://github.com/barnabasmolnar/vitamin-d).
The difference being that the rendering here is done on the client with the popular React js library as opposed to server side rendering with jinja templates. Flask here is merely used as an API server that returns json responses.

### Technologies used:
* Python
* Flask
* Client side rendering with React
* Docker for development and to containerize the app

### SVGs used:
* [Zondicons - A set of free premium SVG icons. By Steve Schoger](http://www.zondicons.com/)

Instructions to install and run the app will follow shortly...

### TODO:
* [ ] Add detailed instructions to README
* [ ] Add purgeCSS + additional npm scripts
* [ ] Look into dockerizing the frontend build process

### DONE(ish)
* [x] Look into adding some animations/transitions ==> Response data now slides in from left and slides out right with a nice fade animation. There's some design decisions to be made, however, about the loading and error components as they currently cause some annoying jumps in layout when they are added to and removed from the DOM. One option might be to present them as a sort of overlay. Will need to think about this a bit more...