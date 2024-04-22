'use client'
import { signIn } from 'next-auth/react'
import React from 'react'

const Login = () => {
  return (
    <div className=" min-h-screen flex flex-col justify-center items-center gap-4">
      <img
        src="chatgpt-logo-02AFA704B5-seeklogo.com.png"
        alt=""
        className=" w-32"
      />

      <button
        onClick={() => signIn('google')}
        className=" animate-pulse text-2xl"
      >
        {' '}
        Sign In To Google
      </button>
    </div>
  )
}

export default Login
