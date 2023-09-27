import * as React from 'react'

function Seo({ site, title, description, children }: any) {
  const defaultTitle = site.siteMetadata?.title
  const metaDescription = description || site.siteMetadata.description

  return (
    <>
      <title>{title ? title : defaultTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={site.siteMetadata?.author || ``} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      {children}
    </>
  )
}

export default Seo
