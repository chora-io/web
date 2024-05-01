'use client'

import * as React from 'react'
import { useContext } from 'react'

import { ThemeContext } from '../contexts'

const defaultColor = '#00C3A5'

const ArrowRight = ({ color, useTheme }: any) => {
  const { darkTheme } = useContext(ThemeContext)

  const stroke = color || defaultColor

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="0.5em"
      width="0.5em"
      viewBox="0 0 20 20"
      style={{ marginRight: '0.5em' }}
    >
      <line
        x1="0"
        y1="10"
        x2="20"
        y2="10"
        stroke={useTheme ? (darkTheme ? '#000' : '#FFF') : stroke}
        strokeLinecap="round"
        strokeWidth="3"
      />
      <line
        x1="8"
        y1="17"
        x2="0"
        y2="10"
        stroke={useTheme ? (darkTheme ? '#000' : '#FFF') : stroke}
        strokeLinecap="round"
        strokeWidth="3"
      />
      <line
        x1="0"
        y1="10"
        x2="8"
        y2="3"
        stroke={useTheme ? (darkTheme ? '#000' : '#FFF') : stroke}
        strokeLinecap="round"
        strokeWidth="3"
      />
    </svg>
  )
}

export default ArrowRight
