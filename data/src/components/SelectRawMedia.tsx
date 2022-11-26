import * as React from "react"

import { RawMediaType } from "../../api/regen/data/v1/types"

const SelectRawMedia = ({ media, setMedia }: any) => (
  <label htmlFor="raw-media">
    {"raw media type"}
    <select
      id="raw-media"
      value={media}
      // @ts-ignore
      onChange={event => setMedia(event.target.value)}
    >
      <option>
        {"unspecified"}
      </option>
      <option value={RawMediaType.RAW_MEDIA_TYPE_TEXT_PLAIN}>
        {"TXT"}
      </option>
      <option value={RawMediaType.RAW_MEDIA_TYPE_JSON}>
        {"JSON"}
      </option>
      <option value={RawMediaType.RAW_MEDIA_TYPE_CSV}>
        {"CSV"}
      </option>
      <option value={RawMediaType.RAW_MEDIA_TYPE_XML}>
        {"XML"}
      </option>
      <option value={RawMediaType.RAW_MEDIA_TYPE_PDF}>
        {"PDF"}
      </option>
      <option value={RawMediaType.RAW_MEDIA_TYPE_TIFF}>
        {"TIFF"}
      </option>
      <option value={RawMediaType.RAW_MEDIA_TYPE_JPG}>
        {"JPG"}
      </option>
      <option value={RawMediaType.RAW_MEDIA_TYPE_PNG}>
        {"PNG"}
      </option>
      <option value={RawMediaType.RAW_MEDIA_TYPE_SVG}>
        {"SVG"}
      </option>
    </select>
  </label>
)

export default SelectRawMedia
