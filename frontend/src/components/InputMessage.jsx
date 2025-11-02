import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'

import { useSendMessageMutation } from '../api/chatApi'
import { selectCurrentChannelId } from '../slices/channels'
import { selectAuth } from '../slices/auth'
import SendIcon from '../assets/SendIcon'

const InputMessage = () => {
  const { t } = useTranslation('Components', { keyPrefix: 'Main' })
  const inputContainerEl = useRef(null)
  const [value, setValue] = useState('')
  const currentChannelId = useSelector(selectCurrentChannelId)
  const authData = useSelector(selectAuth)
  const [sendMessage] = useSendMessageMutation()

  const handlerSendMessage = async (btnEvent) => {
    btnEvent.preventDefault()
    if (value === '') return
    const message = {
      body: value,
      channelId: currentChannelId,
      username: authData.username,
    }
    await sendMessage(message)
    setValue('')
    const messagesContainerEl = inputContainerEl.current.previousSibling
    messagesContainerEl
      .scrollTo(0, messagesContainerEl.scrollHeight)
  }
  return (
    <div className="mt-auto px-5 py-3" ref={inputContainerEl}>
      <Form
        className="py-1 border rounded-2"
        onSubmit={handlerSendMessage}
      >
        <InputGroup>
          <Form.Control
            name="body"
            placeholder={t('InputMessage.enterMessage')}
            className="border-0 p-0 ps-2"
            value={value}
            aria-label={t('InputMessage.aria.enterMessage')}
            onChange={(e) => {
              e.preventDefault()
              setValue(e.target.value)
            }}
          />
          <Button
            variant="vertical"
            type="submit"
            disabled={!value}
          >
            <SendIcon />
            <span
              className="visually-hidden"
            >
              {t('InputMessage.sendButton')}
            </span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  )
}

export default InputMessage
