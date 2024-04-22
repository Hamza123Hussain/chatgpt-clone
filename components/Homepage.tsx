import React from 'react'

const Homepage = () => {
  return (
    <div className="  flex justify-center items-center min-h-screen flex-col px-4">
      <img
        src="chatgpt-logo-02AFA704B5-seeklogo.com.png"
        alt=""
        className=" rounded-full border-2 border-gray-600 p-3 bg-transparent  w-16"
      />

      <h1 className=" text-xs sm:text-3xl md:text-4xl font-bold mt-3 text-white">
        How can I help you today?
      </h1>
      <div className=" grid grid-cols-1 sm:grid-cols-2 text-white gap-5 mt-8">
        <div className="flex flex-col gap-2 border-2 border-gray-700 rounded-lg px-4 py-2 hover:opacity-70 cursor-pointer">
          <h1 className=" font-bold text-sm sm:text-lg">Write a text</h1>
          <p className="text-xs text-gray-900">
            Inviting my neighbours to a barbeque
          </p>
        </div>
        <div className="flex flex-col gap-2 border-2 border-gray-700 rounded-lg px-4 py-2 hover:opacity-70 cursor-pointer">
          <h1 className=" text-sm sm:text-lg font-bold">
            Write a course overview
          </h1>
          <p className=" text-xs sm:text-sm text-gray-900">
            on the psychology behind decision-making
          </p>
        </div>
        <div className="flex flex-col gap-2 border-2 border-gray-700 rounded-lg px-4 py-2 hover:opacity-70 cursor-pointer">
          <h1 className="  text-sm sm:text-lg font-bold">
            Create a personal webpage for me
          </h1>
          <p className="text-xs sm:text-sm text-gray-900">
            after asking me three questions
          </p>
        </div>
        <div className="flex flex-col gap-2 border-2 border-gray-700 rounded-lg px-4 py-2 hover:opacity-70 cursor-pointer">
          <h1 className=" text-sm sm:text-lg font-bold">
            Show me a code snippet
          </h1>
          <p className="text-xs sm:text-sm text-gray-900">
            of a website's sticky header
          </p>
        </div>
      </div>
    </div>
  )
}

export default Homepage
