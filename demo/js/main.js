import {Slider} from './utils.js'

document.addEventListener('DOMContentLoaded', () => {

    // Define slider as a new object of type Slider
    const slider = new Slider({
        container: document.querySelector("[data-slider]"),
        start: 0,
        paused: true,
        interval: 3000,
    })

    // GSAP Timelines for the slider below:
    slider.slides.forEach(slide => {
        let tlOpenSlide = new TimelineMax({paused: true})
            .to(slide.container, {backgroundColor: "#f0f"})

        slide.onOpen = () => tlOpenSlide.play()
        slide.onClose = () => tlOpenSlide.reverse()
    })
    let tlCycleSlider = new TimelineMax({paused: true})
        .to(slider.settings.container, {backgroundColor: "#0f0"})
        .to(slider.settings.container, {backgroundColor: "#fff"})

        slider.onCycle = () => tlCycleSlider.play()

    let tlRecycleSlider = new TimelineMax({paused: true})
        .to(slider.settings.container, {backgroundColor: "#00f"})
        .to(slider.settings.container, {backgroundColor: "#fff"})

        slider.onRecycle = () => tlRecycleSlider.play()

})