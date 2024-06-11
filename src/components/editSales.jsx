import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Select,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  useToast,
  InputGroup,
  useColorMode,
  IconButton,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import products from "../database/product";
import { FiMoreHorizontal } from "react-icons/fi";
import { getTime } from "../functions/getTime";
import customer from "../database/user";
import { useDispatch } from "react-redux";
import {
  changeActiveOrder,
  removeActiveOrder,
} from "../app/slices/activeorderslice";
import { addCompleteOrder } from "../app/slices/completedorderslice";
// Dummy product data

const EditSales = ({ object }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [invoiceNumber, setInvoiceNumber] = useState(object.invoice_no);
  const toast = useToast();
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();
  const [paymentStatus, setPaymentStatus] = useState(
    !object.paid ? "Not Paid" : "Paid"
  );

  const isDarkMode = colorMode === "dark";

  const [searchTerm, setSearchTerm] = useState("");
  const [value, setValue] = useState(object.customer_id);
  const [showList, setShowList] = useState(false);

  const [invoiceDate, setInvoiceDate] = useState(object.invoice_date);

  const handleFormSubmit = (event) => {
    if (object.paid) {
      toast({
        title: "View Only Form",
        description: "You cannot edit this form.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    event.preventDefault();

    const dateTime = new Date(Date.now());
    const time = getTime(dateTime.getHours(), dateTime.getMinutes());
    const day = dateTime.getDate();
    const month = dateTime.getMonth() + 1;
    const year = dateTime.getFullYear();

    if (paymentStatus === "Paid") {
      const tempObj = { ...object };
      tempObj.paid = true;
      tempObj.lastModified = `${day}/${month}/${year} ${time}`;

      value == object.customer_id ? null : (tempObj.customer_id = value),
        invoiceNumber === object.invoice_no
          ? null
          : (tempObj.invoice_no = invoiceNumber),
        invoiceDate == object.invoice_date
          ? null
          : (tempObj.invoice_date = invoiceDate);

      dispatch(addCompleteOrder(tempObj));
      dispatch(removeActiveOrder(object.id));

      onClose();
      toast({
        title: "Sales order updated.",
        description: "The sales order has been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    dispatch(
      changeActiveOrder({
        id: object.id,
        data: {
          customer_id: value == object.customer_id ? null : value,
          invoice_no:
            invoiceNumber === object.invoice_no ? null : invoiceNumber,
          invoice_date: invoiceDate == object.invoice_date ? null : invoiceDate,
          lastModified: `${day}/${month}/${year} ${time}`,
        },
      })
    );
    onClose();
    toast({
      title: "Sales order updated.",
      description: "The sales order has been updated successfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const closeForm = () => {
    setInvoiceDate(object.invoice_date);
    setValue(value);
    setInvoiceNumber(invoiceNumber);
    onClose();
  };

  const filteredCustomers = customer.filter((cus) => {
    return cus.customer.toString().includes(searchTerm);
  });

  const handleInputClick = () => {
    setShowList(true);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setValue(e.target.value);
    setShowList(true);
  };

  const handleCustomerClick = (customer) => {
    setValue(customer.customer);
    setShowList(false);
  };

  // Function to check if the input quantity is valid

  return (
    <>
      <IconButton
        variant="ghost"
        colorScheme="green"
        aria-label="More options"
        onClick={onOpen}
        icon={<FiMoreHorizontal />}
      />

      <Modal isOpen={isOpen} onClose={closeForm}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Sales Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form id="sales-order-form" onSubmit={handleFormSubmit}>
              <FormControl isRequired>
                <FormControl mt={4} isRequired>
                  <FormLabel htmlFor="customer">Select Customer</FormLabel>
                  <Input
                    id="customer"
                    name="customer"
                    placeholder="Select Customer"
                    value={value}
                    onClick={handleInputClick}
                    onChange={handleInputChange}
                    disabled={object.paid}
                  />

                  {showList && (
                    <Box
                      border="1px"
                      borderColor="gray.200"
                      p={2}
                      mt={2}
                      maxHeight="150px"
                      overflowY="auto"
                    >
                      {filteredCustomers.map((customer) => (
                        <div
                          key={customer.customer}
                          onClick={() => handleCustomerClick(customer)}
                        >
                          {customer.customer}
                        </div>
                      ))}
                    </Box>
                  )}
                </FormControl>
              </FormControl>
              <FormControl mt={4} isRequired>
                <FormLabel htmlFor="invoice_no">Invoice Number</FormLabel>
                <Input
                  id="invoice_no"
                  name="invoice_no"
                  placeholder="Enter invoice number"
                  value={invoiceNumber}
                  disabled={object.paid}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                />
              </FormControl>
              <FormControl mt={4} isRequired>
                <FormLabel htmlFor="invoice_date">Invoice Date</FormLabel>
                <InputGroup>
                  <Input
                    type="date"
                    id="invoice_date"
                    name="invoice_date"
                    value={invoiceDate}
                    // value="2016-08-19"
                    // value="19-08-2006"
                    disabled={object.paid}
                    onChange={(e) => {
                      setInvoiceDate(e.target.value);
                    }}
                    variant="filled"
                    bg={isDarkMode ? "gray.700" : "white"}
                    color={isDarkMode ? "white" : "gray.800"}
                    borderRadius="md"
                    borderWidth="1px"
                    borderColor={isDarkMode ? "blue.400" : "gray.300"}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="payment_status">Payment Status</FormLabel>
                <Select
                  id="payment_status"
                  name="payment_status"
                  disabled={object.paid}
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                >
                  <option value="Not Paid">Not Paid</option>
                  <option value="Paid">Paid</option>
                </Select>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={closeForm}>
              Close
            </Button>
            <Button
              type={object.paid ? null : "submit"}
              form="sales-order-form"
              colorScheme="orange"
              disabled={object.paid}
              className={`${
                !object.paid
                  ? "hover:cursor-pointer"
                  : "hover:cursor-not-allowed"
              }`}
            >
              Edit Sale Order
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditSales;
