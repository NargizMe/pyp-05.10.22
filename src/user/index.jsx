import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
    Box,
    Container,
    Flex,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    useBreakpointValue,
    useColorModeValue, ButtonGroup, Button, Input, Heading
} from '@chakra-ui/react';
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";


const DisplayingErrorMessagesSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
});

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
            <TableContainer>
                <Table size='sm'>
                    <Thead>
                        <Tr>
                            <Th>First Name</Th>
                            <Th>Last Name</Th>
                            <Th>BirTh Day</Th>
                            <Th>Email</Th>
                            <Th>Action</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            users.map((el, i) => {
                                return <Tr key = {i}>
                                    <Td>{el.firstName}</Td>
                                    <Td>{el.lastName}</Td>
                                    <Td>{el.birthDay}</Td>
                                    <Td>{el.email}</Td>
                                    <Td>
                                        <button onClick={() => handleDelete(el._id)}>X</button>
                                    </Td>
                                    <Td>
                                        <button onClick={() => handleChange(el)}>Change</button>
                                    </Td>
                                </Tr>
                            })
                        }
                    </Tbody>
                </Table>
            </TableContainer>
            <div>
                <Heading as='h4' size='md' style={{marginTop: '50px'}}>Edit</Heading>
                <form style={{display: 'flex', flexDirection: 'column', rowGap: '13px', width:"400px"}}>
                    <Input placeholder='First Name' type="text" value={val.firstName}
                           onChange={(e) => setVal({...val, firstName: e.target.value})}/>
                    <Input placeholder='Last Name' type="text" value={val.lastName}
                           onChange={(e) => setVal({...val, lastName: e.target.value})}/>
                    <Input placeholder='Email' type="text" value={val.email}
                           onChange={(e) => setVal({...val, email: e.target.value})}/>
                    <Input placeholder='Birth Day' type="text" value={val.birthDay}
                           onChange={(e) => setVal({...val, birthDay: e.target.value})}/>
                    <Button onClick={(e) => handleEdit(e)} colorScheme='blue'>Save Changes</Button>
                </form>
            </div>
        </div>
    )
}

export default User