import React, { Component } from 'react';
import UserForm from '../UserForm/UserForm';
import ButtonCalculate from '../ButtonCalculate';

export default class Profiling extends Component {
    constructor (props) {
        super(props);

        this.state = {
            logs: [],   
            error: null,
            isLoaded: false,
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
        const response = await fetch('users/logs', { method: 'GET' });
        const data = await response.json();
        
        if (response.ok) {
            this.setState({ logs: data, isLoaded: true });
        }
        else {
            this.setState({error: data.error, isError: true})
        }

        return data;
    }

    render() {
        const {logs, error, isLoaded, isError} = this.state;
        
        return !isLoaded 
            ? <div>Loading</div>
            : isError
                ? <div>{error}</div>
                :
                <>
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

  