// import * as React from "react";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import "./Table.css";
import Axios from 'axios'

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
  const [users, setUsers] = useState([]);
  const d=(id) => {
    console.log("functin called")
    try{
      Axios.delete(`http://localhost:5000/qs/${id}`).then((resp) => {
        let temp = users;
        temp = users.filter(user => user.id != id);
        setUsers(temp);
      })
  } 
    catch(err){
      console.log(err.message)
    }
  }
  // console.log(currentUser)
  useEffect(() => {
    Axios.get(`http://localhost:5000/qs`)
      .then((res) => {
        setUsers(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_2kxe94t', 'template_q60oaah', form.current,'K59exiF50R09rLBAC')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
      <div className="Table">
      <h3>Users</h3>
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        >
          <Table sx={{ minWidth: 750 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell align="left">Account ID</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Operation</TableCell>
                <TableCell align="left"></TableCell>
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
                  <TableCell align="left">{user.query}</TableCell>
                  <TableCell align="left">{user.email}</TableCell>
                  {/* <TableCell align="left">
                    <span className="status" style={makeStyle(row.status)}>{row.status}</span>
                  </TableCell> */}
                  <button className="delete" on onClick={() => d(user.id)}>Delete</button>
                  {/* <button>Delete</button> */}
                  <TableCell>
                  <form ref={form} onSubmit={sendEmail}>
                  {/* <label>Name</label>
                  <input type="text" name="user_name" /> */}
                  <label>Email</label>
                  <input name="user_email" type="hidden" value={user.email} />
                  <label>Message</label>
                  <textarea name="message" />
                  <button className="delete" type="Submit" value ="Send">Send</button>
                  {/* <input type="Submit" value="Send" /> */}
                  </form>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
}
