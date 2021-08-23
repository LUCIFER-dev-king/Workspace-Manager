import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../../layout/Header";
import "../../index.css";
import { FaPlus } from "react-icons/fa";

const Board = () => {
  const location = useLocation();
  console.log(location.state.board);

  return (
    <div
      className='h-screen'
      style={{
        background: `url('https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2386x1600/47f09f0e3910259568294477d0bdedac/photo-1576502200916-3808e07386a5.jpg')`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Header />
      <div className='flex flex-col px-2 m-1'>
        <div className='flex'>
          <div className=' py-1 rounded font-bold hover:bg-black text-xl cursor-pointer hover:bg-opacity-10'>
            KanbanTemplate
          </div>
        </div>
        <div id='scrollBoard' className='w-full mt-2 '>
          <div
            className='flex whitespace-nowrap overflow-x-auto'
            style={{ height: "36rem" }}
          >
            <div
              style={{ minHeight: "40px" }}
              className='w-72 flex-shrink-0 bg-gray-100 m-1 rounded p-2 bg-gray-200'
            >
              <div className='font-medium'>Name</div>

              <div className='w-full rounded'>
                <div>Card Name</div>
              </div>

              <div className='flex mt-2 justify-start text-gray-500 hover:bg-gray-300 rounded cursor-pointer items-center'>
                <FaPlus className='m-1 ml-2 text-xs '></FaPlus>
                <div className='m-1'>Add a card</div>
              </div>
            </div>
            <div className='w-72 h-20 flex-shrink-0 bg-gray-100 m-1'>Board</div>
            <div className='w-72 h-20 flex-shrink-0 bg-gray-100 m-1'>Board</div>
            <div className='w-72 h-20 flex-shrink-0 bg-gray-100 m-1'>Board</div>
            <div className='w-72 h-20 flex-shrink-0 bg-gray-100 m-1'>Board</div>
            <div className='w-72 h-20 flex-shrink-0 bg-gray-100 m-1'>Board</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
