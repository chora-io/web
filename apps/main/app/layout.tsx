'use client'

import { ThemeContextProvider } from "chora"

import Header from "@components/Header"

import "./globals.css"

const Layout = ({ children }: any) => (
  <html lang="en">
    <body>
      <main>
        <ThemeContextProvider>
          <Header />
          {children}
        </ThemeContextProvider>
      </main>
    </body>
  </html>
)

export default Layout
