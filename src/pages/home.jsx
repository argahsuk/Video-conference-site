import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function Home()  {
  const [roomId,setRoomId]=useState("")
  const navigate=useNavigate()

  const handleJoin=()=>{
    if (roomId.trim()) {//just not spaces
      navigate(`/room/${roomId}`)
    }
  }

  const handleCreate=()=>{
    const newId=uuidv4()
    navigate(`/room/${newId}`);
  }

  return (
    <div className="container">
      <h1>Welcome to <b style={{ color: '#fb4b2cff' ,fontWeight:'bolder'}}>Face 2 Face</b><br />Video conferencing website</h1>      
      <div className="join-create">
        <input type="text" value={roomId} onChange={(e)=>{setRoomId(e.target.value)}} placeholder="Enter Room Id"/> 
      </div>
        <button onClick={handleJoin}>Join Room</button>
        <button onClick={handleCreate}>Create New Room</button>
    </div>
  );
};
export default Home;
