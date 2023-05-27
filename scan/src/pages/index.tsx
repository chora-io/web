import * as React from "react"

import Main from "../layouts/Main"
import Seo from "../components/SeoWrapper"

import Dashboard from "../components/home/Dashboard"

import * as styles from "./index.module.css"

const HomePage = ({ location }: any) => (
  <Main location={location}>
    <div className={styles.page}>
      <Dashboard />
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default HomePage
