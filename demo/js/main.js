import {Slider} from './utils.js'

document.addEventListener('DOMContentLoaded', () => {

    // Define slider as a new object of type Slider
    let slider = new Slider({
        container: "[data-slider]",
        slides: "[data-slide]",
        start: 0,
        paused: true,
        interval: 3000,
    })

    // slide master timeline
    let slideMaster = new TimelineMax()

    // GSAP Timelines for the slider below:
    slider.slides.forEach(slide => {
        function openSlide () {
            let tl = new TimelineMax({paused: true})
                .to(slide.container, {backgroundColor: "#f0f"}, ">")

            return tl
        }
        function closeSlide () {
            let tl = new TimelineMax({paused: true})
                .to(slide.container, {backgroundColor: "#fff"}, ">")

            return tl
        }

        slide.onOpen = () => slideMaster.add(openSlide().play())
        slide.onClose = () => slideMaster.add(closeSlide().play())
    })
    let tlCycleSlider = new TimelineMax({paused: true})
        .to(slider.settings.container, {backgroundColor: "#0f0"})
        .to(slider.settings.container, {backgroundColor: "#fff"})

        slider.onCycle = () => tlCycleSlider.play()

    let tlRecycleSlider = new TimelineMax({paused: true})
        .to(slider.settings.container, {backgroundColor: "#00f"})
        .to(slider.settings.container, {backgroundColor: "#fff"})

        slider.onRecycle = () => tlRecycleSlider.play()

    slider.init()
})