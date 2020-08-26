import axios from 'axios'

export const register = newUser => {
  return axios
    .post('/users/register', {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password
    })
    .then(response => {
      console.log('Registered')
    })
}


export const userdata = oldUser =>{
  return axios
  .get('users/logindata', {
    headers: { Authorization: ` ${oldUser}` }
  })
  .then(response => {
    console.log('all users' )
    return response.data
  })
  .catch(err => {
    console.log(err)
  })
}


export const getProfile = token => {
  return axios
    .get('users/profile', {
      headers: { Authorization: ` ${token}` }
    })
    .then(response => {
      console.log(response)
      return response.data
    })
    .catch(err => {
      console.log(err)
     })
    
}