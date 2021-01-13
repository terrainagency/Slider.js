# GSAP Slider

Dependencies: GSAP, Ghost Utils: Timer

## Usage

slider.js is a single object. 

## 1: Define config values

```javascript
let config = {
    container: document.querySelector("[data-slider]"),
    paused: false,
    timer: 1000,
}
```

## 2: Create new Slider object

```javascript
const slider = new Slider(config);
```

## Status
GSAP Slider is a part of Terrain's Ghost library, and is currently in active development.

## License
[MIT](https://choosealicense.com/licenses/mit/)