import { useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import { selectToastMessage } from '../slices/toast.js'
import { pages as pagesRoutes } from '../utils/routes.js'
import { selectAuth } from '../slices/auth.js'

const MainHeader = () => {
  const { t, i18n } = useTranslation('Components', { keyPrefix: 'MainHeader' })
  const authInfo = useSelector(selectAuth)
  const handleAccountExit = () => {
    localStorage.removeItem('user')
  }
  const toastMessage = useSelector(selectToastMessage)
  useEffect(() => {
  }, [authInfo])

  const generatorMessages = {
    0: () => toast.success(i18n.t(toastMessage.code, { ns: 'toast' })),
    1: () => toast.error(i18n.t(toastMessage.code, { ns: 'toast' })),
  }

  if (toastMessage) generatorMessages[toastMessage.id]()

  return (
    <>
      <ToastContainer
        pauseOnFocusLoss={false}
      />
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <a
            className="navbar-brand"
            href={pagesRoutes.root()}
            aria-label={t('aria.toMainPage')}
          >
            {
              t('brandName')
            }
          </a>
          {
            authInfo.token
              ? (
                  <Button
                    variant="primary"
                    href={pagesRoutes.login()}
                    onClick={handleAccountExit}
                    aria-label={t('aria.leave')}
                  >
                    {
                      t('leave')
                    }
                  </Button>
                )
              : null
          }
        </div>
      </nav>
    </>
  )
}

export default MainHeader
