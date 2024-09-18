import React, { useState, useEffect } from "react";
import CodeEditor from "./Components/CodeEditor";
import LanguageSelector from "./Components/LanguageSelector";

function App() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const handleCodeChange = (newCode) => {
    setCode(newCode);
    
  };

  // Handler for language changes
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <div className="flex h-screen bg-gray-100 w-screen">
        <CodeEditor
          language={language}
          code={code}
          onChange={handleCodeChange}
        />
      </div>
  );
}

export default App;
