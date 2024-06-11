import { useEffect, useState } from "react";
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
  CloseButton,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import products from "../database/product";
import customer from "../database/user";
import { useDispatch } from "react-redux";
import { addactiveOrder } from "../app/slices/activeorderslice";

// Dummy product data

const NewSales = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [invoiceDate, setInvoiceDate] = useState("");
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [value, setValue] = useState("");
  const [showList, setShowList] = useState(false);
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();
  const isDarkMode = colorMode === "dark";
  const handleProductChange = (event) => {
    const productId = parseInt(event.target.value, 10);
    if (!selectedProducts.some((id) => id === productId)) {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    let price = 0;
    data.items = selectedProducts.map((productId) => {
      const product = products.find((p) => p.id === productId);
      const currprice = product.sku[0].selling_price;
      const qunatity = parseInt(formData.get(`quantity-${productId}`), 10) || 0
      price += currprice*qunatity
      return {
        sku_id: product.sku[0].id,
        price: currprice,
        quantity:qunatity,
      };
    });

    const orderData = {
      customer_id: data.customer,
      invoice_date: data.invoice_date,
      invoice_no: data.invoice_no,
      items: data.items,
      paid: false,
      lastModified : "Modification not done",
      price : price
    };

    dispatch(addactiveOrder(orderData))
    console.log(orderData);
    setSelectedProducts([]);
    onClose();
    toast({
      title: "Sales order created.",
      description: "The sales order has been created successfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const removeProduct = (id) => {
    const after_remove = selectedProducts.filter((e) => e != id);
    setSelectedProducts(after_remove);
  };

  const isQuantityValid = (productId, quantity) => {
    const product = products.find((p) => p.id === productId);
    const availableQuantity = product.sku[0].quantity_in_inventory;
    return quantity <= availableQuantity;
  };

  const closeForm = () => {
    setSelectedProducts([]);
    setValue("")
    setInvoiceDate("");
    onClose();
  };

 

  // Filter customers based on the search term
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

  return (
    <>
      <Button leftIcon={<AddIcon />} colorScheme="orange" onClick={onOpen}>
        Add Sale Order
      </Button>

      <Modal isOpen={isOpen} onClose={closeForm}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new Sales Order</ModalHeader>
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
                    onChange={(e) => setInvoiceDate(e.target.value)}
                    variant="filled"
                    bg={isDarkMode ? "gray.700" : "white"}
                    color={isDarkMode ? "white" : "gray.800"}
                    borderRadius="md"
                    borderWidth="1px"
                    borderColor={isDarkMode ? "blue.400" : "gray.300"}
                  />
                </InputGroup>
              </FormControl>
              <FormControl mt={4} isRequired>
                <FormLabel htmlFor="products">Select Products</FormLabel>
                <Select
                  id="products"
                  name="products"
                  placeholder="Select products"
                  onChange={handleProductChange}
                >
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              {selectedProducts.length > 0 && (
                <Accordion mt={4} allowMultiple>
                  {selectedProducts.map((productId) => {
                    const product = products.find((p) => p.id === productId);
                    return (
                      <AccordionItem key={productId}>
                        <AccordionButton>
                          <CloseButton
                            mr={0}
                            onClick={removeProduct.bind(null, productId)}
                          />
                          <Box flex="1" textAlign="left">
                            {product.name}
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                          {product.sku.map((sku) => (
                            <Box key={sku.id} mb={4}>
                              <FormControl>
                                <FormLabel htmlFor={`quantity-${productId}`}>
                                  Quantity (Available ={" "}
                                  {sku.quantity_in_inventory}) (Price ={" "}
                                  {sku.selling_price})
                                </FormLabel>
                                <Input
                                  id={`quantity-${productId}`}
                                  name={`quantity-${productId}`}
                                  placeholder="Enter quantity"
                                  type="number"
                                />
                              </FormControl>
                            </Box>
                          ))}
                        </AccordionPanel>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              )}
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={closeForm}>
              Close
            </Button>
            <Button
              type="submit"
              form="sales-order-form"
              colorScheme="orange"
              onClick={(e) => {
                // Validate input quantities before submitting the form
                const invalidProducts = selectedProducts.filter((productId) => {
                  const quantity = parseInt(
                    document.getElementById(`quantity-${productId}`).value,
                    10
                  );
                  return !isQuantityValid(productId, quantity);
                });

                if (invalidProducts.length > 0) {
                  e.preventDefault();
                  toast({
                    title: "Invalid quantities",
                    description:
                      "Some quantities are higher than available stock.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                  });
                }
              }}
            >
              Add Sale Order
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewSales;
