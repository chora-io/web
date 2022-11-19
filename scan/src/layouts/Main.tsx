import * as React from "react"

import "./Main.css"

const Main = ({ children }: any) => {
  return (
    <main>
      <div className={"background"} />
      {children}
    </main>
  )
}

export default Main
