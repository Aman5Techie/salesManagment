import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
  Text,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { FiMoreHorizontal } from "react-icons/fi";
import { useSelector } from "react-redux";
import userdata from "../database/user"
import EditSales from "./editSales";


const Activeorders = () => {
  
  const { colorMode } = useColorMode();

  const activeorders = useSelector((state)=>state.activereducer.activeorders)

  function userData(id){
    const safety = parseInt(id)
    const user = userdata.find((e)=>e.customer === safety)
    return [user.id,user.customer_profile.name]
  }

  return (
    <Box p={4} color={colorMode === "light" ? "black" : "white"}>
      <Box className="overflow-x-auto">
        <Table variant="simple" className="table-auto w-full text-center">
          <Thead bg={colorMode === "light" ? "green.300" : "green.700"}>
            <Tr>
              <Th className="border border-green-600">ID</Th>
              <Th className="border border-green-600">Customer Name</Th>
              <Th className="border border-green-600">Price (₹)</Th>
              <Th className="border border-green-600">Last Modified</Th>
              <Th className="border border-green-600">Edit/View</Th>
            </Tr>
          </Thead>
          <Tbody>
            {activeorders.map((item) => {
              const [id,name] = userData(item.customer_id)
              return (
                <Tr
                key={item.invoice_no}
                className={
                  colorMode === "light"
                    ? "bg-gray-100 border-black "
                    : "bg-gray-800 border-white "
                }
              >
                <Td className="align-middle">{id}</Td>
                <Td className="align-middle">
                  <div className="flex items-center space-x-2 ">
                    <Avatar size="sm" name={name} />
                    <Text>{name}</Text>
                    <Text
                      className={
                        colorMode === "light"
                          ? "text-gray-500"
                          : "text-gray-400"
                      }
                    >
                      @{item.customer_id}
                    </Text>
                  </div>
                </Td>
                <Td className="align-middle">₹ {item.price}</Td>
                <Td className="align-middle">{item.lastModified}</Td>
                <Td className="align-middle">
                  
                <EditSales object={item}/>
                </Td>
              </Tr>
              )
            })}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default Activeorders;
