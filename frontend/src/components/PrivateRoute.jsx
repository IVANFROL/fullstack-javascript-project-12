import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectAuth, getStoredUser } from '../slices/auth'
import { pages } from '../utils/routes'

const PrivateRoute = ({ children }) => {
  const auth = useSelector(selectAuth)
  const userAuthInfo = getStoredUser()

  if (!auth.token && !userAuthInfo) {
    return <Navigate to={pages.login()} replace />
  }

  return children
}

export default PrivateRoute
