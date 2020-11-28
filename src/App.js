import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import FlipMove from "react-flip-move";

import "./App.css";
import Message from "./Message";
import db from "./firebase";
import firebase from "firebase";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [userName, setUsername] = useState("");

  useEffect(() => {
    setUsername(prompt("Please enter a Username..."));
  }, []);

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("messages").add({
      userName: userName,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="app">
      <div className="app__title">
        <h1>Chat Room</h1>
        <p>
          <strong>{userName}</strong> has joined the chat
        </p>
      </div>
      <form className="app__form">
        <div className="app__formGroup">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="app__form-input"
            placeholder="Enter Your Message..."
          />

          <Button
            type="submit"
            onClick={sendMessage}
            variant="contained"
            color="primary"
            disabled={!input}
            className="app__form-button"
          >
            Send
          </Button>
        </div>
      </form>

      <div className="app__messages">
        <FlipMove style={{ display: "flex", flexDirection: "column-reverse" }}>
          {messages?.map(({ id, message }) => (
            <Message key={id} userName={userName} message={message} />
          ))}
        </FlipMove>
      </div>
    </div>
  );
}

export default App;
