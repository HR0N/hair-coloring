class Father{
    constructor(elem) {
        this.el = $(elem);
    }

    scroll_on(){
        if(typeof window === 'undefined') return;
        document.body.style.overflow = "visible";
        document.body.style.paddingRight = "0";
    }


    scroll_off(){
        if(typeof window === 'undefined') return;
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = "20px";
    }

    find(selector){return this.el.find(selector);}
}