import Image from 'next/image'

import darkBackground from "chora/assets/images/chora_dark.png"
import lightBackground from "chora/assets/images/chora_light.png"

import styles from "./Background.module.css"

const Background = ({ darkTheme, withImage }: any) => (
  <div className={withImage ? styles.primary : styles.secondaryTransparent}>
    {withImage && (
      <Image
        alt="chora"
        src={darkTheme ? darkBackground : lightBackground}
      />
    )}
  </div>
)

export default Background
