export class Timer {
    constructor(fn, t) {
        this.fn = fn
        this.t = t
        this.timer = setInterval(this.fn, this.t)
    }
    stop() {
        if(this.timer) {
            clearInterval(this.timer)
            this.timer = null
        }
        return this;
    }
    start() {
        if(!this.timer) {
            this.stop()
            this.timer = setInterval(this.fn, this.t)
        }
        return this
    }
    reset(t) {
        this.t = t
        return this.stop().start()
    }
}

export class Slider {
    constructor(settings) {
        this.settings = settings
        this.container = document.querySelector(this.settings.container),
        this.slides = [],
        this.current = 0,
        this.initialize()
    }
    initialize() {
        this.nav = this.initNav()
        this.initButtons()
        this.initSlides()

        // If no start value is specified, default to 0
        if(!this.settings.start) {this.settings.start = 0} 
        this.current = this.settings.start

        // If the slider is not paused, create and execute a timer
        if(!this.settings.interval) {this.settings.interval = 5000}
        if(this.settings.paused === undefined) {this.settings.paused = true}

        if(!this.settings.paused) {
            this.timer = new Timer(() => {this.changeSlide(1)}, this.settings.interval)
        }
    }
    // Creates an object for each [data-slide] found within [data-slider]
    initSlides() {
        let arr = this.container.querySelectorAll(this.settings.slides)

        arr.forEach(slide => {
            let obj = {
                name: slide.dataset.name,
                container: slide,
            }
            this.slides.push(obj)
        })
    }
    initNav() {
        let nav = {
            nextBtn: this.container.querySelector("[data-func='next']"),
            prevBtn: this.container.querySelector("[data-func='prev']"),
            bullets: this.container.querySelector("[data-bullets]"),
        }

        // Duplicate the bullet HTML for each slide
        let str = nav.bullets.innerHTML
        for(var i = 0; i < this.slides.length-1; i++) {
            nav.bullets.innerHTML += str
        }

        return nav
    }
    initButtons() {
        this.nav.nextBtn.addEventListener('click', () => {
            this.reset()
            this.changeSlide(1)
        });

        this.nav.prevBtn.addEventListener('click', () => {
            this.reset()
            this.changeSlide(-1)
        });
    }
    init() {
        this.changeSlide(this.settings.start)
    }
    changeSlide(dir) {
        let i = this.current
        this.current = this.current + dir

        // Reverse cycle to last slide
        if(this.current < 0) {
            this.current = this.slides.length-1
        }

        // Cycle to first slide
        else if(this.current >= this.slides.length) {
            this.current = 0
        }

        console.log(`Move ${i} to ${this.current}`)

        // let animateSecond = () => this.slides[this.current].onOpen()
        // let animateFirst = () => {
        //     this.slides[i].onClose()
        //     animateSecond()
        // }
        // animateFirst()

        this.slides[i].onClose()
        this.slides[this.current].onOpen()

    }
    reset() {
        if(!this.settings.paused) {this.timer.reset(this.settings.interval)}
    }
    openSlide(slide, fn) {
        fn(slide);
    }
    closeSlide(slide, fn) {
        fn(slide);
    } 
}






