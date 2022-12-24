import * as React from "react"

const SelectSchema = ({ schema, schemas, setExample, setSchema, setTemplate }: any) => {

  const handleSelect = (event) => {
    setSchema(event.target.value)

    if (event.target.value != "") {

      // fetch schema example
      fetch(event.target.value.replace("contexts", "examples"))
        .then(res => res.json())
        .then(data => {
          setExample(JSON.stringify(data,null, "  "))
        })
        .catch(err => {
          setExample(err.message)
        })

      // fetch schema template
      fetch(event.target.value.replace("contexts", "templates"))
        .then(res => res.json())
        .then(data => {
          setTemplate(JSON.stringify(data,null, "  "))
        })
        .catch(err => {
          setTemplate(err.message)
        })

    } else {
      setExample("")
      setTemplate("")
    }
  }

  return (
    <label htmlFor="schema">
      {"schema"}
      <select
        id="schema"
        value={schema}
        onChange={handleSelect}
      >
        <option value="">
          {"--select--"}
        </option>
        {schemas.map(s => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </label>
  )
}

export default SelectSchema
