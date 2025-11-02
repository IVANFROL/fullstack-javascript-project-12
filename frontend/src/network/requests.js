import axios from 'axios'

const verApi = import.meta.env.VITE_API_VER || '/api/v1'

export const loginRequest = values => axios({
  method: 'post',
  url: `${verApi}/login`,
  data: {
    username: values.username,
    password: values.password,
  },
}).then((res) => {
  const token = JSON.stringify(res.data)
  localStorage.setItem('user', token)
})

export const signUpRequest = values => axios({
  method: 'post',
  url: `${verApi}/signup`,
  data: {
    username: values.username,
    password: values.password,
  },
})
