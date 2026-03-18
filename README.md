# gremlins-playlist

Playlist maker for live shows (made with Vue3 and Vuetify)

## Description

This is a weekend project that I've built to handle many live shows with my band [Gremlins Soundtracks](https://www.youtube.com/@gremlinssoundtracks).  
The whole project is a SPA, no APIs, no external services (at the moment).  

The page is a list of songs: I can choose between them to fill the needed show time (example: 2 stage hours counting a mean of 10 seconds pause between songs).  

The playlist generated has a unique ID used to be shared with the band or to re-load the "saved" list.  
This way I can create the songs list while waiting at the postal office, then refine it after dinner on the couch :D

## Development notes

### First setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```
