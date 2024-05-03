import * as React from 'react'

const ThemeIcon = ({ darkTheme }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="1.5em"
    width="1.5em"
    viewBox="0 0 100 100"
  >
    <circle cx="50" cy="50" r="40" fill={darkTheme ? '#F5F5F5' : '#0A0A0A'} />
    <circle cx="60" cy="50" r="37" fill={darkTheme ? '#111111' : '#FFFFFF'} />
  </svg>
)

export default ThemeIcon
