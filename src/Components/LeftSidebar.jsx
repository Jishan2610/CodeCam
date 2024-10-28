import React from "react";
import RoomSidebar from "./RoomSideBar";
import Logo from "./Logo";


// const LeftSidebar=()=>{
//     return <>
//     <aside className="w-1/5 bg-gray-800 text-white p-4 flex flex-col justify-between">
//         {/* Brand Section */}
//         <div className="text-center">
//           <div className="text-3xl font-bold mb-2">
//             C<span className="text-blue-500"><Logo width={'1.2em'} height={'1.2em'}/></span>deCam
//           </div>
//           <p className="text-sm text-gray-400">Try our online Code Editor</p>
//         </div>

//         {/* Search Box */}
//         <div className="mt-6">
//           <input
//             type="text"
//             placeholder="Search rooms..."
//             className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <RoomSidebar/>
//       </aside>
//     </>
// }
const LeftSidebar = () => {
  return (
    <aside className="w-1/5 bg-gray-800 text-white flex flex-col h-screen">
      {/* Brand Section */}
      <div className="p-4">
        <div className="text-3xl font-bold mb-2 text-center">
          C<span className="text-blue-500"><Logo width={'1.2em'} height={'1.2em'}/></span>deCam
        </div>
        <p className="text-sm text-gray-400 text-center">Try our online Code Editor</p>
      </div>
      
      {/* Search Box */}
      <div className="px-4 mb-4">
        <input
          type="text"
          placeholder="Search rooms..."
          className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      {/* RoomSidebar will fill remaining space */}
      <RoomSidebar />
    </aside>
  );
};

export default LeftSidebar;