import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Seo from "chora/components/Seo"

function SeoWrapper({ title, description, children }: any) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  return (
    <Seo
      site={site}
      title={title}
      desciption={description}
      children={children}
    />
  )
}

export default SeoWrapper
