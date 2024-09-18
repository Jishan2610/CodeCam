import { useRef, useState ,useEffect} from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import ThemeSelector from "./ThemeSelector";
const CODE_SNIPPETS = {
    javascript: `\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Alex");\n`,
    typescript: `\ntype Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Alex" });\n`,
    python: `\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`,
    java: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
    csharp:
      'using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#");\n\t\t}\n\t}\n}\n',
    php: "<?php\n\n$name = 'Alex';\necho $name;\n",
    c:`\n#include <stdio.h>\nint main() {\n\t// printf() displays the string inside quotation\n\tprintf("Hello, World!");\n\treturn 0;\n}\n`, 
    cpp: `\n#include <iostream>\nint main() {\n\t// Prints Hello, World! to the console\n\tstd::cout << "Hello, World!" << std::endl;\n\treturn 0;\n}\n`, 
  };
const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [theme, setTheme] = useState("vs-dark");
  const [language, setLanguage] = useState("javascript");
  useEffect(() => {
    editorRef.current?.focus();
  },[language,theme]);
  const onMount = (editor) => {

    editorRef.current = editor;
    editorRef.current?.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };
  const onSelect2=(theme)=>{
    setTheme(theme);
  }

  return (
    <div className ="w-full h-full">
      <div className="flex ml-5">
        <LanguageSelector language={language} onSelect={onSelect} />
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
          language={language}
          defaultValue={CODE_SNIPPETS[language]}
          onMount={onMount}
          value={value}
          onChange={(value) => {
            setValue(value)
            //alert(value)
        }}
          
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
