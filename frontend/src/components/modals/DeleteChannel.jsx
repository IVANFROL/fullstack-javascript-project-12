import Modal from 'react-bootstrap/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Button from 'react-bootstrap/Button'

import { selectAuth } from '../../slices/auth'
import { deleteChannel } from '../../slices/channels'

const DeleteChannel = ({ handleSetState, modalState, extraData }) => {
  const { t } = useTranslation('Components', { keyPrefix: 'DeleteChannel' })
  const dispatch = useDispatch()
  const { token } = useSelector(selectAuth)
  const idModalChannel = extraData

  const handleClose = () => {
    handleSetState(false)
  }

  const handleDelete = () => {
    dispatch(deleteChannel({ token, channelId: idModalChannel }))
    handleSetState(false)
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
