import * as React from "react"

import * as styles from "./InputJSON.module.css"

const placeholder = `{
  "@context": {
    "schema": "http://schema.org/"
  },
  "schema:name": "",
  "schema:description": "",
  "schema:location": {
    "@context": {
      "type": "@type",
      "@vocab": "https://purl.org/geojson/vocab#",
      "coordinates": {
        "@container": "@list"
      },
      "bbox": {
        "@container": "@list"
      }
    },
    "type": "Feature",
    "place_name": "",
    "geometry": {
      "type": "Point",
      "coordinates": [
        0,
        0
      ]
    }
  }
}`

const InputHashJSON = ({ json, setJson }: any) => (
  <label htmlFor="json">
    {"json-ld"}
    <textarea
      id="json"
      value={json}
      className={styles.long}
      placeholder={placeholder}
      onChange={event => setJson(event.target.value)}
    />
  </label>
)

export default InputHashJSON
