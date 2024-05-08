import React, { useState } from "react";
import Navigation from "../Navigation";
import CategoryTile from "../components/CategoryTile/CategoryTile";

type Props = {
  list: {
    name: string;
    url: string;
  }[]
}

const Home = ({
  list
}: Props) => {

  return(
    <Navigation>
      <>
        <div className='container'>
          <div className="row spacing">
          {list.map((item) => 
            <CategoryTile name={item.name} imageUrl={item.url} />
          )}
          </div>
        </div>
      </>
    </Navigation>
  );
}
export default Home
