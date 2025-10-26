import { useSelector, useDispatch } from 'react-redux'
import { closeModal } from '../slices/modals'
import AddChannel from './modals/AddChannel'
import DeleteChannel from './modals/DeleteChannel'
import RenameChannel from './modals/RenameChannel'

const modalComponents = {
  addChannel: AddChannel,
  deleteChannel: DeleteChannel,
  renameChannel: RenameChannel,
}

const ModalManager = () => {
  const dispatch = useDispatch()

  const { isOpen, type, channelId } = useSelector(state => state.modals)

  if (!isOpen) return null

  const CurrentModal = modalComponents[type]

  const handleClose = () => {
    dispatch(closeModal())
  }

  return (
    <CurrentModal
      handleSetState={handleClose}
      modalState={type}
      extraData={channelId}
    />
  )
}

export default ModalManager
