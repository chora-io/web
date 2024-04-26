import * as React from 'react'
import { useEffect } from 'react'

import { ManageList } from '.'
import { SelectMessage } from '.'

const defaultId = 'messages'

const InputMessages = ({ id, network, messages, setMessages }: any) => {
  useEffect(() => {
    let ms = [...messages]
    ms = ms.map((m, i) => ({ index: i, ...m }))
    setMessages(ms)
  }, [messages.length])

  const handleSetMessage = (message: any) => {
    const ms = [...messages]
    ms[message.index] = message
    setMessages(ms)
  }

  const handleAddMessage = (event: any) => {
    event?.preventDefault()
    const ms = [...messages]
    ms.push({ typeUrl: '', value: [] })
    setMessages(ms)
  }

  const handleRemoveMessage = (event: any) => {
    event?.preventDefault()
    if (messages.length > 0) {
      const ms = [...messages]
      ms.pop()
      setMessages(ms)
    }
  }

  return (
    <>
      {messages.length === 0 && <label>{'messages'}</label>}
      {messages.map((message: any, index: number) => (
        <SelectMessage
          key={index}
          id={(id || defaultId) + '-message-' + (index + 1)}
          label={'message ' + (index + 1)}
          network={network}
          message={message}
          setMessage={handleSetMessage}
        />
      ))}
      <ManageList
        label="message"
        addItem={handleAddMessage}
        removeItem={handleRemoveMessage}
        notEmpty={messages.length > 0}
      />
    </>
  )
}

export default InputMessages
