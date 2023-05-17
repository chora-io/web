import * as React from "react"

import Header from "../components/Header"

import "./Main.module.css"

const Main = ({ children, location }: any) => {
  return (
    <main>
      <Header location={location} />
      {children}
    </main>
  )
}

export default Main
