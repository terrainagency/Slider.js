# GSAP Slider

Dependencies: GSAP, Ghost: utils.js {Timer}

## Usage

slider.js is a 2kb (minified) single object template intended for use with GSAP and TailwindCSS. GSAP is utilized to attach timelines to slider callbacks, and is Tailwind ready due to its agnostic nature.

## 1: HTML Structure
Slider.js is linked via data attributes. Any element attached to slider.js can be of any element type, and have any desired classes.

```html
<!-- Parent element: linked to slider.js by [data-slider] -->
<div data-slider>
    <!-- Single slide element: linked to slider.js by [data-slider] -->
    <div data-slide></div>

    <!-- Displays the current state -->
    <div data-nav>
        <!-- Bullet list (optional): linked by [data-bullets] -->
        <div data-bullets>
            <!-- A single bullet element: linked by [data-bullet], and used to generate additional bullets based on slider.length -->
            <div data-bullet></div>
        </div>

        <!-- Previous button: linked by [data-func="prev"] -->
        <div data-func="prev">Prev</div>
        <!-- Next button: linked by [data-func="next"] -->
        <div data-func="next">Next</div>
    </div>
</div>
```

## 2: Define config values

```javascript
const slider = new Slider({
    container: "[data-slider]",
    slides: "[data-slide]",
    start: 0,
    paused: true,
    interval: 3000,
})
```

Key | Options | Default
------------ | ------------- | -------------
start | num | 0
paused | true, false | true
interval | num | 2000
lazy* | true, false | false
progress* | node | undefined

* Proposed feature

## 3: Define GSAP timelines

A timeline can be attached to any of the Slider callback functions. Timelines *must* come after the Slider object is defined, and thus have access to the Slider object itself. 

Timelines can be structured in any way compatable with GSAP, as long as they are appropriately attached to a Slider callback function.

```javascript
let tl = new TimelineMax({paused: true}) 
    .to(slider.settings.container, {backgroundColor: "#0f0"})

slider.onCycle = () => tl.play()
```

> Tip: Setting paused:true on your timeline will allow you to call GSAP methods like .play() .reverse() manually. 


To attach timelines to slides, a forEach format is recommended along with a master timeline:

```javascript
// Create a master timeline for slides
let slideMaster = new TimelineMax()

// Define GSAP Timelines for each slider callback:
slider.slides.forEach(slide => {
    function myTimeline () {
        let tl = new TimelineMax({paused: false})
            .to(slide.container, {backgroundColor: "#f0f"}, ">") 

        return tl
    }

    slide.onOpen = () => slideMaster.add(myTimeline())
})
```

> Note: Remember that the value of Slider callbacks like slider.onCycle is a function, and can do whatever you want it to be


## Callback Functions

Function | Description
------------ | -------------
slide.onOpen(**fn**) | Call a function when a slide opens
slide.onClose(**fn**) | Call a function when a slide closes
slide[ **value** ].onOpen(**fn**)* | Override the function called when slide[name] opens
slide[ **value** ].onClose(**fn**)* | Override the function called when slide[name] closes
slider.onCycle(**fn**) | Call a function when the slider cycles to the last slide
slider.onRecycle(**fn**) | Call a function when the slider recycles to the first slide
slider.onLoad(**fn**)* | Call a function when the slider loads

*Proposed feature

## Status
GSAP Slider is a part of **Terrain's Ghost library**, and is currently in development. Ghost is a library of foundational code blocks, designed for practical use on projects built with GSAP and Tailwind. 

Ghost's code is non-obtrusive, and does not create any actions without your direction. It is designed to be as agnostic as possible, allowing it to function freely accross a large variety of applications.

*Coming soon: Shopify schema compatibility for Slider settings*

## License
[MIT](https://choosealicense.com/licenses/mit/)
