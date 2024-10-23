import React from 'react';
import BoxWithCircles from '../Components/BoxWithCircles';
import Logo from '../Components/Logo';
import { CreateRoomButton,JoinRoomFieldWithButton } from '../Components/CreateRoom';
import { usePlayground } from "../CustomHooks/usePlayground";
import LeftSidebar from '../Components/LeftSidebar';

const Dashboard = () => {
  const {language,
    setLanguage,
    code,
    setCode} = usePlayground();
  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <LeftSidebar/>

      {/* Main Content Area */}
      <main className="flex-1 bg-slate-700 p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            {/* Placeholder for the Logo in Header */}
          </div>
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-red-600">
            Sign Out
          </button>
        </header>

        {/* Big and Small Text */}
        <div className="text-center">
          <h1 className="text-5xl text-white font-bold mb-4">The best place to play <br/>around code collaboratively while <br/>laughing on calls..😁</h1>
          <p className="text-xl text-white mb-8">Some Small Font Text</p>
        </div>

        {/* Create Room Button and Join Room Field */}
        <div className="flex justify-center mb-10 space-x-4 relative top-19">
          <CreateRoomButton/>
          
          <JoinRoomFieldWithButton setLanguage={setLanguage} setCode={setCode}/>
          
        </div>

        {/* Cards with Language Names */}
        <div className="grid grid-cols-5 absolute bottom-11 gap-9 justify-center">
          <div className="bg-slate-500 p-6 text-center text-white rounded-lg  hover:origin-center hover:rotate-45 transform transition-transform duration-300 ease-in-out shadow-2xl col-span-1 h-[145px] flex flex-col justify-center">
            <h2 className="text-3xl font-bold">JavaScript</h2>
          </div>
          <div className="bg-slate-500 p-6 text-center text-white rounded-lg hover:origin-center hover:rotate-45 transform transition-transform duration-300 ease-in-out shadow-2xl col-span-1 h-[145px] flex flex-col justify-center">
            <h2 className="text-3xl font-bold">Python</h2>
          </div>
          <div className="bg-slate-500 p-6 text-center text-white rounded-lg hover:origin-center hover:rotate-45 transform transition-transform duration-300 ease-in-out shadow-2xl col-span-1 h-[145px] flex flex-col justify-center">
            <h2 className="text-3xl font-bold">Java</h2>
          </div>
          <div className="bg-slate-500 p-6 text-center text-white rounded-lg hover:origin-center hover:rotate-45 transform transition-transform duration-300 ease-in-out shadow-2xl col-span-1 h-[145px] flex flex-col justify-center">
            <h2 className="text-3xl font-bold">Golang</h2>
          </div>
          <div className="bg-slate-500 p-6 text-center text-white rounded-lg hover:origin-center hover:rotate-45 transform transition-transform duration-300 ease-in-out shadow-2xl col-span-1 h-[145px] flex flex-col justify-center">
            <h2 className="text-3xl font-bold">C#</h2>
          </div>
        </div>
      </main>

     
      

    </div>
  );
};

export default Dashboard;
