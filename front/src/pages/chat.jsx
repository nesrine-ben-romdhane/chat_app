import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsers , host} from "../utils/APIRoutes";
import Contacts from "../component/contacts";
import { ChatContainer } from "../component/ChatContainer";
import Welcome from "../component/welcome";


export function Chat() {
    const navigate = useNavigate();
    const socket = useRef();
    const [contacts, setContacts] = useState([]);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [currentUser, setCurrentUser] = useState(undefined);
  
    useEffect(() => {
        if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
          navigate("/login");
        } else {
          setCurrentUser(
             JSON.parse(
              localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
            )
          );
        }
      }, []);

      useEffect(() => {
        if (currentUser) {
          socket.current = io(host);
          console.log("socket",socket)
          socket.current.emit("add-user", currentUser._id);
        }
      }, [currentUser]);

      



      useEffect(() => {
        const users = async()=>{
            if (currentUser) {
                if (currentUser.isAvatarImageSet) {
                  const data = await axios.get(`${allUsers}/${currentUser._id}`);
                  setContacts(data.data.users);
                 
                } else {
                  navigate("/setAvatar");
                }
              }
        }
        users ()
      }, [currentUser]);
    //   console.log("contacts",contacts)


      const handleChatChange = (chat) => {
        setCurrentChat(chat);
      };
      console.log("curentchat",currentChat)
    

    return (
        <>
        <Container>
          <div className="container">
            <Contacts contacts={contacts} changeChat={handleChatChange} />
            {currentChat === undefined ? (
                <Welcome/>
              
            ) : (
              <ChatContainer currentChat={currentChat} socket={socket} />
            )}
          </div>
        </Container>
      </>
    )
}
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`

