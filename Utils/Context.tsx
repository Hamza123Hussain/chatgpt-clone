'use client'
import React, { createContext, useContext, useState } from 'react'

// Define the context
type ModelContextType = {
  model: string
  setModel: (model: string) => void
}

const ModelContext = createContext<ModelContextType | undefined>(undefined)

// Create a custom hook to use the model context
export const useModelContext = () => {
  const context = useContext(ModelContext)
  if (!context) {
    throw new Error('useModelContext must be used within a Modelprovider')
  }
  return context
}

// Create the provider component
export const Modelprovider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // State to store the selected model
  const [model, setModel] = useState('gpt-3.5-turbo-0125')

  // Value to be provided by the context

  // Return the context provider with the provided value
  return (
    <ModelContext.Provider value={{ model, setModel }}>
      {children}
    </ModelContext.Provider>
  )
}
