import React, { useState, useEffect, useRef, useContext } from "react";
import { useLocation } from "react-router-dom";
import { NetworkStatus, useMutation, useQuery } from "@apollo/client";
import Header from "../../layout/Header";
import "../../index.css";
import { FaPlus, FaTimes } from "react-icons/fa";
import {
  getBoard,
  createListOfCards,
  createCardToListOfCards,
} from "./helper/boardHelper";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import CardModal from "../../modals/CardModal";
import { UserContext } from "../../context/UserContext/userContext";
import { SET_USER_BOARD } from "../../context/UserContext/actions.types";

const Board = () => {
  const location = useLocation();
  const [listName, setListName] = useState("");
  const [cardListId, setCardListId] = useState("");
  const [currentSelectedCard, setCurrentSelectedCard] = useState("");
  const cardModel = useRef();
  const addListIdleRef = useRef("");
  const addListInputRef = useRef("");
  const {
    state: { boards },
    dispatch,
  } = useContext(UserContext);

  const { data, loading, refetch } = useQuery(getBoard, {
    variables: {
      getBoardGetBoardInput: {
        workspaceId: location.state.workspace._id,
        boardId: location.state.board._id,
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const [addListOfCardFunc] = useMutation(createListOfCards);
  const [addCardToListOfCardFunc] = useMutation(createCardToListOfCards);

  useEffect(() => {
    if (data) {
      // console.log(data);
      dispatch({
        type: SET_USER_BOARD,
        payload: data.getBoard,
      });
    }
  }, [data]);

  const addListOfCard = async () => {
    const res = await addListOfCardFunc({
      variables: {
        createCardListInput: {
          workspaceId: location.state.workspace._id,
          boardId: location.state.board._id,
          listName: listName,
        },
      },
    });

    if (res.data) {
      dispatch({
        type: SET_USER_BOARD,
        payload: res.data.createCardList,
      });
      setListName("");
    }
  };

  if (loading) {
    return <div>loading</div>;
  }

  const addListController = (value) => {
    if (value) {
      addListIdleRef.current.style.display = "none";
      addListInputRef.current.style.display = "flex";
    } else {
      addListIdleRef.current.style.display = "flex";
      addListInputRef.current.style.display = "none";
    }
  };

  const handleDnD = (e) => {
    const temp = location.state.board.listOfCards.find(
      (cardList) => cardList._id === e.source.droppableId
    );
    const [reorderedItem] = temp.cardList.splice(e.source.index, 1);
    temp.cardList.splice(e.destination.index, 0, reorderedItem);
    // var bd = location.state.board.listOfCards[e.source.droppableId];
    // bd.cardList = temp;
    // setBoard(bd);
    //TODO: Cant add to collection due to listOfcard subdocument4
    console.log(location.state.board.listOfCards);
    console.log(temp);
  };

  return loading ? (
    <div>loading...</div>
  ) : (
    <div
      className="h-screen"
      style={{
        background: `url(${location.state.board.imageUrl})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <CardModal
        cardModel={cardModel}
        workspaceId={location.state.workspace._id}
        boardId={location.state.board._id}
        cardListId={cardListId}
        currentSelectedCard={currentSelectedCard}
      />
      <div style={{ height: "5%" }}>
        <Header />
      </div>
      <div style={{ height: "90%" }}>
        <div className="flex flex-col px-2  m-1 h-full">
          <div className="my-2 ml-1 font-bold text-xl">
            {location.state.workspace.workspaceName}'s Workspace
          </div>
          <div className="h-full relative grow">
            <div
              id="cardScrollBar"
              className="absolute top-0 right-0 bottom-0 left-0 overflow-x-auto overflow-y-hidden whitespace-nowrap"
            >
              {Object.keys(boards).length !== 0 &&
                boards.listOfCards.map((list) => (
                  <div
                    key={list._id}
                    className="inline-block w-72 h-full whitespace-nowrap align-top pb-4"
                  >
                    <div
                      style={{ backgroundColor: "#ebecf0" }}
                      className="flex flex-col max-h-full m-1 rounded p-2 px-4 pb-4  z-10"
                    >
                      {/*TODO: Control list overflow list is overflow */}
                      <h4>{list.listName}</h4>
                      <DragDropContext onDragEnd={handleDnD}>
                        <Droppable droppableId={list._id}>
                          {(provided) => (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              id="cardScrollBar"
                              className="z-0 pr-2 grow shrink basis-full overflow-y-auto cardList"
                            >
                              {list.cardList.map((cardList, index) => (
                                <Draggable
                                  key={cardList._id}
                                  draggableId={cardList._id}
                                  index={index}
                                >
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className="w-full rounded bg-white p-2 my-1"
                                    >
                                      <div
                                        onClick={() => {
                                          cardModel.current.style.visibility =
                                            "visible";
                                          setCurrentSelectedCard(cardList);
                                          setCardListId(list._id);
                                        }}
                                      >
                                        {cardList.cardName}
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                              <div
                                onClick={() => {
                                  cardModel.current.style.visibility =
                                    "visible";
                                  // addCardToListOfCards(list._id);
                                  setCardListId(list._id);
                                }}
                                className="flex mt-2 justify-start text-gray-500 hover:bg-gray-300 rounded cursor-pointer items-center"
                              >
                                <FaPlus className="m-1 ml-2 text-xs "></FaPlus>
                                <div className="m-1">Add a card</div>
                              </div>
                            </div>
                          )}
                        </Droppable>
                      </DragDropContext>
                    </div>
                  </div>
                ))}
              <div className="inline-block w-72 ">
                <div ref={addListIdleRef} className="hidden flex-col">
                  <div className="mt-1 px-2 w-full">
                    <input
                      type="text"
                      id="text"
                      placeholder="Enter list title... "
                      className="p-2 w-full rounded border-2 border-gray-200 focus:border-transparent focus:ring-2 focus:outline-none"
                      value={listName}
                      onChange={(e) => setListName(e.target.value)}
                    />
                  </div>
                  <div className="mt-2 flex items-center">
                    <div
                      onClick={() => addListOfCard()}
                      className="text-white ml-2 py-2 px-4  justify-start bg-black bg-opacity-20 hover:bg-opacity-30 rounded cursor-pointer "
                    >
                      Add
                    </div>
                    <FaTimes
                      onClick={() => addListController(true)}
                      className="mx-1 ml-2 text-xs cursor-pointer "
                    ></FaTimes>
                  </div>
                </div>
                <div
                  onClick={() => addListController(false)}
                  ref={addListInputRef}
                  className="flex h-10 m-1 py-3 pr-3 pl-1 justify-start text-gray-300 bg-black bg-opacity-20 hover:bg-opacity-30 rounded cursor-pointer items-center"
                >
                  <FaPlus className="m-1 ml-2 text-xs "></FaPlus>
                  <div className="m-1">Add card</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
