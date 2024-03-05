import { React, useRef } from "react";
import Editor from "@monaco-editor/react";
import "./Student.css";

function Student({ socket, blockPressed }) {
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  //handle student code changes
  function handleEditorChange(value) {
    socket.emit("send_changes", { id: blockPressed.id, message: value });
  }

  //calls when student click submit btn
  const submitStudentCode = (event) => {
    const finalCode = editorRef.current.getValue();
    socket.emit("send_solution", { id: blockPressed.id, message: finalCode });
  };

  socket.on("receive_solution", (isCorrect) => {
    if (isCorrect) {
      alert("You Are Right!😃");
    } else {
      alert("Try Again");
    }
  });

  return (
    <div>
      <h1>{blockPressed.title}</h1>
      <button className="btn" onClick={submitStudentCode}>
        Submit code
      </button>
      <Editor
        height="50vh"
        width="80vw"
        defaultLanguage="javascript"
        theme="vs-dark"
        defaultValue={blockPressed.code}
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
        options={{
          fontSize: 20,
        }}
      />
    </div>
  );
}

export default Student;
