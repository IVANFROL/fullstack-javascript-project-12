import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authActions } from '../slices/auth'
import { useSignupMutation } from '../api/chatApi'
import { pages as pagesRoutes } from '../utils/routes'

const useSignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [signup] = useSignupMutation()

  const handleSignUp = async (values, actions) => {
    try {
      const result = await signup(values).unwrap()
      localStorage.setItem('user', JSON.stringify(result))
      dispatch(authActions.setAuth(result))
      navigate(pagesRoutes.root())
    }
    catch (err) {
      if (err.status === 409) {
        actions.setFieldError('username', 'userExists')
      }
      else {
        throw err
      }
    }
  }

  return { handleSignUp }
}

export default useSignUp
