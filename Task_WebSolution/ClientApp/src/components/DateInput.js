import React, { Component } from 'react'

export default class DateInput extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.keyPressFunc = this.keyPressFunc.bind(this);

        this.state = { 
            inputName: props.inputName,
            user: props.user,
            textDate: ''
        }
    }
    
    keyPressFunc(e) {
        if (e.which === 8) {
            var date = this.state.textDate;
            this.setState({textDate: this.removeSeparateInDate(date)})
        }
    }

    removeSeparateInDate(textDate) {       
        return textDate.length === 3 || textDate.length === 6 
            ? textDate.slice(0, textDate.length-1) : textDate;
    }

    handleChange(e) {
        const inputName = this.state.inputName;
        var inputNumber = e.target.value;

        inputNumber += inputNumber.length === 2 
            ? '.' : inputNumber.length === 5 
            ? '.' : '';

        if (inputName === "dateRegistration") {
            this.setState({
                textDate: inputNumber,
                user: {...this.state.user, dateRegistration: inputNumber },
                ...this.inputName
            });
        } else {
            this.setState({
                textDate: inputNumber,
                user: {...this.state.user, dateLastActivity: inputNumber },
                ...this.inputName
            });
        }
    }
   
    render() {
        const {textDate, inputName} = this.state;
        const placeholder = 'DAY / MONTH / YEAR';
        const maxLength = "10";

        return ( <input type = "text" value={textDate} placeholder={placeholder}
            onChange = {this.handleChange} onKeyDown={this.keyPressFunc} maxLength = {maxLength}
            //pattern="(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}"
            htmlFor={inputName} name={inputName} form="user_form"
            />
        );
    }
}