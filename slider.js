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

            }, this.settings.timer);
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
            this.timer.reset(this.settings.timer);
            this.changeSlide(this.current++);
            console.log("next clicked");
        });

        this.nav.prevBtn.addEventListener('click', () => {
            this.timer.reset(this.settings.timer);
            this.changeSlide(this.current--);
        });
    }
    changeSlide() {
        if(this.current < 0) {this.current = this.slides.length-1}
        else if(this.current >= this.slides.length) {this.current = 0}

        this.slides.forEach((slide) => {
            slide.classList.remove("active");
        })
        this.slides[this.current].classList.add("active");
    }
}





