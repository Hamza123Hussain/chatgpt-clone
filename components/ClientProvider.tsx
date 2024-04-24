'use client'
import React from 'react'
import { Toaster } from 'react-hot-toast'

const ClientProvider = () => {
  // this componet can be used to store all client side componets and functions
  // can be then mounted in layout wihtout making layout a client side component
  return (
    <>
      <Toaster position="top-center" />
    </>
  )
}

export default ClientProvider
