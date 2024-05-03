import React from "react";
import { BrowserRouter as Router, useNavigate, useNavigation, useRoutes } from "react-router-dom";
type Props = {
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}
const Login = ({setIsAuthenticated}:Props) => {
  const navigate = useNavigate()

  const login = async () => {
    try {
      const username = document.getElementById('username') as HTMLInputElement
      const password = document.getElementById('password') as HTMLInputElement
      const body = {
        username: username.value,
        password: password.value
      }
  
      const response = await fetch(
        'http://localhost:4000/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body)
        }
      )
        .then((response: Response) => {
          if (response.status === 403) {
            return console.log('Failed to log in')
          } else if (response.status === 200) {
            return response.json()
          }
        }).then((response) => {
          return response
        })
  
      if (response?.accessToken) {
        localStorage.setItem('token', response?.accessToken)
        navigate('/')
        setIsAuthenticated(true)
      }
    } catch(error) {
      console.error(error)
    }
  }

  return(
    <>
      <input type='text' id='username' />
      <input type='password' id='password' />
      <button type='button' onClick={login}>Login</button>
    </>
  );
}
export default Login
