import { ErrorBoundary, Provider as RollBarProvider } from '@rollbar/react'
import ReactDOM from 'react-dom/client'
import i18next from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import leo from 'leo-profanity'

import './assets/application.scss'
import 'react-toastify/dist/ReactToastify.css'
import resources from './locales/index.js'
import { initSocket } from './network/socket.js'
import { pages } from './utils/routes.js'
import MainHeader from './components/MainHeader.jsx'
import store from './slices/index'
import NotFound from './pages/NotFound.jsx'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import Main from './pages/Main.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import ModalManager from './components/ModalManager.jsx'
import ToastListener from './components/ToastListener.jsx'
import { ToastContainer } from 'react-toastify'

const root = ReactDOM.createRoot(document.getElementById('root'))

const App = () => (
  <Provider store={store}>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="d-flex flex-column h-100">
        <MainHeader />
        <Routes>
          <Route path={pages.signup()} element={<SignUp />} />
          <Route path={pages.login()} element={<Login />} />
          <Route
            path={pages.root()}
            element={(
              <PrivateRoute>
                <Main />
              </PrivateRoute>
            )}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ModalManager />
        <ToastContainer pauseOnFocusLoss={false} />
        <ToastListener />
      </div>
    </BrowserRouter>
  </Provider>
)

const init = async () => {
  const i18n = i18next.createInstance()

  const mode = import.meta.env.MODE || 'development'
  const isDevelop = mode === 'development'

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      debug: isDevelop,
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    })

  leo.clearList()
  leo.add(leo.getDictionary('en'))
  leo.add(leo.getDictionary('ru'))

  initSocket(store.dispatch)

  const rollbarConfig = {
    accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN,
    environment: import.meta.env.VITE_ROLLBAR_ENVIRONMENT,
  }

  root.render(
    <RollBarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </ErrorBoundary>
    </RollBarProvider>,
  )
}

init()
