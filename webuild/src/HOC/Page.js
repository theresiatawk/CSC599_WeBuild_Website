import React from 'react'
import Header from '../components/organisms/header/Header'

const Page = ({children}) => {
  return (
    <>
    <Header />
    {children}
    </>
  )
}

export default Page