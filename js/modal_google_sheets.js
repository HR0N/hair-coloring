class Modal_google_sheets extends Father{
    constructor(el) {
        super(el);

        this.form = this.find('form');

        this.events();
    }

    get_date(){
        let currentDate = new Date();

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1; // Месяцы в JavaScript начинаются с 0, поэтому добавляем 1
        let year = currentDate.getFullYear();
        let hours = currentDate.getHours();
        let minutes = currentDate.getMinutes();

        minutes = minutes < 10 ? '0' + minutes : minutes;

        return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year} ${hours < 10 ? '0' + hours : hours}:${minutes}`;
    }

    send_to_google_sheets(e){
        const scriptURL = '';
        const form = this.form[0];

        e.preventDefault();
        let googleFormData = new FormData(form);
        console.log(this.get_date());
        googleFormData.append('date', this.get_date());
        fetch(scriptURL, { method: 'POST', body: googleFormData})
            .then(response => console.log('Success!', response))
            .catch(error => console.error('Error!', error.message));
    }
    events(){
        this.form.on('submit', this.send_to_google_sheets.bind(this));
    };
}

$(document).ready(() => {
    new Modal_google_sheets('.modal_window_google_sheets')
});