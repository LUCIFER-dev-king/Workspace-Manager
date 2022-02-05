import React, { useState, useEffect, useRef, useContext } from "react";
import { useLocation } from "react-router-dom";
import {
  FaRegCommentAlt,
  FaPager,
  FaAlignRight,
  FaRegCheckSquare,
  FaRegUser,
  FaRegClock,
} from "react-icons/fa";
import { MdClose, MdAttachFile } from "react-icons/md";
import {
  getBoard,
  createListOfCards,
  createCardToListOfCards,
} from "../pages/board/helper/boardHelper";
import { useMutation } from "@apollo/client";
import { SET_USER_BOARD } from "../context/UserContext/actions.types";
import { UserContext } from "../context/UserContext/userContext";

const CardModal = ({
  cardModel,
  workspaceId,
  boardId,
  cardListId,
  currentSelectedCard,
}) => {
  const dateModel = useRef();
  const { _id, cardName, cardDesc, startDate, endDate } = currentSelectedCard;

  const [cardTitle, setCardTitle] = useState("");
  const [cardDescrip, setCardDesc] = useState("");
  const [cardDueDate, setCardDueDate] = useState("");
  const [cardStartDate, setCardStartDate] = useState("");

  const { dispatch } = useContext(UserContext);

  const [addCardToListOfCardFunc] = useMutation(createCardToListOfCards);

  const addCard = async () => {
    const res = await addCardToListOfCardFunc({
      variables: {
        createCardInput: {
          workspaceId: workspaceId,
          boardId: boardId,
          cardListId: cardListId,
          cardName: cardTitle,
          cardDesc: cardDescrip,
          startDate: cardStartDate,
          endDate: cardDueDate,
        },
      },
    });

    if (res.data) {
      dispatch({
        type: SET_USER_BOARD,
        payload: res.data.createCard,
      });
      setCardTitle("");
      setCardDesc("");
      cardModel.current.style.visibility = "hidden";
    }
  };

  useEffect(() => {
    if (currentSelectedCard) {
      setCardTitle(cardName);
      setCardDesc(cardDesc);
      setCardStartDate(startDate);
      setCardDueDate(endDate);
    }
  }, [currentSelectedCard]);

  return (
    <div
      ref={cardModel}
      className=" bg-black bg-opacity-25 h-screen w-screen fixed z-20 invisible overflow-auto"
    >
      <div className="relative z-30 mx-auto my-10 w-3/5 min-h-fit transparent rounded bg-white p-2 ">
        <div
          ref={dateModel}
          className="absolute top-0 right-0 w-60 h-full bg-gray-200 invisible"
        >
          <div class="flex flex-col w-full p-2">
            <div className="flex my-1 items-center justify-center">
              <h4 className="ml-auto ">Dates</h4>
              <MdClose
                onClick={() => (dateModel.current.style.visibility = "hidden")}
                className="ml-auto cursor-pointer"
              />
            </div>
            <hr />

            <div className="mt-3 W-100">
              <h3>Start date</h3>
              <input
                type="date"
                value={cardStartDate}
                onChange={(e) => setCardStartDate(e.target.value)}
                placeholder="Start date"
                className="mt-1 rounded w-full border-2 border-gray-200 p-1 focus:border-transparent focus:ring-2 focus:outline-none"
              />
            </div>

            <div className="mt-2">
              <h3>Due date</h3>
              <input
                type="date"
                onChange={(e) => setCardDueDate(e.target.value)}
                value={cardDueDate}
                placeholder="Due date"
                className="mt-1 rounded w-full border-2 border-gray-200 p-1 focus:border-transparent focus:ring-2 focus:outline-none"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full ">
          <div className="flex justify-end">
            <MdClose
              onClick={() => (cardModel.current.style.visibility = "hidden")}
              className="cursor-pointer"
            />
          </div>
          <div className="flex justify-between w-full p-2 ">
            <div className="p-1 w-9/12 flex flex-col">
              <div className="flex items-start w-full">
                <div className="mt-1">
                  <FaPager />
                </div>
                <div className="flex flex-col">
                  <h4 className="ml-1 font-bold px-1">Title</h4>
                  <div className="mt-2 px-2">
                    <input
                      id="boardName"
                      type="text"
                      value={cardTitle}
                      onChange={(e) => setCardTitle(e.target.value)}
                      placeholder="Workspace name"
                      className="mt-1 rounded w-full border-2 border-gray-200 p-1 focus:border-transparent focus:ring-2 focus:outline-none"
                    />
                  </div>
                  {cardDueDate && (
                    <div className="px-2 mt-1">
                      <h4>Due Date</h4>
                      <div className=" flex items-center">
                        <input type="checkbox" className="mr-2" />
                        {cardDueDate}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-start mt-2 w-full">
                <div className="pt-3">
                  <FaAlignRight />
                </div>
                <div className="flex flex-col ">
                  <h4 className="my-2 ml-1 font-bold px-1">Description</h4>
                  <div className="mt-2 px-2 mr-10">
                    <textarea
                      className="rounded border-2 border-gray-200 focus:border-transparent focus:ring-2 focus:outline-none w-full"
                      name="desc"
                      id=""
                      value={cardDescrip}
                      onChange={(e) => setCardDesc(e.target.value)}
                      cols="100"
                      rows="5"
                      placeholder="Add a more detailed description"
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="flex flex-col mt-2 w-full">
                <div className="flex items-start">
                  <div className="pt-3">
                    <FaRegCheckSquare />
                  </div>
                  <div className="flex flex-col w-full">
                    <h4 className="mt-2 ml-1 font-bold px-1">Checklist</h4>
                  </div>
                </div>
                <div className="flex items-center">
                  <input className="ml-1" type="checkbox" />
                  <div className="w-full">
                    <h4 className=" ml-1 font-normal px-1">Checklist Name</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-3/12 p-1 flex flex-col">
              <div
                onClick={() => (dateModel.current.style.visibility = "visible")}
                className="p-2 flex items-center font-normal bg-gray-300 hover:bg-gray-200 rounded cursor-pointer"
              >
                <FaRegClock />
                <h4 className="ml-2"> Dates</h4>
              </div>
              <div
                onClick={addCard}
                className="p-2 mt-2 flex items-center font-normal bg-gray-300 hover:bg-gray-200 rounded cursor-pointer"
              >
                <FaRegCheckSquare />
                <h4 className="ml-2"> Checklist</h4>
              </div>
              <div className="p-2 mt-2  flex items-center font-normal bg-gray-300 hover:bg-gray-200 rounded cursor-pointer">
                <MdAttachFile />
                <h4 className="ml-2"> Members</h4>
              </div>
              <div
                onClick={addCard}
                className="p-2 mt-2 bg-green-500 hover:bg-opacity-90 text-white flex justify-center items-center font-normal  rounded cursor-pointer"
              >
                <p>Save</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
