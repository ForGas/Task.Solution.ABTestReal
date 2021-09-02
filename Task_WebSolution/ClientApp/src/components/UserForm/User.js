import React, { Component } from 'react';
import DateInput from './DateInput';

export default class User extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            id: props.user.id,
            dateRegistration: props.user.dateRegistration,
            dateLastActivity: props.user.dateLastActivity,
        };
        //this.handleChange = this.handleChange.bind(this);
        // this.onChangeDateRegistration = this.onChangeDateRegistration.bind(this);
        // this.onChangeDateLastActivity = this.onChangeDateLastActivity.bind(this);
    }

    onChangeDateRegistration(e) {       

        if (Date.parse(e.target.value) > Date.parse(this.state.user.dateLastActivity)) {
            e.target.value = this.state.user.dateLastActivity;
        }

        this.state.user.dateRegistration = e.target.value;    

        // this.setState({
        //     user: {
        //         ...this.state.user,
        //         dateRegistration: e.target.value
        //     }
        // });
        console.log(this.state.user.dateRegistration);
    }

    onChangeDateLastActivity(e) {

        if (Date.parse(this.state.user.dateRegistration) > Date.parse(e.target.value)) {
            e.target.value = this.state.user.dateRegistration;
        }

        this.state.user.dateLastActivity = e.target.value;

        // this.setState({
        //     user: {
        //         ...this.state.user,
        //         dateLastActivity: e.target.value
        //     }
        // });
        console.log(this.state.user.dateLastActivity);
    }

    handleChange(e) {
        this.setState({
          ...this.state,
          [e.target.name]: e.target.value.trim()
        });

        console.log(this.state.user.dateRegistration);
        console.log(e.target.value);
    };

    render() {
        const id = this.state.id;

        return (
            <tr key={id}>
                <td><label htmlFor="id" form="user_form" >{id}</label></td>
                <td><DateInput name="dateRegistration" onChange={this.handleChange} /></td>
                <td><DateInput name="dateLastActivity" onChange={this.handleChange} /></td>
            </tr>
        )
    }
}