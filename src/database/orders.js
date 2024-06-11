const orderData = [
  {
    id: 1,
    customer_id: 11903,
    items: [
      {
        sku_id: 222,
        price: 20,
        quantity: 8,
      },
    ],
    paid: false,
    invoice_no: "Invoice-1002",
    invoice_date: "2024-02-26",
    price: 160,
    lastModified: "Modification not done",
  },
  {
    id: 2,
    customer_id: 11904,
    items: [
      {
        sku_id: 223,
        price: 18,
        quantity: 6,
      },
    ],
    paid: true,
    invoice_no: "Invoice-1003",
    // invoice_date: "06-07-2024",
    invoice_date: "2024-05-06",
    price: 108,
    lastModified: "Modification not done",
  },
  {
    id: 3,
    customer_id: 11905,
    items: [
      {
        sku_id: 224,
        price: 25,
        quantity: 4,
      },
    ],
    paid: false,
    invoice_no: "Invoice-1004",
    invoice_date: "2024-06-28",
    price: 100,
    lastModified: "Modification not done",
  },
  // {
  //   customer_id: 11906,
  //   items: [
  //     {
  //       sku_id: 225,
  //       price: 30,
  //       quantity: 7,
  //     },
  //   ],
  //   paid: true,
  //   invoice_no: "Invoice-1005",
  //   invoice_date: "6/9/2024",
  //   price: 210,
  //   lastModified: "Modification not done",
  // },
  // {
  //   customer_id: 11907,
  //   items: [
  //     {
  //       sku_id: 226,
  //       price: 22,
  //       quantity: 3,
  //     },
  //   ],
  //   paid: false,
  //   invoice_no: "Invoice-1006",
  //   invoice_date: "6/10/2024",
  //   price: 66,
  //   lastModified: "Modification not done",
  // },
];

// console.log(orderData);
export default orderData;
