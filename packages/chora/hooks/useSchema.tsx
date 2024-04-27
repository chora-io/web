import { useEffect, useState } from 'react'

// fetch context, example, and template from schema
export const useSchema = (contextUrl: string) => {
  const [context, setContext] = useState<string>('')
  const [example, setExample] = useState<string>('')
  const [template, setTemplate] = useState<string>('')

  useEffect(() => {
    // fetch schema context
    fetch(contextUrl)
      .then((res) => res.json())
      .then((data) => {
        setContext(JSON.stringify(data, null, '  '))
      })
      .catch((err) => {
        setContext(err.message)
      })

    // fetch schema example
    fetch(contextUrl.replace('contexts', 'examples'))
      .then((res) => res.json())
      .then((data) => {
        setExample(JSON.stringify(data, null, '  '))
      })
      .catch((err) => {
        setExample(err.message)
      })

    // fetch schema template
    fetch(contextUrl.replace('contexts', 'templates'))
      .then((res) => res.json())
      .then((data) => {
        setTemplate(JSON.stringify(data, null, '  '))
      })
      .catch((err) => {
        setTemplate(err.message)
      })
  }, [contextUrl])

  return [context, example, template]
}
