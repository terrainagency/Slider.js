import {Slider} from './utils.js';

document.addEventListener('DOMContentLoaded', () => {

    let config = {
        container: document.querySelector("[data-slider]"),
        paused: false,
        timer: 1000,
    }
    const slider = new Slider(config);
});

// const timer = new Timer(() => {
//     console.log("Do something");
// }, 200);
