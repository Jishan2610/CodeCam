import React from "react";

export const OutputWindow = ({ outputDetails }) => {
    const isBase64 = (str) => {
        try {
          return btoa(atob(str)) === str;
        } catch (err) {
          return false;
        }
      };
  const getOutput = () => {
    let statusId = outputDetails?.status?.id;
    if(outputDetails=="Output"){
        return (
            <pre className="px-2 py-1 font-normal text-xs text-slate-500">
              {(outputDetails)}
            </pre>
          );
    }
    if (statusId === 6) {
      // compilation error
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {atob(outputDetails?.compile_output)}
        </pre>
      );
    } else if (statusId === 3) {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-green-500">
          {atob(outputDetails.stdout) !== null
            ? `${atob(outputDetails.stdout)}`
            : null}
        </pre>
      );
    } else if (statusId === 5) {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {`Time Limit Exceeded`}
        </pre>
      );
    } else {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {isBase64(outputDetails?.stderr)
            ? atob(outputDetails?.stderr)
            : "Error occurred: Invalid output"}
        </pre>
      );
    }
  };
  return (
    <>
      <h1 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2">
        Output
      </h1>
      <div className="w-full h-4/6 bg-[#1e293b] rounded-md text-white font-normal text-sm overflow-y-auto overflow-scroll">
        {outputDetails ? <>{getOutput()}</> : null}
      </div>
    </>
  );
};

//export default OutputWindow;
