import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { openModal } from '../slices/modals'
import PlusIcon from '../assets/PlusIcon'

const AddChannelButton = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation('Components', { keyPrefix: 'Main.Chat' })

  const handleAddModal = () => {
    dispatch(openModal({ type: 'addChannel' }))
  }

  return (
    <button
      type="button"
      className="p-0 text-primary btn btn-group-vertical channel-button"
      onClick={handleAddModal}
      aria-label={t('aria.addChannel')}
    >
      <PlusIcon />
      <span className="visually-hidden">{t('addButton')}</span>
    </button>
  )
}

export default AddChannelButton
