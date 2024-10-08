import React from "react";


const LeftSidebar=()=>{
    return <>
    <aside className="w-1/5 bg-gray-800 text-white p-4 flex flex-col justify-between">
        {/* Brand Section */}
        <div className="text-center">
          <div className="text-3xl font-bold mb-2">
            C<span className="text-blue-500"><Logo width={'1.2em'} height={'1.2em'}/></span>deCam
          </div>
          <p className="text-sm text-gray-400">Try our online Code Editor</p>
        </div>

        {/* Search Box */}
        <div className="mt-6">
          <input
            type="text"
            placeholder="Search rooms..."
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Rooms Sections */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold">All rooms created by user</h2>
          {/* List created rooms here */}
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-semibold">All rooms joined by user</h2>
          {/* List joined rooms here */}
        </div>
      </aside>
    </>
}

export default LeftSidebar;