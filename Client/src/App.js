import "./App.css";
import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import io from "socket.io-client";
import LobbyPage from "./components/LobbyPage";
import Mentor from "./components/Mentor";
import Student from "./components/Student";

let socket;
let isMentor;

function App() {
  const [blockPressed, setBlockPressed] = useState({});
  const [blocksData, setBlocksData] = useState([]);

  useEffect(() => {
    socket = io.connect("http://localhost:5000");

    socket.on("connect", () => {
      socket.on("send_data_blocks", (data) => {
        setBlocksData(data.data);
      });

      socket.on("role", (receivedRole) => {
        isMentor = receivedRole;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <LobbyPage
                socket={socket}
                setBlockPressed={setBlockPressed}
                blocksData={blocksData}
                isLocked={isMentor === "true"}
              />
            }
          />
          <Route
            path="/codeblock"
            element={
              <div>
                {console.log(isMentor)}
                {isMentor === "true" ? (
                  <Mentor socket={socket} blockPressed={blockPressed} />
                ) : (
                  <Student socket={socket} blockPressed={blockPressed} />
                )}
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
