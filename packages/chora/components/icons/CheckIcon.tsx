import * as React from 'react'

const CheckIcon = ({ darkTheme }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="0.5em"
    width="0.5em"
    viewBox="0 0 20 20"
  >
    <line
      x1="7"
      y1="17"
      x2="17"
      y2="3"
      stroke={darkTheme ? '#FFFFFF' : '#111111'}
      strokeLinecap="round"
      strokeWidth="6"
    />
    <line
      x1="7"
      y1="17"
      x2="3"
      y2="10"
      stroke={darkTheme ? '#FFFFFF' : '#111111'}
      strokeLinecap="round"
      strokeWidth="6"
    />
  </svg>
)

export default CheckIcon
