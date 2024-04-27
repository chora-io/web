'use client'

import Link from 'next/link'
import * as React from 'react'

const Breadcrumb = ({ text }: any) => {
  return (
    <div style={{ marginBottom: '2em' }}>
      <Link href={'./'}>{text}</Link>
    </div>
  )
}

export default Breadcrumb
