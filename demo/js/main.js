import {Slider} from './utils.js';

document.addEventListener('DOMContentLoaded', () => {

    const slider = new Slider({
        container: document.querySelector("[data-slider]"),
        paused: false,
        interval: 3000,
        onCycle: () => {console.log("slider: onCycle()")},
    });

    slider.settings.onRecycle = () => {console.log("slider: onRecycle()")};
});
