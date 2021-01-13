# GSAP Slider

Dependencies: GSAP, Ghost Utils: Timer

## Usage

slider.js is a single object template. A single page can have an infinite number of sliders.

Function | Description
------------ | -------------
slider.slide.onOpen(fn)* | Call a function when a slide opens
slider.slide.onClose(fn)* | Call a function when a slide closes

*Proposed feature

## 1: HTML Structure
Slider.js is only linked via data attributes. Any element attached to slider.js can be of any basic content element type, and have any desired classes.

The classes shown below are bare minimum Tailwind classes and are not required for functionality.

```html
<!-- Parent element: linked to slider.js by [data-slider] -->
<div data-slider class="relative">
    <!-- Single slide element: linked to slider.js by [data-slider] -->
    <div data-slide class="absolute active"></div>
    <div data-slide class="absolute"></div>

    <!-- Displays the current state -->
    <div data-nav>
        <!-- Bullet list (optional): linked by [data-bullets] -->
        <div data-bullets>
            <!-- A single bullet element: linked by [data-bullet], and used to generate additional bullets based on slider.length -->
            <div data-bullet class=""></div>
        </div>

        <!-- Previous button: linked by [data-func="prev"] -->
        <div data-func="prev" class="">Prev</div>
        <!-- Next button: linked by [data-func="next"] -->
        <div data-func="next" class="">Next</div>
    </div>
</div>
```

## 2: Define config values

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

## 3: Create new Slider object

```javascript
const slider = new Slider(config);
```

## Status
GSAP Slider is a part of Terrain's Ghost library, and is currently in development. Ghost is a library of foundational code blocks, designed for practical use on projects built with GSAP and Tailwind. 

Ghost's code is non-obtrusive, and does not create any actions without your direction. It is designed to be as agnostic as possible, allowing it to function freely accross a large variety of applications.

## License
[MIT](https://choosealicense.com/licenses/mit/)