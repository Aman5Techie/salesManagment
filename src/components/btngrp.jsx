import { AddIcon } from "@chakra-ui/icons";
import { Button, Box } from "@chakra-ui/react";
import { useState } from "react";
import NewSales from "./newsales";
import EditSales from "./editSales";


const Btngrp = ({ setactive }) => {
  const [selected, setselected] = useState();
  const activeOrder = () => {
    setactive(true);
    console.log("ac");
  };

  const completedOrder = () => {
    setactive(false);
    console.log("co");
  };


  return (
    <div className="md:flex md:justify-between px-5 py-5">
      <div className="md:flex space-x-16">
        <Button
          onClick={activeOrder}
          colorScheme="teal"
          size="lg"
          flexDirection="column"
          _focus={{
            outline: "none",
            boxShadow: "0 0 0 4px rgba(66, 153, 225, 0.6)",
          }}
          transition="box-shadow 0.2s ease-in-out"
        >
          <Box as="span" display="block">
            Active Sales
          </Box>
          <Box as="span" display="block">
            Order
          </Box>
        </Button>

        <Button
          onClick={completedOrder}
          colorScheme="teal"
          size="lg"
          flexDirection="column"
          _focus={{
            outline: "none",
            boxShadow: "0 0 0 4px rgba(66, 153, 225, 0.6)",
          }}
          transition="box-shadow 0.2s ease-in-out"
        >
          <Box as="span" display="block">
            Completed
          </Box>
          <Box as="span" display="block">
            Order
          </Box>
        </Button>
      </div>
      <NewSales/>
    </div>
  );
};

export default Btngrp;
