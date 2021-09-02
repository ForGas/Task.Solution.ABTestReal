import React, { Component } from 'react';
import Select from 'react-select';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalBarSeries} from 'react-vis';
import DiffDates from './DiffDates';
import UniqueDate from './UniqueDate';
import RollingRetentionCount from './RollingRetentionCount';


export default class RollingRetentionX extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            users: props.users,
            selectedOption: null,
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    };

    sizeBar(userData) {
        return userData.length * 30;
    }

    
    render() {
        const {users, selectedOption} = this.state;
        const uniqueDateArr = UniqueDate(users);

        let userData = [];
        
        if (selectedOption !== null) {
            userData = users.filter(user=> user.dateRegistration === selectedOption.value).map((user, index) => {
                return {x: (index + 1), y: DiffDates(new Date(user.dateLastActivity), new Date(user.dateRegistration))}
            })
        }

        return (
            <div className="main_retention">
                <span className="main_head">Rolling Retention X day</span>

                <Select
                        value={this.state.selectedOption}
                        onChange={this.handleChange}
                        options={uniqueDateArr}
                        className="main_select"
                />

                <XYPlot
                    width={850}
                    height={600}
                    margin={{top: 20, right: 50}}
                    stackBy="y"
                    color={'#e2ba24'}
                    opacity={1}
                    yDomain={[0, 30]}
                    xType="ordinal"
                    >
                    
                    <XAxis title="User" 
                    style={{text: {stroke: 'none', fill: '#1923f0', fontWeight: 900}}}/>

                    <YAxis title="Day" tickFormat={day => `${day}`} 
                    style={{text: {stroke: 'none', fill: '#3c3cf4', fontWeight: 600}}} />

                    <YAxis
                    title="Rolling Retention"
                    orientation="right"
                    
                    tickFormat={day => `${RollingRetentionCount(userData, day)}%`} 
                    tickLabelAngle={5}
                    style={{text: {stroke: 'none', fill: '#471a04', fontWeight: 900}}} />

                    <VerticalBarSeries data={userData} barWidth={1} style={{stroke: '#574810', strokeWidth: 1}}/>
                    <HorizontalGridLines style={{stroke: 'black', strokeWidth: 1}} />
                </XYPlot>

            </div>
        )
    }
}

