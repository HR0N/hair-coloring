class SectionExperience extends Father{
    constructor(el) {
        super(el);

        this.items_to_count = this.el.find('.col1 .count');

        this.is_el_visible = false;
        this.events();
    }

    isElementInViewport(el) {
        let rect = el.getBoundingClientRect();
        return (
            rect.bottom > 0 &&
            rect.top < (window.innerHeight || document.documentElement.clientHeight)
        );
    }
    onScroll() {
        if(this.is_el_visible) return;
        if (this.isElementInViewport(this.el[0])) {
            this.is_el_visible = true;
            this.count_item();
        } else {
        }
    }
    count_item(){
        this.items_to_count.map((k, v)=>{
            let targetValue = parseInt(v.getAttribute('data-value'));
            let increment = Math.round(targetValue / 40) < 1 ? 1 : Math.round(targetValue / 40);
            let currentValue = 0;
            let has_plus = v.getAttribute('data-value').includes('+');

            // Увеличиваем значение числа в элементе с интервалом 50 миллисекунд
            let interval = setInterval(function() {
                if (currentValue >= targetValue) {
                    clearInterval(interval);
                } else {
                    currentValue += increment;
                    v.textContent = `${currentValue > targetValue ? targetValue : currentValue}` + `${has_plus ? '+' : ''}`;
                }
            }, 60);
        });
    }

    events(){
        $(window).on('scroll', this.onScroll.bind(this));
        $(window).on('load', this.onScroll.bind(this));
    }

}

$(document).ready(() => {
    new SectionExperience('.section-experience');
});