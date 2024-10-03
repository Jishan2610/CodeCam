import React,{useState,useEffect,useRef} from "react" ;
import socketIo from "socket.io-client"
import { useNavigate } from "react-router-dom";

import axios from "axios";

function CreateRoomButton() {
    const [roomName,setRoomName]=useState("");
    const navigate = useNavigate();
    const socketRef = useRef();
    useEffect(() => {
        socketRef.current = socketIo(import.meta.env.VITE_SERVER_URL);
       

        // Cleanup on unmount to avoid reconnections
        // return () => {
        //     socketRef.current.disconnect();
        // };
    }, []);

    const roomNameHandler=(e)=>{
        setRoomName(e.target.value);
    }
    const roomCreationHandler=async ()=>{
        try{
        const formData={
            "name":roomName,
            "language":"JavaScript"
        }
        const response=await axios({
            // Endpoint to send files
            url: import.meta.env.VITE_SERVER_URL+"/api/v1/room/create",
            method: "POST",
            headers: {
                // Add any auth token here
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },

            // Attaching the form data
            data: formData,
        })
        console.log(response);
        const roomId=response.data.roomId;
        if(response.status>=200 && response.status<300){
            console.log(roomId)
            socketRef.current.emit("join room", {roomId});
            socketRef.current.on("room joined",(roomId)=>{
                console.log(`room joined ${roomId}`)
            })
            navigate("/playground");
        }
        else {
            //will throw some error
        }
    }catch(e){
        console.log(e);
    }
    }
  return (
    <>
    <div className="flex"></div>
    <input
          type="text"
          placeholder="Enter new room name"
          className="border border-gray-300 p-2 rounded-l-lg focus:ring focus:ring-blue-500"
          onChange={roomNameHandler}
        />
      <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={roomCreationHandler}>
        Create a Room
      </button>
      <div/>
    </>
  );
}

function JoinRoomFieldWithButton() {
  return (
    <>
      <div className="flex">
        <input
          type="text"
          placeholder="Enter Room Id"
          className="border border-gray-300 p-2 rounded-l-lg focus:ring focus:ring-blue-500"
        />
        <button className="px-4 bg-green-500 text-white rounded-r-lg hover:bg-green-600">
          Join Room
        </button>
      </div>
    </>
  );
}

export { CreateRoomButton, JoinRoomFieldWithButton };
