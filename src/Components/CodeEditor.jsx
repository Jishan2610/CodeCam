import { useRef, useState ,useEffect} from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import ThemeSelector from "./ThemeSelector";
import { CODE_SNIPPETS } from "../Constants/CodeSnippet";
const CodeEditor = ({language,code,handleCodeChange,handleLanguageChange}) => {
  const editorRef = useRef();
  const [theme, setTheme] = useState("vs-dark");
  useEffect(() => {
    editorRef.current?.focus();
  },[language,theme]);
  const onMount = (editor) => {

    editorRef.current = editor;
    editorRef.current?.focus();
  };

  
  const onSelect2=(theme)=>{
    setTheme(theme);
  }

  return (
    <div className ="w-full h-full col-span-7" >
      <div className="flex ml-5">
        <LanguageSelector language={language} handleLanguageChange={handleLanguageChange} />
        <ThemeSelector theme={theme} onSelect={onSelect2}/>
      </div>
      <div className ="h-full w-full">
        <Editor
          options={{
                autoIndent: 'full',
                contextmenu: true,
                fontFamily: 'monospace',
                fontSize: 13,
                lineHeight: 24,
                hideCursorInOverviewRuler: true,
                matchBrackets: 'always',
                minimap: {
                  enabled: true,
                },
                scrollbar: {
                  horizontalSliderSize: 4,
                  verticalSliderSize: 18,
                },
                selectOnLineNumbers: true,
                roundedSelection: false,
                readOnly: false,
                cursorStyle: 'line',
                automaticLayout: true,
          }}
          ref={editorRef}
          theme={theme}
          language={language.split(" (")[0].toLowerCase()}
          defaultValue={CODE_SNIPPETS[language.split(" (")[0].toLowerCase()]}
          onMount={onMount}
          value={code}
          onChange={(value)=>handleCodeChange(value)}
          
        />
      </div>
    </div>
  );
};
export default CodeEditor;

// import React, { useRef, useEffect } from 'react';
// import * as monaco from 'monaco-editor';

// const CodeEditor = ({ language, code, onChange }) => {
//   const editorRef = useRef(null);

//   useEffect(() => {
//     if (editorRef.current) {
//       // Create Monaco editor instance
//       const editor = monaco.editor.create(editorRef.current, {
//         value: code,
//         language: language,
//         theme: 'vs-dark',
//         automaticLayout: true,
//         suggestOnTriggerCharacters: true,  // Enable suggestions
//         quickSuggestions: true,             // Enable quick suggestions
//         wordBasedSuggestions: true,         // Enable word-based suggestions
//         acceptSuggestionOnEnter: 'on',      // Accept suggestions with Enter key
//         tabCompletion: 'on',                // Tab for auto-complete
//       });

//       // Set up event listener for code changes
//       editor.onDidChangeModelContent(() => {
//         onChange(editor.getValue());
//       });

//       // Cleanup function to dispose of the editor when unmounting
//       return () => editor.dispose();
//     }
//   }, [language]);

//   return <div ref={editorRef} className="h-full w-full" />;
// };

// export default CodeEditor;
