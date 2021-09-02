import React from 'react';
import {useState} from 'react';
import {produce} from 'immer';

interface User {
    id: number,
    dateRegistration: string,
    dateLastActivity: string,
}

const Test = () => {
    console.log('gg');
    const usersTest = populateUserData();
    const [users, updateStateUsers] = useState<User[]>([{id:1, dateRegistration:'', dateLastActivity:''}]);

    return (
        <div>
             {users.map((user, index) => 
                <tr key={user.id}>
                    <td>
                        <label>{user.id}</label>
                    </td>
                    <td>
                        <input type = "text" value={user.dateRegistration} placeholder=""
                            onChange={e => {
                                const dateRegistration = e.target.value;
                                
                                updateStateUsers(currentUsers =>
                                    produce(currentUsers, (u) => {
                                        u[index].dateRegistration = dateRegistration;
                                    })
                                );
                            }}
                        />
                    </td>
                    <td>
                        <input type = "text" value={user.dateLastActivity} placeholder=""
                            onChange={e => {
                                const dateLastActivity = e.target.value;
                                
                                updateStateUsers(currentUsers =>
                                    produce(currentUsers, (u) => {
                                        u[index].dateLastActivity = dateLastActivity;
                                    })
                                );
                            }}
                        />
                    </td>
                </tr>
            )}
        </div>      
    );
}

async function populateUserData() {
    const response = await fetch('users', { method: 'GET' });
    const data = await response.json();
    return data;
}


export default Test;