import React, { Component } from 'react';
import UserForm from './UserForm/UserForm';
import ButtonCalculate from './ButtonCalculate';
//import React, { userState, memo } from 'react';

import './home.css'
export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
        <div className="main_content">
            <span className="main_head">TASK</span>
            <UserForm />

            <ButtonCalculate/>
        </div>
    );
  }
}
