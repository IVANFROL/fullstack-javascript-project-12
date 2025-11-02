import Modal from 'react-bootstrap/Modal'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import leo from 'leo-profanity'

import { useRenameChannelMutation } from '../../api/chatApi'
import { channelsSelectors, selectChannelById } from '../../slices/channels'
import { channelsNamingSchema } from '../../validation/schema'

const RenameChannel = ({ handleClose, modalState, channelId }) => {
  const { t } = useTranslation('Components', { keyPrefix: 'RenameChannel' })
  const allChannels = useSelector(channelsSelectors.selectEntities)
  const { name: currentChannelName } = useSelector(selectChannelById(channelId))
  const [renameChannel] = useRenameChannelMutation()

  const formik = useFormik({
    initialValues: {
      channelName: currentChannelName,
    },
    validationSchema: channelsNamingSchema,
    onSubmit: async ({ channelName }) => {
      if (!formik.errors.channelName) {
        const channel = Object.values(allChannels).find(({ name }) => channelName === name)
        if (!channel) {
          if (leo.check(channelName)) {
            formik.setErrors({
              channelName: t('errors.profanity'),
            })
          }
          else {
            await renameChannel({ channelId, channelName })
            handleClose()
          }
        }
        else {
          formik.setErrors({
            channelName: t('error.channelExists'),
          })
        }
      }
    },
    validateOnChange: true,
  })

  return (
    <Modal show={modalState} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {
            t('title')
          }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={formik.handleSubmit}
        >
          <Form.Group>
            <Form.Control
              onChange={formik.handleChange}
              className="form-control"
              name="channelName"
              type="text"
              required
              id="channelName"
              value={formik.values.channelName}
              placeholder={t('placeholder')}
            />
            <Form.Label
              htmlFor="channelName"
              className="visually-hidden"
            >
              {
                t('placeholder')
              }
            </Form.Label>
            <Form.Control.Feedback
              type="invalid"
            >
              {
                formik.errors.channelName
                  ? t(formik.errors.channelName)
                  : null
              }
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
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
          variant="primary"
          onClick={formik.handleSubmit}
        >
          {
            t('send')
          }
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default RenameChannel
