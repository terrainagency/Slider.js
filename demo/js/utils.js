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
        this.current = 0;

        this.init()
    }
    init() {
        this.initButtons()
        this.initSlides()
        console.log(this)

        // If a start slide is specified
        if(this.settings.start) {
            this.current = this.settings.start
        }

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
                onOpen: this.settings.onOpenSlide, 
                onClose: this.settings.onCloseSlide,
            }
            this.slides.push(obj)
        });

        // Change slide to first slide
        this.changeSlide(this.current)

        // // Creates a Slide object for each [data-slide] found within [data-slider]
        // let arr = this.settings.container.querySelectorAll("[data-slide]")

        // arr.forEach(slide => {
        //     let newSlide = new Slide({
        //         name: slide.dataset.name,
        //         container: slide,
        //         onOpen: null, 
        //         onClose: null,
        //     })
        //     this.slides.push(newSlide);
        // });

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
            this.changeSlide(this.current++, "next")
        });

        this.nav.prevBtn.addEventListener('click', () => {
            this.reset()
            this.changeSlide(this.current--, "prev")
        });
    }
    changeSlide(i, dir) {
        console.log(`i before: ${i}`)
        // switch(dir) {
        //     case "next":
        //         break
        //     case "prev":
        //         break
        //     case undefined:
        //         break
        // }

        // Reverse cycle to last slide
        if(i < 0) {
            dir = "recycle"
            this.current = this.slides.length-1
        }
        // Cycle to first slide
        else if(i >= this.slides.length-1) {
            dir = "cycle"
            this.current = 0
        }

        // this.slides[0].onClose()
        // this.slides[this.current].onOpen()


        console.log(`Move ${dir} to: ${this.current}`)


        // // Handle Recycle
        // if(this.current < 0) {
        //     dir = "recycle"
        //     this.current = this.slides.length-1
        //     if(this.settings.onRecycle){this.settings.onRecycle()} // Recycle Callback
        // }
        // // Handle Cycle
        // else if(this.current >= this.slides.length) {
        //     dir = "cycle"
        //     console.log("CYCLE TIME")
        //     this.current = 0
        //     if(this.settings.onCycle){this.settings.onCycle()} // Cycle Callback
        // }

        // console.log(`dir: ${dir} current: ${this.current}`)

        // // If slider is going to next slide
        // switch (dir) {
        //     case "next":
        //         if(this.slides[(this.current - 1)].onClose){this.slides[(this.current - 1)].onClose()}
        //         if(this.slides[this.current].onOpen){this.slides[this.current].onOpen()}
        //         break;
        //     case "prev": 
        //         if(this.slides[(this.current + 1)].onClose){this.slides[(this.current + 1)].onClose()}
        //         if(this.slides[this.current].onOpen){this.slides[this.current].onOpen()}
        //         break;
        //     case "recycle":
        //         this.slides[this.current].onClose()
        //         this.slides[this.slides.length-1].onOpen()
        //         break;
        //     case "cycle":
        //         this.slides[this.current].onClose()
        //         this.slides[0].onOpen()
        //         break;
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

// export class Slide {
//     constructor(settings) {
//         this.settings = settings,
//         this.init()
//     }
//     init() {
//         console.log(this);
//     }
//     onOpen() {}
//     onClose() {}
// }






