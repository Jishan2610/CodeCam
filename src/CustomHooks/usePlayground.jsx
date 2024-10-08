import { useState } from "react";
import { CODE_SNIPPETS } from "../Constants/CodeSnippet";

export const usePlayground = () => {
    const [language, setLanguage] = useState("JavaScript (Node.js 12.14.0)");
    const [code, setCode] = useState(CODE_SNIPPETS["javascript"]);

  return {
    language,
    setLanguage,
    code,
    setCode,
  };
};
