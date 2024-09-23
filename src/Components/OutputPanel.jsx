import React,{ useState, useEffect } from "react";
import { LanguageOptions } from "../Constants/LanguageOptions";
import {OutputWindow} from "./OutputWindow"
import axios from "axios";
import {CustomInput} from "./CustomInput";
const OutputPanel = ({language,code}) => {
    const [processing, setProcessing] = useState("");
    const [outputDetails,setOutputDetails]=useState("Output")
    const [customInput,setCustomInput]=useState(null);
    const checkStatus = async (token) => {
        const options = {
          method: "GET",
          url:import.meta.env.VITE_RAPID_API_URL + "/" + token,
          params: { base64_encoded: "true", fields: "*" },
          headers: {
            "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
            "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
          },
        };
        try {
          let response = await axios.request(options);
          let statusId = response.data.status?.id;
    
          // Processed - we have a result
          if (statusId === 1 || statusId === 2) {
            // still processing
            setTimeout(() => {
              checkStatus(token)
            }, 500)
            return
          } else {
            setProcessing(false)
            setOutputDetails(response.data)
            //showSuccessToast(`Compiled Successfully!`);
            console.log('response.data', atob(response.data.stdout));
            return;
          }
        } catch (err) {
          console.log("err", err);
          setProcessing(false);
          //showErrorToast();
        }
      };
      function handleCustomInput(input){
         setCustomInput(input);
      }
    function handleExecution(){
        setProcessing(true);
        const currLanguage=LanguageOptions.filter((lang)=>{
            //console.log(lang.name+" "+language)
            return lang.name==language;
        })
        console.log(currLanguage+code)
        const formData = {
            language_id: currLanguage[0].id,
            // encode source code in base64
            source_code: btoa(code),
            stdin: btoa(customInput),
        };
        const options = {
            method: "POST",
            url: import.meta.env.VITE_RAPID_API_URL,
            params: { base64_encoded: "true", fields: "*" },
            headers: {
              "content-type": "application/json",
              "Content-Type": "application/json",
              "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
              "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
            },
            data: formData,
          };
          axios
          .request(options)
          .then(function (response) {
            console.log("res.data", response.data);
            const token = response.data.token;
            checkStatus(token);
          })
          .catch((err) => {
            let error = err.response ? err.response.data : err;
            setProcessing(false);
            console.log(error);
          });
    }

  return (
    <>
    <div className="h-full w-full col-span-5 bg-white mx-4 my-1.5">
      <OutputWindow outputDetails={outputDetails}/>
      <CustomInput customInput={customInput} handleCustomInput={handleCustomInput}/>
      <div className="w-full flex justify-center">
      <button onClick={handleExecution}className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-2">
      {processing ? "Processing..." : "Compile and Execute"}
      </button>
      </div>
      </div>
    </>
  );
};

export default OutputPanel;
