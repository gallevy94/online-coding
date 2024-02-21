import { React, useRef, useEffect, useState } from "react";
import Editor from "@monaco-editor/react";

function Mentor({ socket, blockPressed }) {
  const editorRef = useRef(null);
  const [editorScreen, setEditorScreen] = useState("");

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  useEffect(() => {
    socket.on("receive_changes", (newData) => {
      setEditorScreen(newData.message);
      console.log(newData.message, "new data");
    });

    if (editorScreen) {
      editorRef.current.setValue(editorScreen);
    }
  }, [socket, editorScreen]);

  return (
    <div>
      <h1>{blockPressed.title}</h1>
      <Editor
        height="50vh"
        width="80vw"
        defaultLanguage="javascript"
        theme="vs-dark"
        defaultValue={blockPressed.code}
        onMount={handleEditorDidMount}
        options={{
          readOnly: true,
          fontSize: 20,
        }}
      />
    </div>
  );
}

export default Mentor;
