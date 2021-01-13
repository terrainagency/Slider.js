# GSAP Slider

Dependencies: GSAP, Ghost Utils: Timer

## Usage

slider.js is a single object. 

Function | Description
------------ | -------------
slider.slide.onOpen(fn)* | Call a function when a slide opens
slider.slide.onClose(fn)* | Call a function when a slide closes

*Proposed feature


## 1: Define config values

```javascript
let config = {
    container: document.querySelector("[data-slider]"),
    paused: true,
    interval: 1000,
}
```

Key | Options
------------ | -------------
paused | false (default), true
interval | num

## 2: Create new Slider object

```javascript
const slider = new Slider(config);
```

## Status
GSAP Slider is a part of Terrain's Ghost library, and is currently in development. Ghost is a library of foundational code blocks, designed for practical use on projects built with GSAP and Tailwind. 

Ghost's code is non-obtrusive, and does not create any actions without your direction. It is designed to be as agnostic as possible, allowing it to function freely accross a large variety of applications.

## License
[MIT](https://choosealicense.com/licenses/mit/)