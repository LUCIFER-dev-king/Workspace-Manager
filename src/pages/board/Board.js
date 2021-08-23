import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NetworkStatus, useMutation, useQuery } from "@apollo/client";
import Header from "../../layout/Header";
import "../../index.css";
import { FaPlus } from "react-icons/fa";
import { getBoard, createListOfCards } from "./helper/boardHelper";

const Board = () => {
  const location = useLocation();
  const [listName, setListName] = useState("");
  const [board, setBoard] = useState({});

  const { data, loading, refetch, networkStatus } = useQuery(getBoard, {
    variables: {
      getBoardGetBoardInput: {
        workspaceId: location.state.workspace._id,
        boardId: location.state.board._id,
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const [addListOfCardFunc] = useMutation(createListOfCards);

  useEffect(() => {
    if (data) {
      setBoard(data.getBoard);
      // console.log(data);
    }
  }, [data]);

  const addListOfCard = async () => {
    const res = await addListOfCardFunc({
      variables: {
        createCardListCreateCardListInput: {
          workspaceId: location.state.workspace._id,
          boardId: location.state.board._id,
          listName: "testsdsding",
        },
      },
    });

    if (res.data) {
      console.log(res.data);
      refetch();
    }
  };

  if (loading) {
    return <div>loading</div>;
  }

  if (networkStatus === NetworkStatus.refetch) return "Refetching";

  return loading ? (
    <div>loading...</div>
  ) : (
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
            {location.state.workspace.workspaceName}
          </div>
        </div>
        <div id='scrollBoard' className='w-full mt-2 '>
          <div
            className='flex whitespace-nowrap overflow-x-auto'
            style={{ height: "36rem" }}
          >
            {Object.keys(board).length !== 0 &&
              board.listOfCards.map((list) => (
                <div
                  key={list._id}
                  className='w-72 h-24 flex-shrink-0 bg-gray-100 m-1 rounded p-2 bg-gray-200'
                >
                  <div className='font-medium'>{list.listName}</div>

                  {list.cardList.map((cardList) => (
                    <div key={cardList._id} className='w-full rounded'>
                      <div>{cardList.cardName}</div>
                    </div>
                  ))}

                  <div className='flex mt-2 justify-start text-gray-500 hover:bg-gray-300 rounded cursor-pointer items-center'>
                    <FaPlus className='m-1 ml-2 text-xs '></FaPlus>
                    <div className='m-1'>Add a card</div>
                  </div>
                </div>
              ))}
            <div
              onClick={addListOfCard}
              className='flex h-10 m-1 py-3 pr-3 pl-1 justify-start text-gray-400 bg-black bg-opacity-20 hover:bg-gray-300 rounded cursor-pointer items-center'
            >
              <FaPlus className='m-1 ml-2 text-xs '></FaPlus>
              <div className='m-1'>Add another list</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;

// <div
//               style={{ minHeight: "40px" }}
//               className='w-72 flex-shrink-0 bg-gray-100 m-1 rounded p-2 bg-gray-200'
//             >
//               <div className='font-medium'>Name</div>

// <div className='w-full rounded'>
//   <div>Card Name</div>
// </div>

// <div className='flex mt-2 justify-start text-gray-500 hover:bg-gray-300 rounded cursor-pointer items-center'>
//   <FaPlus className='m-1 ml-2 text-xs '></FaPlus>
//   <div className='m-1'>Add a card</div>
// </div>
// </div>
