import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { selectToastMessage } from '../slices/toast.js'

const ToastListener = () => {
  const { i18n } = useTranslation()
  const toastMessage = useSelector(selectToastMessage)

  const generatorMessages = {
    0: () => toast.success(i18n.t(toastMessage.code, { ns: 'toast' })),
    1: () => toast.error(i18n.t(toastMessage.code, { ns: 'toast' })),
  }

  useEffect(() => {
    if (toastMessage && toastMessage.code) {
      try {
        generatorMessages[toastMessage.id]()
      }
      catch (error) {
        // If translation fails, don't show empty toast
        console.warn('Toast translation failed:', toastMessage.code, error)
      }
    }
  }, [toastMessage])

  return null
}

export default ToastListener
