const InputsFromJSON = ({ example, json, setJson }: any) => {
  const inputs: any[] = []

  const parsedJson = JSON.parse(json || '{}')
  const parsedExample = JSON.parse(example || '{}')

  if (example) {
    // parse example to generate inputs
    JSON.parse(example, (k, v) => {
      // skip keyless
      if (k === '') return

      // whether input should be hidden
      const hidden = k === '@context'

      // push non-object value to inputs
      if (typeof v !== 'object') {
        inputs.push({
          id: k,
          label: k,
          placeholder: v,
          hidden: hidden,
          value: hidden ? parsedExample[k] : parsedJson[k],
        })
      }
    })

    // parse example again to update nested inputs
    JSON.parse(example, (k, v) => {
      // skip keyless
      if (k === '') return

      // check if value is an object
      if (typeof v === 'object') {
        // loop through object properties
        for (const p in parsedExample[k]) {
          // find index of nested property
          const i = inputs.findIndex((e) => e.id === p)

          // update id and label of nested property
          inputs[i].id = k + '/' + inputs[i].id
          inputs[i].label = k + ' ' + inputs[i].label
        }
      }
    })
  }

  const handleSetJson = (id: string, value: any) => {
    // parse json string and use example with context if json is not yet set
    const obj = JSON.parse(
      json || `{"@context": "${parsedExample['@context']}"}`,
    )

    // check nested property
    if (id.includes('/')) {
      // get nested ids
      const ids = id.split('/')

      // set nested property
      if (obj[ids[0]] !== undefined) {
        obj[ids[0]][ids[1]] = value
      } else {
        obj[ids[0]] = { [ids[1]]: value }
      }
    } else {
      // set value
      obj[id] = value
    }

    // stringify updated object
    const str = JSON.stringify(obj)

    // update json string
    setJson(str)
  }

  return (
    <>
      {inputs.map((input) => (
        <label key={input.id} htmlFor={input.id}>
          {input.hidden ? '' : input.label}
          <input
            id={input.id}
            value={input.value}
            placeholder={input.placeholder}
            onChange={(event) => handleSetJson(input.id, event.target.value)}
            type={input.hidden ? 'hidden' : undefined}
          />
        </label>
      ))}
    </>
  )
}

export default InputsFromJSON
