import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

function User() {
    const [users, setUsers] = useState([]);
    const [val, setVal] = useState({
        _id: '',
        firstName: '',
        lastName: '',
        email: '',
        birthDay: ''
    });


    async function getUsers(){
        const result = await axios('http://localhost:8080/getUsers');
        setUsers(result.data);
    }
    useEffect(() =>  {
        getUsers()
    }, []);

    async function handleDelete(id){
        await axios.delete(`http://localhost:8080/deleteUser/${id}`);
        getUsers()
    }

    async function handleChange(el){
        setVal({
            _id: el._id,
            firstName: el.firstName,
            lastName: el.lastName,
            email: el.email,
            birthDay: el.birthDay,
        })
    }

    async function handleEdit(e){
        e.preventDefault()
        await axios.put(`http://localhost:8080/changeUser/${val._id}`, val);
        getUsers()
    }

    return (
        <div>
            <nav>
                <Link to='/user/add'>Add User</Link>
            </nav>
            <h1>I am User</h1>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Birth Day</th>
                        <th>Email</th>
                        <th>Action</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((el, i) => {
                            return <tr key = {i}>
                                <td>{el.firstName}</td>
                                <td>{el.lastName}</td>
                                <td>{el.birthDay}</td>
                                <td>{el.email}</td>
                                <td>
                                    <button onClick={() => handleDelete(el._id)}>X</button>
                                </td>
                                <td>
                                    <button onClick={() => handleChange(el)}>Change</button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>

            <div>
                <h2>Edit</h2>
                <form>
                    <input type="text" value={val.firstName}
                           onChange={(e) => setVal({...val, firstName: e.target.value})}/>
                    <input type="text" value={val.lastName}
                           onChange={(e) => setVal({...val, lastName: e.target.value})}/>
                    <input type="text" value={val.email}
                           onChange={(e) => setVal({...val, email: e.target.value})}/>
                    <input type="text" value={val.birthDay}
                           onChange={(e) => setVal({...val, birthDay: e.target.value})}/>
                    <button onClick={(e) => handleEdit(e)}>Save Changes</button>
                </form>
            </div>
        </div>
    )
}

export default User