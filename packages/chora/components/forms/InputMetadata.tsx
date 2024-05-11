import * as React from 'react'

import { InputJSON, InputsFromJSON, SelectOption, SelectStorage } from '.'

const InputMetadata = ({
  network,
  input,
  setInput,
  json,
  setJson,
  context,
  example,
  useTemplate,
  dataStorage,
  setDataStorage,
}: any) => {
  return (
    <>
      <SelectOption
        id="metadata-input"
        label="metadata input"
        options={[
          { id: 'schema-form', label: 'schema form' },
          { id: 'custom-json', label: 'custom json' },
        ]}
        setSelected={setInput}
      />
      {input === 'schema-form' && (
        <InputsFromJSON
          label="metadata"
          example={example}
          json={json}
          setJson={setJson}
        />
      )}
      {input === 'custom-json' && (
        <InputJSON
          json={json}
          placeholder={example}
          setJson={setJson}
          useTemplate={useTemplate}
          showUseTemplate={context && context.length > 0}
        />
      )}
      <SelectStorage
        network={network}
        dataStorage={dataStorage}
        setDataStorage={setDataStorage}
      />
    </>
  )
}

export default InputMetadata
