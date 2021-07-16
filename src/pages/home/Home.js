import React from "react";
import Card from "../../components/Card";
import Base from "../../layout/Base";
import { FaTimes } from "react-icons/fa";

const Home = () => {
  return (
    <Base>
      <div className='container max-w-5xl mx-auto mt-10'>
        <div className='grid grid-cols-4 gap-1'>
          <div className='col-span-0'>
            <ul>
              <li>Boards</li>
              <li>Templates</li>
              <li>Home</li>
            </ul>
            <hr />
            <div className='flex justify-between'>
              <h5>Workspaces</h5>
              <FaTimes />
            </div>
          </div>
          <div className='col-span-3'>
            <div>
              <p>your Workspace </p>
              <Card cardTitle={"Test"} />
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Home;
