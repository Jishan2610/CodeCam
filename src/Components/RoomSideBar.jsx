import React, { useState, useEffect } from 'react';
import { MoreVertical, X, Search, Trash2, Users, ArrowRight, LogIn } from 'lucide-react';
import axios from 'axios';

const RoomSidebar = () => {
  const [rooms, setRooms] = useState([{name:"No Rooms"}]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [showUsersList, setShowUsersList] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    axios.get(import.meta.env.VITE_SERVER_URL + "/api/v1/room/getRooms", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setRooms(response.data.rooms)
      console.log(response.data.rooms)
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);

  const handleDeleteRoom = async (roomId) => {
    setRooms(rooms.filter(room => room.id !== roomId));
    setShowOptions(false);
  };

  const handleDeleteUser = async (roomId, userId) => {
    const updatedRooms = rooms.map(room => {
      if (room.id === roomId) {
        return {
          ...room,
          users: room.users.filter(user => user.id !== userId)
        };
      }
      return room;
    });
    setRooms(updatedRooms);
  };

  const filteredUsers = selectedRoom?.users?.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const sortedRooms = [...rooms].sort((a, b) => 
    new Date(b.lastUpdated || 0) - new Date(a.lastUpdated || 0)
  );

  return (
    <div className="flex flex-col">
        <div className="p-2 border-b mb-3 rounded-full">
           <h2 className="text-lg font-semibold flex justify-center">Rooms</h2>
        </div>
      {/* Main Rooms List */}
      <div className="flex-1 flex relative">
      <div className="flex-1 flex flex-col h-screen">
        <div className="flex-1 overflow-y-auto">
          {sortedRooms.map(room => (
            <div key={room._id} className="relative">
              <div className="flex items-center justify-between p-4 hover:bg-[#5a5a5a] cursor-pointer transition-colors">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-200">{room.name}</h3>
                  {room.lastUpdated && (
                    <p className="text-sm text-gray-400">
                      {new Date(room.lastUpdated).toLocaleString()}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => {
                    setSelectedRoom(room);
                    setShowOptions(true);
                  }}
                  className="p-1 hover:bg-gray-600 rounded text-gray-300"
                >
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Options Sidebar - Absolute positioned */}
      {showOptions && (
        <div className="absolute left-full top-0 w-48 bg-gray-800 border-l border-gray-700 h-full">
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <h3 className="font-semibold text-gray-200">Options</h3>
            <button
              onClick={() => {
                setShowOptions(false);
                setShowUsersList(false);
              }}
              className="p-1 hover:bg-gray-700 rounded text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-2">
            <button
              onClick={() => {/* TODO: Navigate to room */}}
              className="w-full p-2 flex items-center gap-2 hover:bg-gray-700 rounded text-gray-200"
            >
              <LogIn className="w-5 h-5" />
              Go to Room
            </button>
            {selectedRoom?.isOwner && (
              <>
                <button
                  onClick={() => setShowUsersList(true)}
                  className="w-full p-2 flex items-center gap-2 hover:bg-gray-700 rounded text-gray-200"
                >
                  <Users className="w-5 h-5" />
                  Edit Room Users
                </button>
                <button
                  onClick={() => handleDeleteRoom(selectedRoom.id)}
                  className="w-full p-2 flex items-center gap-2 hover:bg-gray-700 rounded text-red-400"
                >
                  <Trash2 className="w-5 h-5" />
                  Delete Room
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Users List Sidebar - Absolute positioned */}
      {showUsersList && (
        <div className="absolute left-full ml-48 top-0 w-64 bg-gray-800 border-l border-gray-700 h-full">
          <div className="p-4 border-b border-gray-700">
            <h3 className="font-semibold mb-2 text-gray-200">Room Users</h3>
            <div className="relative">
              <Search className="w-5 h-5 absolute left-2 top-2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded bg-gray-700 text-gray-200 border-gray-600 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="overflow-y-auto h-[calc(100%-5rem)]">
            {filteredUsers.map(user => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 hover:bg-gray-700"
              >
                <span className="text-gray-200">{user.name}</span>
                <button
                  onClick={() => handleDeleteUser(selectedRoom.id, user.id)}
                  className="p-1 hover:bg-gray-600 rounded text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default RoomSidebar;
// import React, { useState,useEffect } from 'react';
// import { MoreVertical, X, Search, Trash2, Users, ArrowRight, LogIn } from 'lucide-react';
// import axios from 'axios';
// // Sample room data structure

// const RoomSidebar = () => {
//   const [rooms, setRooms] = useState([{name:"No Rooms"}]);
//   const [selectedRoom, setSelectedRoom] = useState(null);
//   const [showOptions, setShowOptions] = useState(false);
//   const [showUsersList, setShowUsersList] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   useEffect(()=>{

//     const token = localStorage.getItem("token");  // Replace with your actual JWT token
    
//     axios.get(import.meta.env.VITE_SERVER_URL + "/api/v1/room/getRooms", {
//       headers: {
//         'Authorization': `Bearer ${token}`  // Attach token to the Authorization header
//       }
//     })
//     .then(response => {
//       setRooms(response.data.rooms)  // Handle success
//       console.log(response.data.rooms)
//     })
//     .catch(error => {
//       console.error('Error fetching data:', error);  // Handle error
//     });
    
//   },[])

//   const handleDeleteRoom = async (roomId) => {
//     // TODO: Send delete request to backend
//     setRooms(rooms.filter(room => room.id !== roomId));
//     setShowOptions(false);
//   };

//   const handleDeleteUser = async (roomId, userId) => {
//     // TODO: Send delete user request to backend
//     const updatedRooms = rooms.map(room => {
//       if (room.id === roomId) {
//         return {
//           ...room,
//           users: room.users.filter(user => user.id !== userId)
//         };
//       }
//       return room;
//     });
//     setRooms(updatedRooms);
//   };

//   const filteredUsers = selectedRoom?.users.filter(user =>
//     user.name.toLowerCase().includes(searchQuery.toLowerCase())
//   ) || [];

//   const sortedRooms = [...rooms].sort((a, b) => 
//     new Date(b.lastUpdated) - new Date(a.lastUpdated)
//   );

//   return (
//     <div className="flex h-screen bg-gray-800">
//       {/* Main Sidebar */}
//       <div className="w-64 bg-gray-800 ">
//         <div className="p-4 border-b">
//           <h2 className="text-lg font-semibold flex justify-center">Rooms</h2>
//         </div>
//         <div className="o">
//           {sortedRooms.map(room => (
//             <div key={room._id} className="relative">
//               <div className="flex items-center justify-between p-4 hover:bg-gray-600 cursor-pointer">
//                 <div className="flex-1">
//                   <h3 className="font-medium  text-gray-300">{room.name}</h3>
//                   <p className="text-sm text-gray-500">
//                     {new Date(room.lastUpdated).toLocaleString()}
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => {
//                     setSelectedRoom(room);
//                     setShowOptions(true);
//                   }}
//                   className="p-1 hover:bg-gray-200 rounded"
//                 >
//                   <MoreVertical className="w-5 h-5" />

//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Options Sidebar */}
//       {showOptions && (
//         <div className="w-48 bg-white border-r">
//           <div className="p-4 border-b flex justify-between items-center">
//             <h3 className="font-semibold">Options</h3>
//             <button
//               onClick={() => {
//                 setShowOptions(false);
//                 setShowUsersList(false);
//               }}
//               className="p-1 hover:bg-gray-200 rounded"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </div>
//           <div className="p-2">
//             <button
//               onClick={() => {/* TODO: Navigate to room */}}
//               className="w-full p-2 flex items-center gap-2 hover:bg-gray-100 rounded"
//             >
//               <LogIn className="w-5 h-5" />
//               Go to Room
//             </button>
//             {selectedRoom?.isOwner && (
//               <>
//                 <button
//                   onClick={() => setShowUsersList(true)}
//                   className="w-full p-2 flex items-center gap-2 hover:bg-gray-100 rounded"
//                 >
//                   <Users className="w-5 h-5" />
//                   Edit Room Users
//                 </button>
//                 <button
//                   onClick={() => handleDeleteRoom(selectedRoom.id)}
//                   className="w-full p-2 flex items-center gap-2 hover:bg-gray-100 rounded text-red-600"
//                 >
//                   <Trash2 className="w-5 h-5" />
//                   Delete Room
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Users List Sidebar */}
//       {showUsersList && (
//         <div className="w-64 bg-white border-r">
//           <div className="p-4 border-b">
//             <h3 className="font-semibold mb-2">Room Users</h3>
//             <div className="relative">
//               <Search className="w-5 h-5 absolute left-2 top-2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search users..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-9 pr-4 py-2 border rounded"
//               />
//             </div>
//           </div>
//           <div className="overflow-y-auto">
//             {filteredUsers.map(user => (
//               <div
//                 key={user.id}
//                 className="flex items-center justify-between p-4 hover:bg-gray-50"
//               >
//                 <span>{user.name}</span>
//                 <button
//                   onClick={() => handleDeleteUser(selectedRoom.id, user.id)}
//                   className="p-1 hover:bg-gray-200 rounded text-red-600"
//                 >
//                   <Trash2 className="w-4 h-4" />
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RoomSidebar;