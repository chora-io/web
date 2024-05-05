import * as React from 'react'

const CheckIcon = ({ darkTheme }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="0.5em"
    width="0.5em"
    viewBox="0 0 20 20"
  >
    <line
      x1="5"
      y1="20"
      x2="20"
      y2="0"
      stroke={darkTheme ? '#FFFFFF' : '#111111'}
      strokeLinecap="round"
      strokeWidth="5"
    />
    <line
      x1="5"
      y1="20"
      x2="3"
      y2="10"
      stroke={darkTheme ? '#FFFFFF' : '#111111'}
      strokeLinecap="round"
      strokeWidth="5"
    />
  </svg>
)

export default CheckIcon
