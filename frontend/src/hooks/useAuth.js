import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { authActions } from '../slices/auth'
import { pages as pagesRoutes } from '../utils/routes'

const useAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('user')
    dispatch(authActions.removeAuth())
    navigate(pagesRoutes.login())
  }

  return { handleLogout }
}

export default useAuth
