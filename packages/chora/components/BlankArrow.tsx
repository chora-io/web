'use client'

import * as React from 'react'
import { useContext } from 'react'

import { ThemeContext } from '../contexts'

const BlankArrow = ({ color, useTheme }: any) => {
  const { darkTheme } = useContext(ThemeContext)

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="0.5em"
      width="0.5em"
      viewBox="0 0 20 20"
      style={{ marginLeft: '0.5em' }}
    >
      <line
        x1="0"
        y1="20"
        x2="20"
        y2="0"
        stroke={useTheme ? (darkTheme ? '#000' : '#FFF') : color}
        strokeLinecap="round"
        strokeWidth="3"
      />
      <line
        x1="10"
        y1="0"
        x2="20"
        y2="0"
        stroke={useTheme ? (darkTheme ? '#000' : '#FFF') : color}
        strokeLinecap="round"
        strokeWidth="5"
      />
      <line
        x1="20"
        y1="10"
        x2="20"
        y2="0"
        stroke={useTheme ? (darkTheme ? '#000' : '#FFF') : color}
        strokeLinecap="round"
        strokeWidth="5"
      />
    </svg>
  )
}

export default BlankArrow
