import * as React from "react"

import Header from "../components/HeaderWrapper"

import "./Main.module.css"

const Main = ({ children }: any) => {
  return (
    <main>
      <Header />
      {children}
    </main>
  )
}

export default Main
