import * as React from "react"

import darkBackground from "chora/assets/images/chora_dark.png"
import lightBackground from "chora/assets/images/chora_light.png"

import * as styles from "./Background.module.css"

const Background = ({ darkTheme, withImage }) => (
  <div className={withImage ? styles.primary : styles.secondaryTransparent}>
    {withImage && <img src={darkTheme ? darkBackground : lightBackground} />}
  </div>
)

export default Background
