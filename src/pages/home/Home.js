import React, { useState, useEffect, useContext } from "react";

import { UserContext } from "../../context/UserContext/userContext";
import Base from "../../layout/Base";
import Card from "../../components/Card";

const Home = () => {
  const current = new Date();
  const date = current.getDate();
  const month = current.getMonth() + 1;
  const year = current.getFullYear();
  const [dueArray, setDueArray] = useState([]);

  const {
    state: { user },
  } = useContext(UserContext);

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      var arr = [];
      user.workspace.forEach((workspace, id) => {
        workspace.boards.forEach((board, id) => {
          board.listOfCards.forEach((list, id) => {
            list.cardList.forEach((card, id) => {
              if (card.endDate) {
                var dueDate = card.endDate.split("-");

                if (
                  dueDate[0] >= year &&
                  dueDate[1] >= month &&
                  dueDate[2] >= date
                ) {
                  console.log(dueDate);
                  arr.push(card);
                }
              }
            });
          });
        });
      });
      setDueArray(arr);
    }
  }, []);

  return (
    <Base>
      <div className="md:p-0 col-span-12 md:col-span-6 h-screen overflow-y-hidden">
        {dueArray.length > 0 &&
          dueArray.map((due, id) => <Card key={id} card={due} />)}
      </div>
    </Base>
  );
};

export default Home;
