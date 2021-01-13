export class Timer {
    constructor(fn, t) {
        this.fn = fn
        this.t = t
        this.timer = setInterval(this.fn, this.t)
        this.init()
    }
    init() {
        console.log(this)
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
        this.slides = [],
        this.nav = this.initNav()
        this.current = 0

        this.init()
    }
    init() {
        this.initButtons()
        this.initSlides()

        console.log(this)

        // If the slider is not paused, create and execute a timer
        if(!this.settings.paused) {
            this.timer = new Timer(() => {
                let dir = true
                this.current++
                this.changeSlide(dir)

            }, this.settings.interval)
        };
    }
    initSlides() {
        // Creates an object for each [data-slide] found within [data-slider]
        let arr = this.settings.container.querySelectorAll("[data-slide]")

        arr.forEach(slide => {
            let obj = {
                name: slide.dataset.name,
                container: slide,
                onOpen: null, 
                onClose: null,
            }
            this.slides.push(obj)
        });

    }
    initNav() {
        let container = this.settings.container.querySelector("[data-nav]");

        let nav = {
            nextBtn: container.querySelector("[data-func='next']"),
            prevBtn: container.querySelector("[data-func='prev']"),
            bullets: container.querySelector("[data-bullets]"),
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
            let dir = true
            this.current++
            this.changeSlide(dir)
        });

        this.nav.prevBtn.addEventListener('click', () => {
            this.reset()
            let dir = false
            this.current--
            this.changeSlide(dir)
        });
    }
    changeSlide(dir) {
        // console.log("Progress forward? " + dir);
        // console.log(this.current);

        // Handle Recycle
        if(this.current < 0) {
            this.current = this.slides.length-1
            if(this.settings.onRecycle){this.settings.onRecycle()} // Recycle Callback
        }
        // Handle Cycle
        else if(this.current >= this.slides.length) {
            this.current = 0
            if(this.settings.onCycle){this.settings.onCycle()} // Cycle Callback
        }

        // If slider is going to next slide
        // if(dir) {
        //     this.closeSlide(this.slides[(this.current-1)].node, this.settings.onClose)
        //     this.openSlide(this.slides[this.current].node, this.settings.onOpen)
        // } else {
        //     this.closeSlide(this.slides[(this.current)].node, this.settings.onClose)
        //     this.openSlide(this.slides[this.current+1].node, this.settings.onOpen)
        // }

    }
    reset() {
        if(!this.settings.paused) {this.timer.reset(this.settings.interval)}
    }
    openSlide(slide, fn) {
        fn(slide);
    } // Open Callback
    closeSlide(slide, fn) {
        fn(slide);
    } 
}






