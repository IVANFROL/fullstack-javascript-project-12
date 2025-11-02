import { useEffect, useRef } from 'react'
import leo from 'leo-profanity'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { selectMessages } from '../slices/messages'
import { selectCurrentChannel } from '../slices/channels'

const ChannelMessages = () => {
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

export default ChannelMessages
