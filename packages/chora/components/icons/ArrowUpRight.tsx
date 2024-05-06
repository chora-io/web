'use client'

import * as React from 'react'
import { useContext } from 'react'

import { ThemeContext } from '../../contexts'

const defaultColor = '#00C3A5'

const ArrowUpRight = ({ color, useTheme }: any) => {
  const { darkTheme } = useContext(ThemeContext)

  const stroke = color || defaultColor

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="0.5em"
      width="0.5em"
      viewBox="0 0 20 20"
      style={{ marginLeft: '0.5em' }}
    >
      <line
        x1="3"
        y1="17"
        x2="17"
        y2="3"
        stroke={useTheme ? (darkTheme ? '#000' : '#FFF') : stroke}
        strokeLinecap="round"
        strokeWidth="3"
      />
      <line
        x1="17"
        y1="3"
        x2="7"
        y2="3"
        stroke={useTheme ? (darkTheme ? '#000' : '#FFF') : stroke}
        strokeLinecap="round"
        strokeWidth="3"
      />
      <line
        x1="17"
        y1="3"
        x2="17"
        y2="12"
        stroke={useTheme ? (darkTheme ? '#000' : '#FFF') : stroke}
        strokeLinecap="round"
        strokeWidth="3"
      />
    </svg>
  )
}

export default ArrowUpRight
