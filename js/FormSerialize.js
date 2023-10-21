class FormSerialize extends Father{

    #fetch_field(data, field){
        field && field.map((k, v)=>{
            data[$(v).attr('name')] = $(v).val();
        });
    }

    values(event){  // inputs must have name
        let data = {};
        let form = event.target;
        let input = $(form).find('input');
        let textarea = $(form).find('textarea');
        let select = $(form).find('select');

        this.#fetch_field(data, input);
        this.#fetch_field(data, textarea);
        this.#fetch_field(data, select);

        return data;
    }

}