import * as React from "react"

import Sidebar from "../components/Sidebar"

import "./Main.css"

const Main = ({ children }: any) => {
  return (
    <main>
      <Sidebar />
      {children}
    </main>
  )
}

export default Main
