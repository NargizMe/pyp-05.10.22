import React, { useState } from 'react';
import {Routes, Route} from "react-router";
// import './App.css';
import User from './user';
import AddUser from './user/addUser.jsx';
import Home from './home/index.jsx';
import About from './about/index.jsx';
import {Link} from "react-router-dom";
import {
    Box,
    Container,
    Flex,
    ButtonGroup,
    Button,
    useBreakpointValue,
    useColorModeValue,
} from '@chakra-ui/react';

function App() {

  return (
    <div className="App">
        <Box as="section" pb={{ base: '12', md: '24' }}>
            <Box as="nav" bg="bg-surface" boxShadow={useColorModeValue('sm', 'sm-dark')}>
                <Container py={{ base: '4', lg: '5' }}>
                    <Flex justify="space-between" flex="1">
                        <ButtonGroup variant="link" spacing="8">
                            <Button>
                                <Link to='/'>Home</Link>
                            </Button>
                            <Button>
                                <Link to='/user'>User</Link>
                            </Button>
                            <Button>
                                <Link to='/about'>About</Link>
                            </Button>
                            <Button>
                                <Link to='/user/add'>Add User</Link>
                            </Button>
                        </ButtonGroup>
                    </Flex>
                </Container>
            </Box>
        </Box>

        <Routes>
            <Route path = '/user' element={<User/>}/>
            <Route path = '/' element={<Home/>}/>
            <Route path = '/about' element={<About/>}/>
            <Route path = '/user/add' element={<AddUser/>}/>
        </Routes>
    </div>
  )
}

export default App
