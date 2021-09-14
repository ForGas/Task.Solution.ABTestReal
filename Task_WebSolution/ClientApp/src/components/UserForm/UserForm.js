import React, {Component} from 'react';
import StatusForm from './StatusForm';

export default class UserForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],   
            error: null,
            isLoaded: false,
            isSubmit: false,
            isSave: false,
            validateErrors: {},
            disabledButton: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.populateUserData();
    }

    async populateUserData() {
        const response = await fetch('users', { 
            method: 'GET', 
            headers: {"Content-type": "application/json" }
        });

        console.log(response);

        const data = await response.json();

        console.log(data);

        if (response.ok) {
            this.setState({ users: data, isLoaded: true});
        }
        else {
            this.setState({error: data.error})
        }
    }

    render() { 
        const {isLoaded, error, users, isSubmit, isSave, validateErrors, disabledButton} = this.state;
        const placeholder = 'DAY / MONTH / YEAR';
        const maxLength = "10";
            
        return (error || users.length === 0)
            ? <p>Error</p>
            : (!isLoaded) 
                ? <p><em>Loading...</em></p>
                :
                <>
                    <StatusForm validateErrors={validateErrors} isSubmit={isSubmit} isLoaded={isLoaded} isSave={isSave} />

                    <form onSubmit={this.handleSubmit} method='post' action='users' id="user-form">
                        <table className="form_table">  
                            <tbody>
                                <tr>
                                    <th className="th_text">UserID</th>
                                    <th className="th_text">Date Registration</th>
                                    <th className="th_text">Date Last Activity</th>
                                </tr>
                            
                                {users.map((user, index) => 
                                    <tr key={user.id}>
                                        <td><label htmlFor="id" form="user-form">{user.id}</label></td>
                                        <td>
                                            <label></label>
                                            <input type= "text" value={user.dateRegistration} placeholder={placeholder}
                                                onChange={(e) => this.onUpdateDateRegistration(index, e)} 
                                                maxLength = {maxLength}                    
                                            />
                                        </td>
                                        <td>
                                            <input type= "text" value={user.dateLastActivity} placeholder={placeholder}
                                                onChange={(e) => this.onUpdateDateLastActivity(index, e)} 
                                                maxLength = {maxLength}                    
                                            />
                                        </td>
                                    </tr>
                                )}             
                            </tbody>
                        </table>
                        <div className="b_save_container">
                            <input type="submit" className="b_save"
                            style={{backgroundColor: disabledButton ? '#0357bb' : '#4A9DFF'}} 
                            value="Save" disabled={disabledButton} /> 
                        </div>  
                    </form>
                </>
                
    }
   
    removeSeparateInDate(value) {       
        return value.length === 3 || value.length === 6 
            ? value.slice(0, value.length-1) : value;
    }

    addSeparateInDate(value) {       
        return value += value.length === 2
            ? '.' : value.length === 5
                ? '.' : '';
    }

    onUpdateDateRegistration = (index, e) => {
        const user = this.state.users[index];
        let dateRegistration = e.target.value;

        dateRegistration = user.dateRegistration.length > dateRegistration.length 
            ? this.removeSeparateInDate(dateRegistration)
            : this.addSeparateInDate(dateRegistration);
        
        this.setState(state => {
            return state.users.map((user, otherIndex) => {
                  return otherIndex === index
                      ? user.dateRegistration = dateRegistration
                      : user;
              }
          );
        });

        console.log(this.state.users);
    };

    onUpdateDateLastActivity = (index, e) => {
        const user = this.state.users[index];

        let dateLastActivity = e.target.value;

        dateLastActivity = user.dateLastActivity.length > dateLastActivity.length 
            ? this.removeSeparateInDate(dateLastActivity)
            : this.addSeparateInDate(dateLastActivity);

        this.setState(state => {
            return state.users.map((user, otherIndex) => {
                    return otherIndex === index
                        ? user.dateLastActivity = dateLastActivity
                        : user;
                }
            );
        });
    
        console.log(this.state.users);
    };

    handleSubmit(e) {
        e.preventDefault();

        const users = this.state.users;

        this.setState(state => { 
            return {disabledButton: true}
        });
        
        fetch("users", {  
            method: "PATCH",  
            headers: {"Content-type": "application/json"},  
            body: JSON.stringify(users)
        }).then(async response => {
            if (response.status === 400) {
                const data = await response.json();

                this.setState({validateErrors: Object.values(data.errors), isSubmit: true, isSave: false})

                const result = this.state.validateErrors.map((value) => {
                    return value;
                }).join('\n')
                
                alert(result)
            }
            else {
                this.setState({validateErrors: {}, isSubmit: true,  isSave: true})

                this.populateUserData();
            }

        });

        setTimeout(this.props.handlerProfiling(), 1000);

        this.setState(state => { 
            return {disabledButton: false}
        });
    }
}