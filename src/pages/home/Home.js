import React, { useState, useEffect, useContext } from "react";

import { UserContext } from "../../context/UserContext/userContext";
import Base from "../../layout/Base";
import Card from "../../components/Card";
import { getDueDate } from "./helpers/homeHelper";
import { useQuery } from "@apollo/client";
import Loading from "../../components/Loading";

const Home = () => {
  const [dueArray, setDueArray] = useState([]);

  const {
    state: { user },
  } = useContext(UserContext);

  const { data, loading } = useQuery(getDueDate, {
    notifyOnNetworkStatusChange: true,
  });

  //Fetchs user due cards
  useEffect(() => {
    if (data) {
      setDueArray(data.getDueCard);
    }
  }, [data]);

  return (
    <Base>
      {loading ? (
        <div className="col-span-12 md:col-span-8 flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <div className="md:p-0 col-span-12 md:col-span-6 h-screen overflow-y-hidden">
          {dueArray.length > 0 ? (
            dueArray.map((due, id) => <Card key={id} card={due} />)
          ) : (
            <div>No dues found</div>
          )}
        </div>
      )}
    </Base>
  );
};

export default Home;
