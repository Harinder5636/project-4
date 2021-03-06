import React, { useState } from 'react';
import './LoginPage.css';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import userService from '../../utils/userService';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

export default function LoginPage({handleSignUpOrLogin}){
    const [invalidForm, setValidForm] = useState(false);
    const [error, setError] = useState('')
    const [state, setState] = useState({
        email: '',
        password: '',
    })

    const navigate = useNavigate();
    
    function handleChange(e){
      setState({
        ...state,
        [e.target.name]: e.target.value
      })
    }
    
    
    
    async function handleSubmit(e){
      
      try {
        e.preventDefault()
         await userService.login(state)
         handleSignUpOrLogin()
         navigate('/')
         
        
        
        } catch (err) {
          
          setError(err.message)
        }
      }

    
 




    return (
        <>
          <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
            <Image/> Log-in to your account
            </Header>
            <Form  autoComplete="off"  onSubmit={handleSubmit}>
               <Segment stacked>
                  <Form.Input
                    type="email"
                   
                    name="email"
                    placeholder="email"
                    value={ state.email}
                    onChange={handleChange}
                    required
                  />
                  <Form.Input
                    name="password"
                    type="password"
                    placeholder="password"
                    value={ state.password}
                    onChange={handleChange}
                    required
                  />
                <Button
                  color='teal'
                  fluid size='large'
                  type="submit"
                  className="btn"
                  disabled={invalidForm}
                >
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              New to us? <Link to='/signup'>Sign Up</Link>
            </Message>
            {error ? <ErrorMessage error={error} /> : null}
            </Grid.Column>
          </Grid>
        </>
      );
}

