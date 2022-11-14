import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/Seo"

const NotFound = () => (
  <Main>
    <h1>
        {'404... a placeless place'}
    </h1>
  </Main>
)

export const Head = () => <Seo title="404 | a placeless place" />

export default NotFound
