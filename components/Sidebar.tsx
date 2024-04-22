import React from 'react'

const Sidebar = () => {
  return (
    <>
      <div className=" flex justify-between  hover:bg-gray-400    hover:border-2 hover:rounded-lg ">
        <div className=" p-1 flex items-center justify-between gap-2 text-white">
          <img
            src="chatgpt-logo-02AFA704B5-seeklogo.com.png"
            className=" w-9 border-2 border-black rounded-full p-1 "
            alt=""
          />
          <h6 className=" text-xs sm:text-sm ">New Note</h6>
        </div>
        <img src="768818.png" className="w-8 p-2" alt="" />
      </div>

      <div className=" flex flex-col gap-5 mt-5 text-white">
        <div className="text-sm hover:bg-gray-400  p-2 flex justify-between   hover:border-2 hover:rounded-lg">
          <p>chat title</p>
          <img src="2891491.png" className="w-6" alt="" />
        </div>
        <div className="text-sm hover:bg-gray-400  p-2 flex justify-between   hover:border-2 hover:rounded-lg">
          <p>chat title</p>
          <img src="2891491.png" className="w-6" alt="" />
        </div>{' '}
        <div className="text-sm hover:bg-gray-400  p-2 flex justify-between   hover:border-2 hover:rounded-lg">
          <p>chat title</p>
          <img src="2891491.png" className="w-6" alt="" />
        </div>
      </div>
    </>
  )
}

export default Sidebar
