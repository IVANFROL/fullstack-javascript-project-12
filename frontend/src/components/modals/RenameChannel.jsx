import Modal from 'react-bootstrap/Modal'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import leo from 'leo-profanity'

import { channelsSelectors, renameChannel, selectChannelById } from '../../slices/channels'
import { channelsNamingSchema } from '../../validation/schema'
import { selectAuth } from '../../slices/auth'

const RenameChannel = ({ handleSetState, modalState, extraData }) => {
  const { t } = useTranslation('Components', { keyPrefix: 'RenameChannel' })
  const dispatch = useDispatch()
  const channelId = extraData
  const allChannels = useSelector(channelsSelectors.selectEntities)
  const { token } = useSelector(selectAuth)
  const { name: currentChannelName } = useSelector(selectChannelById(channelId))

  const formik = useFormik({
    initialValues: {
      channelName: currentChannelName,
    },
    validationSchema: channelsNamingSchema,
    onSubmit: ({ channelName }) => {
      if (!formik.errors.channelName) {
        const channel = Object.values(allChannels).find(({ name }) => channelName === name)
        if (!channel) {
          if (leo.check(channelName)) {
            formik.setErrors({
              channelName: t('errors.profanity'),
            })
          }
          else {
            dispatch(renameChannel({ token, channelName, channelId }))
            handleSetState(false)
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

  const handleClose = () => {
    handleSetState(false)
  }

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
