import React, {Component} from 'react';

export default class UserForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],   
            error: null,
            isLoaded: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.populateUserData();
    }

    async populateUserData() {
        const response = await fetch('users', { method: 'GET' });
        const data = await response.json();
        this.setState({ users: data, isLoaded: true });
    }

    render() { 
        const {isLoaded, error, users} = this.state;
        const placeholder = 'DAY / MONTH / YEAR';
        const maxLength = "10";
    
        return (error)
                ? <p>Error {error.message}</p>
                : (!isLoaded) 
                ? <p><em>Loading...</em></p>
                : <form onSubmit={this.handleSubmit} method='post' action='users' id="user_form">
                    <table className="form_table">  
                        <tbody>
                            <tr>
                                <th className="th_text">UserID</th>
                                <th className="th_text">Date Registration</th>
                                <th className="th_text">Date Last Activity</th>
                            </tr>

                            {users.map((user, index) => 
                                <tr key={user.id}>
                                    <td><label htmlFor="id" form="user_form">{user.id}</label></td>
                                    <td>
                                        <input mask={user.id} type= "text" value={user.dateRegistration} placeholder={placeholder}
                                            onChange={(e) => this.onUpdateDateRegistration(index, e)} 
                                            maxLength = {maxLength}                    
                                        />
                                    </td>
                                    <td>
                                        <input mask={user.id} type= "text" value={user.dateLastActivity} placeholder={placeholder}
                                            onChange={(e) => this.onUpdateDateLastActivity(index, e)} 
                                            maxLength = {maxLength}                    
                                        />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>  
                    <div className="b_save_container">
                        <input type="submit" className="b_save" id="b_save" value="Save" /> 
                    </div>
                </form>
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

        fetch("users", {  
            method: "PATCH",  
            headers: {    "Content-type": "application/json"  },  
            body: JSON.stringify(users)
        }).then(response => {    
            console.log(response.status);     
            return response.json();  }
        ).then(data => console.log(data));
        
        // var xhr = new XMLHttpRequest();
        // xhr.open("post", "users", true);
        // xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        // let json = JSON.stringify(users);

        // xhr.send(json);

        // xhr.onload = () => {

        //     if (xhr.status !== 200) {
        //         alert(`Error ${xhr.status}: ${xhr.statusText}`);
        //         console.log(xhr.responseText)
        //       } else {
        //         alert(xhr.response);
        //     }
        // }
    }
}
