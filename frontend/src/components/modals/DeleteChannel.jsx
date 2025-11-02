import Modal from 'react-bootstrap/Modal'
import { useTranslation } from 'react-i18next'
import Button from 'react-bootstrap/Button'

import { useDeleteChannelMutation } from '../../api/chatApi'

const DeleteChannel = ({ handleClose, modalState, channelId }) => {
  const { t } = useTranslation('Components', { keyPrefix: 'DeleteChannel' })
  const [deleteChannel] = useDeleteChannelMutation()

  const handleDelete = async () => {
    await deleteChannel(channelId)
    handleClose()
  }

  return (
    <Modal show={modalState} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {
            t('title')
          }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          t('confirm')
        }
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleClose}
        >
          {
            t('cancel')
          }
        </Button>
        <Button
          variant="danger"
          onClick={handleDelete}
        >
          {
            t('delete')
          }
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteChannel
