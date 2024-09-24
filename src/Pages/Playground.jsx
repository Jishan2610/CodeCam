import React, { useState, useEffect } from "react";
import CodeEditor from "../Components/CodeEditor";
import OutputPanel from "../Components/OutputPanel";
import { CODE_SNIPPETS } from "../Constants/CodeSnippet";
function Playground() {
  const [language, setLanguage] = useState("JavaScript (Node.js 12.14.0)");
  const [code, setCode] = useState(CODE_SNIPPETS["javascript"]);
  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  // Handler for language changes
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    const lang=newLanguage.split(" (")[0].toLowerCase();
    console.log(lang)
    setCode(CODE_SNIPPETS[lang]);
  };

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