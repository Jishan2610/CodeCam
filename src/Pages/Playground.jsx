import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CodeEditor from "../Components/CodeEditor";
import OutputPanel from "../Components/OutputPanel";
import { CODE_SNIPPETS } from "../Constants/CodeSnippet";
import { usePlayground } from "../CustomHooks/usePlayground";
import useSocket from "../CustomHooks/contextProvider";
function Playground() {
  const socket=useSocket();
  const location = useLocation();
  // const [language, setLanguage] = useState("JavaScript (Node.js 12.14.0)");
  // const [code, setCode] = useState(CODE_SNIPPETS["javascript"]);
  //Custom Hook usePlayground();
  const {language,
    setLanguage,
    code,
    setCode} = usePlayground();
  const handleCodeChange = (newCode) => {
    setCode(newCode);
    socket.emit("code change", { roomId, newCode }); 
  };

  // Handler for language changes
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    const lang=newLanguage.split(" (")[0].toLowerCase();
    console.log(lang)
    setCode(CODE_SNIPPETS[lang]);
    socket.emit("language change", { roomId, newLanguage, code: CODE_SNIPPETS[lang] });
  };
  //Get the room id using the state 
  const roomId = location.state?.roomId;
  console.log(roomId)
   // Listen for code and language changes from other users in the room
   useEffect(() => {
    // Listen for code change event from others in the room
    socket.on("code changed", ({ code ,senderId}) => {
      setCode(code);  // Update local code state when other users change code
    });

    // Listen for language change event from others in the room
    socket.on("language changed", ({ newLanguage, code ,senderId}) => {
      setLanguage(newLanguage);
      setCode(code);  // Update both language and code
    });

    // Clean up event listeners when the component unmounts
    return () => {
      socket.off("code changed");  // Remove listener to prevent memory leaks
      socket.off("language changed");
    };
  }, [socket, setCode, setLanguage]); 

  return (
    <div className="grid grid-cols-12 bg-gray-100 max-w-[97vw] h-97vh">
        <CodeEditor
          language={language}
          code={code}
          handleCodeChange={handleCodeChange}
          handleLanguageChange={handleLanguageChange}
        />
        <OutputPanel language={language}
          code={code}/>
    </div>
  );
}

export default Playground;