class Callback extends Father{
    constructor(elem) {
        super(elem);
        this.env = new Env();

        this.input_phone = this.el.find('input[name="phone"]');
        this.submit = this.el.find('.submit');
        this.input_value = '';
        this.callback_modal_window = $(document).find('.callback_modal_window');
        this.close = this.callback_modal_window.find('.close');


        this.events();
    }

    sendMessage(callback = ()=>{}){ /* используйте GET запрос в PHP*/
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            method: 'POST',
            url: `https://api.telegram.org/bot${this.env.bot_token()}/sendMessage`,
            cache: false,
            data: {
                chat_id: this.env.group_id(),
                text: this.create_message(),
                parse_mode: "HTML"
            },
            success: function (data) {
                callback(data);
            },
            error: function (data, textStatus, errorThrown) {
                console.log('ERROR_A-X');
            },
        });
    }

    create_message(){
        const phone = this.input_phone.val();
        if(phone.length > 2){
            return `☎️ <code>${phone.replace('+38 ', '')}</code>`;
        }else{return false;}
    }

    inputHandler(e){
        this.input_value = $(e.currentTarget).val();
        if(this.input_value === '+38 '){
            this.input_value = '';
        }

        $(e.currentTarget).val(this.input_value.trim());
    }
    submitHandler(){
        this.callback_modal_window.css({'display':'flex'});
        this.scroll_off();
        this.sendMessage(() => {
            setTimeout(() => {
                this.callback_modal_window.css({'display':'none'});
                this.scroll_on();
            }, 4000)});
    }


    events(){
        this.input_phone.on('input', this.inputHandler.bind(this));
        this.submit.on('click', this.submitHandler.bind(this));

        this.close.on('click', () => {
            this.callback_modal_window.css({'display':'none'});
            this.scroll_on();
        })
    };
}