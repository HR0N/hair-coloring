class Header extends Father{
    constructor(el) {
        super(el);

        this.detShow = false;

        this.ul = this.find('ul');
        this.open = this.find('.open');
        this.close = this.find('.close');

        this.events();
    }

    toggleShowHandler(){
        this.detShow = !this.detShow;
        if(this.detShow){
            this.open.css({'display':'none'});
            this.close.css({'display':'flex'});
            this.ul.css({'max-height':'236px'});
        }else{
            this.ul.css({'max-height':'64px'});
            this.open.css({'display':'flex'});
            this.close.css({'display':'none'});
        }
    }

    events(){
        this.open.on('click', this.toggleShowHandler.bind(this));
        this.close.on('click', this.toggleShowHandler.bind(this));
    }

}
new Header('header');