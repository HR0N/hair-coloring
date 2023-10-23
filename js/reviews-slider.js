class ReviewsSlider extends Father{
    constructor(el) {
        super(el);

        this.slider = this.find('.slider');
        this.btn_prev = this.find('.hicon-chevron-left');
        this.btn_next = this.find('.hicon-chevron-right');
        this.slider_count = this.find('.count');

        this.mobile_width = window.innerWidth < 430;

        this.events();
    }

    slider_start(){
        if(!this.mobile_width){
            $(this.slider).slick({
                infinite: true,
                slidesToShow: 2,
                slidesToScroll: 2,
                arrows: false
            });
        }else{
            this.mobile_sittings();
        }
    }

    prev_slide(){
        $(this.slider).slick('slickPrev');
        this.change_slider_count_interface();
    }
    next_slide(){
        $(this.slider).slick('slickNext');
        this.change_slider_count_interface();
    }
    change_slider_count_interface(){
        const slick = $(this.slider).slick('getSlick');
        let currentSlideIndex;
        let totalSlides;
        if(this.mobile_width){
            currentSlideIndex = Math.floor(slick.slickCurrentSlide());
            totalSlides = Math.ceil(slick.slideCount);
        }else{
            currentSlideIndex = Math.floor(slick.slickCurrentSlide() / 2);
            totalSlides = Math.ceil(slick.slideCount / 2);
        }
        this.slider_count.html(`${currentSlideIndex + 1} / ${totalSlides}`);
    }

    mobile_sittings(){
        $(this.slider).slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false
        });
        this.change_slider_count_interface();
    }

    events(){
        this.slider_start();
        this.btn_prev.on('click', this.prev_slide.bind(this));
        this.btn_next.on('click', this.next_slide.bind(this));
    }
}

$(document).ready(() => {
    new ReviewsSlider('.section-reviews');
});