import bcrypt from "bcrypt";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    restaurantName: "Admins Pizza",
    menu: [
      {
        name: "pizza",
        image: "/images/pizza.jpg",
        description: "Thick crust pepperoni pizza, fresh from the oven. Mouthwatering cheese.",
        category: "Entree",
        price: 20,
        calories: 800,
      },
      {
        name: "Burger with Fries",
        image: "/images/burgerfries.jpg",
        description: "6oz Burger Steak with a side of Fries. ",
        category: "Entree",
        price: 10,
        calories: 1200,
      },
      {
        name: "Avocado Salas",
        image: "/images/salad.jpg",
        description: "Comes freshly made, with avocado slices. ",
        category: "Appetizer",
        price: 8,
        calories: 200,
      },
      {
        name: "Fruits and Crackers",
        image: "/images/fruits.jpg",
        description: "Fruit bar, includes, strawberries, oranges, apples and crackers.",
        category: "Sides",
        price: 5,
        calories: 400,
      },
      {
        name: "Blueberry and Strawberry Toast ",
        image: "/images/toastfruits.jpg",
        description: "French Toast with Blueberries and Strawberries. With a side of syrup.",
        category: "Breakfast",
        price: 20,
        calories: 300,
      },
    ],
  },
  {
    name: "John Snow",
    email: "johnsnow@example.com",
    password: bcrypt.hashSync("123456", 10),
    restaurantName: "In-n-out",
    menu: [
      {
        name: "Burger with Fries",
        image: "/images/burgerfries.jpg",
        description: "6oz Burger Steak with a side of Fries. ",
        category: "Entree",
        price: 10,
        calories: 1200,
      },
    ],
  },
  {
    name: "Snow White",
    email: "snowwhite@example.com",
    password: bcrypt.hashSync("123456", 10),
    restaurantName: "Snows Salads",
    menu: [
      {
        name: "Avocado Salas",
        image: "/images/salad.jpg",
        description: "Comes freshly made, with avocado slices. ",
        category: "Appetizer",
        price: 8,
        calories: 200,
      },
    ],
  },
];

export default users;
