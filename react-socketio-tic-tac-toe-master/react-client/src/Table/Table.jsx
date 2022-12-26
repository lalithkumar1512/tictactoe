// import * as React from "react";
import React, { useContext,useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import Axios from 'axios'
import { Game } from "../components/game";
import { useNavigate } from "react-router-dom";
import gameContext from "./../gameContext";
import gameService from "./../services/gameService";
import socketService from "./../services/socketService";
// interface IJoinRoomProps {}
function createData(name, accountId, date, status) {
  return { name, accountId, date, status };
}


const makeStyle=(status)=>{
  if(status === 'Approved')
  {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
    }
  }
  else if(status === 'Pending')
  {
    return{
      background: '#ffadad8f',
      color: 'red',
    }
  }
  else{
    return{
      background: '#59bfff',
      color: 'white',
    }
  }
}

export default function BasicTable() {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState("");
  var t=[]
  var i=0
  for(i=0;i<100;i++){
    t=[...t,false]
  }
  const [isJoining, setJoining] = useState(t);
  console.log(isJoining)

  const { setInRoom, isInRoom } = useContext(gameContext);
 

  const handleRoomNameChange = (e) => {
    const value = e.target.value;
    setRoomName(value);
  };
  const  joinRoom = async (e) => {
    console.log(e.target.room.value)
    e.preventDefault();
    let room=e.target.room.value
    const socket = socketService.socket;
    if (!room || room.trim() === "" || !socket) return;

    setJoining(true);


    const joined = await gameService
      .joinGameRoom(socket, room)
      .catch((err) => {
        alert(err);
      });

    console.log(1)
    if (joined) {
      setInRoom(true);
      navigate("/Game");
    }

    setJoining(false);
  };

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("current-user"))
  );
  const [users, setUsers] = useState([]);
  // console.log(currentUser)
  useEffect(() => {
    Axios.get(`http://localhost:5000/users`)
      .then((res) => {
        setUsers(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(currentUser.email);
  console.log(isInRoom);
  return (
   
      <div className="Table">
      <h3>Users</h3>
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
          // style={{ overflow:"auto" }}
        >
          <Table sx={{ minWidth: 700 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell align="left">Account ID</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Operation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {users.map((user) => (
                <TableRow
                  key={user.username}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user.username}
                  </TableCell>
                  <TableCell align="left">{user.id}</TableCell>
                  <TableCell align="left">{user.email}</TableCell>
                  {/* <TableCell align="left">
                    <span className="status" style={makeStyle(row.status)}>{row.status}</span>
                  </TableCell> */}
                  <TableCell>
                  <form onSubmit={joinRoom}>

                  <h4>Enter Room ID to Join the Game</h4>
                  <input
                        id="room"
                        placeholder="Room ID"
                        type="hidden"
                        value={user.email+currentUser.email}
                        onChange={handleRoomNameChange}
                    />
                   <button type="submit" disabled={isJoining[user.id]}>
                        {isJoining[user.id] ? "Joining..." : "Join"}
                     </button>
                     </form>
                  </TableCell>
                
    
                  {/* <button className="delbtnnadmin" on onClick={() => d(user.id)}>Delete</button> */}
                  {/* <button>Delete</button> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
}
