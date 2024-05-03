import * as React from 'react'

const MenuIcon = ({ darkTheme }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="1.5em"
    width="1.5em"
    viewBox="0 0 100 100"
  >
    <line
      x1="10"
      y1="85"
      x2="90"
      y2="85"
      stroke={darkTheme ? '#FFFFFF' : '#111111'}
      strokeLinecap="round"
      strokeWidth="10"
    />
    <line
      x1="10"
      y1="50"
      x2="90"
      y2="50"
      stroke={darkTheme ? '#FFFFFF' : '#111111'}
      strokeLinecap="round"
      strokeWidth="10"
    />
    <line
      x1="10"
      y1="15"
      x2="90"
      y2="15"
      stroke={darkTheme ? '#FFFFFF' : '#111111'}
      strokeLinecap="round"
      strokeWidth="10"
    />
  </svg>
)

export default MenuIcon
