import React, { Component } from 'react';
import Profiling from './Profiling/Profiling';

import './home.css'
export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
        <div className="main_content">
            <span className="main_head">TASK</span>
            <Profiling/>
        </div>
    );
  }
}
