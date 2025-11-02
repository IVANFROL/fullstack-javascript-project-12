import Modal from 'react-bootstrap/Modal'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { useCreateChannelMutation } from '../../api/chatApi'
import { channelsSelectors } from '../../slices/channels'
import { channelsNamingSchema } from '../../validation/schema'

const AddChannel = ({ handleClose, modalState }) => {
  const { t } = useTranslation('Components', { keyPrefix: 'AddChannel' })
  const allChannels = useSelector(channelsSelectors.selectEntities)
  const [createChannel] = useCreateChannelMutation()

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: channelsNamingSchema,
    onSubmit: async ({ channelName }) => {
      if (!formik.errors.channelName) {
        const channel = Object.values(allChannels).find(({ name }) => channelName === name)
        if (!channel) {
          await createChannel({ channelName })
          handleClose()
        }
        else {
          formik.setErrors({
            channelName: t('errors.channelExists'),
          })
        }
      }
    },
    validateOnChange: false,
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
              value={formik.values.channelName}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              required
              className="mb-2"
              name="channelName"
              placeholder={t('inputPlaceholder')}
              type="text"
              id="channelName"
              isInvalid={!formik.isValid}
            />
            <Form.Label
              htmlFor="channelName"
              className="visually-hidden"
            >
              {
                t('inputPlaceholder')
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
            t('sendButton')
          }
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddChannel
