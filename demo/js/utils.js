export class Timer {
    constructor(fn, t) {
        this.fn = fn;
        this.t = t;
        this.timer = setInterval(this.fn, this.t);
        this.init();
    }
    init() {
        console.log(this);
    }
    stop() {
        if(this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        return this;
    }
    start() {
        if(!this.timer) {
            this.stop();
            this.timer = setInterval(this.fn, this.t);
        }
        return this;
    }
    reset(t) {
        this.t = t;

        return this.stop().start();
    }
}

export class Slider {
    constructor(settings) {
        this.settings = settings;
        this.slides = this.settings.container.querySelectorAll("[data-slide]"),
        this.nav = this.initNav();
        this.current = 0;

        this.init();
    }
    init() {
        console.log(this);

        // If the slider is not paused, create and execute a timer
        if(!this.settings.paused) {
            this.timer = new Timer(() => {

                this.current++;
                this.changeSlide();

            }, this.settings.interval);
        };

        this.initButtons();
    }
    initNav() {
        let container = this.settings.container.querySelector("[data-nav]");

        let nav = {
            nextBtn: container.querySelector("[data-func='next']"),
            prevBtn: container.querySelector("[data-func='prev']"),
            bullets: container.querySelector("[data-bullets]"),
        }

        // Duplicate the bullet HTML for each slide
        let str = nav.bullets.innerHTML;
        for(var i = 0; i < this.slides.length-1; i++) {
            nav.bullets.innerHTML += str;
        }

        return nav;
    }
    initButtons() {
        this.nav.nextBtn.addEventListener('click', () => {
            this.timer.reset(this.settings.interval);
            this.changeSlide(this.current++);
        });

        this.nav.prevBtn.addEventListener('click', () => {
            this.timer.reset(this.settings.interval);
            this.changeSlide(this.current--);
        });
    }
    changeSlide() {
        // Handle Recycle
        if(this.current < 0) {
            this.current = this.slides.length-1;
            if(this.settings.onRecycle){this.onRecycle(this.settings.onRecycle)}; // Recycle Callback
        }
        // Handle Cycle
        else if(this.current >= this.slides.length) {
            this.current = 0;
            if(this.settings.onCycle){this.onCycle(this.settings.onCycle)}; // Cycle Callback
        }

        this.slides.forEach((slide) => {
            slide.classList.remove("active");
        })
        this.slides[this.current].classList.add("active");
    }
    onOpen(fn) {fn()} // Open Callback
    onClose(fn) {fn()} // Close Callback
    onRecycle(fn) {fn()} // Recycle Callback
    onCycle(fn) {fn()} // Cycle Callback
}






