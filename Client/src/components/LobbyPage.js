import "./LobbyPage.css";
import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LobbyPage({ socket, setBlockPressed, blocksData, isLocked }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLocked) {
      socket.on("receive_block", (newData) => {
        setBlockPressed(newData.message);
        navigate("/codeblock");
      });
    }
  }, [socket]);

  const onPressBlock = (id) => {
    if (isLocked) {
      return;
    }
    const block = blocksData.find((codeBlock) => id === codeBlock.id);
    setBlockPressed(block);
    socket.emit("send_block", { message: block });
    navigate("/codeblock");
  };

  return (
    <div className="container">
      <div className="title">Choose Code Block</div>
      <div className="code_blocks_container">
        {blocksData.map((codeBlock) => (
          <div
            className="code_block"
            key={codeBlock.id}
            onClick={() => onPressBlock(codeBlock.id)}
            style={{ cursor: isLocked ? "none" : "pointer" }}
          >
            {codeBlock.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LobbyPage;
