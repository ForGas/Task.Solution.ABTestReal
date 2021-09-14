import React, { Component } from 'react';
import UserForm from '../UserForm/UserForm';
import ButtonCalculate from '../ButtonCalculate';

export default class Profiling extends Component {
    constructor (props) {
        super(props);

        this.state = {
            logs: [],   
            error: '',
            isError : false,
        };

        this.handlerProfiling = this.handlerProfiling.bind(this)
    }

    componentDidMount() {
        this.populateProfiling();
    }

    handlerProfiling() {
        this.populateProfiling();
    }

    async populateProfiling() {
        const response = await fetch('users/logs', 
            { 
                method: 'GET', 
                headers: {'Content-Type': 'application/json'}
            }
        );

        console.log('start profiling')
        console.log(response)

        const data = await response.json()

        if (response.ok) {
            this.setState({ logs: data});
        }
        else {
            this.setState({error: data.error, isError: true})
        }
    }

    render() {
        const {logs, error, isError} = this.state;
        
        return <>
                    {
                        isError 
                            ? <div>Ошибка {error}</div> 
                            : <div></div>
                    }

                    <div id="profiling">
                        <span className="profiling-text">Profiling</span>
                        {logs.map((log, index) => {
                            return(
                                <div key={index}>
                                    {log}
                                </div>)
                        })}
                    </div>

                    <UserForm handlerProfiling={this.handlerProfiling} />

                    <ButtonCalculate handlerProfiling={this.handlerProfiling}  />
                </>
    }
}

  