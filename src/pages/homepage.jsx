import { useState } from "react";
import Btngrp from "../components/btngrp";
import { useCheckToken } from "../hooks/Isauthenticates";
import Activeorders from "../components/activeorders";
import Completedorder from "../components/completedorder";

const Homepage = () => {
  useCheckToken(false);
  const [active, setactive] = useState(true);

  return (
    <div>
      <div className="">
        <Btngrp setactive={setactive} />
      </div>
      <div>{active ? <Activeorders /> : <Completedorder />}</div>
    </div>
  );
};

export default Homepage;
