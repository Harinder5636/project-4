import React, { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react'
import userService from '../../utils/userService';
import { useNavigate} from 'react-router-dom';



export default function SignUpPage({handleSignupOrLogin}) {
console.log(handleSignupOrLogin)
  const navigate = useNavigate()



  const [error, setError] = useState('');
  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
    passwordConf: '',
    school: ''
  })
  
  const [selectedFile, setSelectedFile] = useState('')
  
  
  function handleFileInput(e){
    console.log(e.target.files)
    setSelectedFile(e.target.files[0])
  }
  
  function handleChange(e){
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
   }
   
   
   async function handleSubmit(e){

    e.preventDefault()
    
    try {


     
      const formData = new FormData();
      
      formData.append('photo', selectedFile)
 
      for (let fieldName in state){
       formData.append(fieldName, state[fieldName])
     }
    
      
      const respond = await userService.signup(formData);
      console.log(respond);
      handleSignupOrLogin()
      console.log('handlesighuporloginworking')
      navigate('/')





     

      
    } catch (err) {
      setError(err.message)
    }
   }

    



    return (
      <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image/> Sign Up
        </Header>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              name="username"
              placeholder="username"
              value={state.username}
              onChange={handleChange}
              required
            />
            <Form.Input
              type="email"
              name="email"
              placeholder="email"
              value={state.email}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="password"
              type="password"
              placeholder="password"
              value={state.password}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="passwordConf"
              type="password"
              placeholder="Confirm Password"
              value={state.passwordConf}
              onChange={handleChange}
              required
            />
            <Form.Input
              type="school"
              name="school"
              value={state.school}
              placeholder="School"
              onChange={handleChange}
            />
            <Form.Field>
              <Form.Input
                type="file"
                name="photo"
                placeholder="upload image"
                onChange={handleFileInput}
              />
            </Form.Field>
           
          </Segment>
          {error ? <ErrorMessage error={error} /> : null}
        </Form>
        <Button type="submit" onClick={handleSubmit} className="btn">
              Signup
            </Button>
      </Grid.Column>
    </Grid>
      );
}
