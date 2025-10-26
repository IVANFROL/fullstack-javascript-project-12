import { useEffect, useRef, useState } from 'react'
import leo from 'leo-profanity'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'

import { selectMessages, sendMessage } from '../slices/messages'
import { selectCurrentChannel, selectCurrentChannelId } from '../slices/channels'
import { selectAuth } from '../slices/auth'
import SendIcon from '../assets/SendIcon'

export const ChannelMessages = () => {
  const { t } = useTranslation('Components', { keyPrefix: 'ChannelMessages' })

  const listEl = useRef(null)
  const currentChannel = useSelector(selectCurrentChannel)
  const messages = useSelector(selectMessages)
  useEffect(() => {
    if (currentChannel) listEl.current.scrollTo(1, listEl.current.scrollHeight)
  }, [currentChannel])

  if (!currentChannel) return null
  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            {`# ${leo.clean(currentChannel.name)}`}
          </b>
        </p>
        <span className="text-muted">
          {`${messages.length} ${t('Header.messagesCount.messages', { count: messages.length })}`}
        </span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5" ref={listEl}>
        {messages.length > 0
          ? messages.map(({ body, username, id }) => (
              <div className="text-break mb-2" key={id}>
                <b>{username}</b>
                {`: ${leo.clean(body)}`}
              </div>
            ))
          : null}
      </div>
    </>
  )
}

export const InputMessage = () => {
  const { t } = useTranslation('Components', { keyPrefix: 'Main' })
  const dispatch = useDispatch()
  const inputContainerEl = useRef(null)
  const [value, setValue] = useState('')
  const currentChannelId = useSelector(selectCurrentChannelId)
  const authData = useSelector(selectAuth)
  const handlerSendMessage = (btnEvent) => {
    btnEvent.preventDefault()
    if (value === '') return
    const message = {
      body: value,
      channelId: currentChannelId,
      username: authData.username,
    }
    dispatch(sendMessage({
      token: authData.token,
      messageObj: message,
    }))
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
