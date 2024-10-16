import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

let users = [
  {
    id: 111,
    title: "Dusko Ninkov",
    img: "https://scontent.fbeg4-1.fna.fbcdn.net/v/t39.30808-6/345632815_542005318133877_860477210625416769_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGVrCGR78OAcGF6-0vORXr477tlOWe7QrPvu2U5Z7tCsxOktaiViYnmmXKtekE-XVE&_nc_ohc=Sz07AwltxHsQ7kNvgGNuPHL&_nc_ht=scontent.fbeg4-1.fna&cb_e2o_trans=q&oh=00_AYAMU7cgMCCWNhENqS7FaRBcLgUjebrZ6hejqLCEFgYSyw&oe=666D071E",
    firstName: "Dusko",
    lastName: "Ninkov",
    email: "dusko@gmail.com",
    createdAt: "03.04.1989",
    verified: true,
    info: {
      username: "ledu89",
      fullname: "Dusko Ninkov",
      phone: "123 456 789",
      status: "verified",
    },
    chart: {
      dataKeys: [
        { name: "visits", color: "#82ca9d" },
        { name: "clicks", color: "#8884d8" },
      ],
      data: [
        { name: "Sun", visits: 4000, clicks: 2400 },
        { name: "Mon", visits: 3000, clicks: 1398 },
        { name: "Tue", visits: 2000, clicks: 3800 },
        { name: "Wed", visits: 2780, clicks: 3908 },
        { name: "Thu", visits: 1890, clicks: 4800 },
        { name: "Fri", visits: 2390, clicks: 3800 },
        { name: "Sat", visits: 3490, clicks: 4300 },
      ],
    },
    activities: [
      {
        text: "Dusko Ninkov purchased Playstation 5 Digital Edition",
        time: "3 day ago",
      },
      {
        text: "Dusko Ninkov added 3 items into their wishlist",
        time: "1 week ago",
      },
      {
        text: "Dusko Ninkov purchased Sony Bravia KD-32w800",
        time: "2 weeks ago",
      },
      { text: "Dusko Ninkov reviewed a product", time: "1 month ago" },
      {
        text: "Dusko Ninkov added 1 items into their wishlist",
        time: "1 month ago",
      },
      { text: "Dusko Ninkov reviewed a product", time: "2 months ago" },
    ],
  },
  {
    id: 112,
    title: "Lena Johansson",
    img: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    firstName: "Lena",
    lastName: "Johansson",
    email: "lena.j@gmail.com",
    createdAt: "22.06.1990",
    verified: false,
    info: {
      username: "lenjo90",
      fullname: "Lena Johansson",
      phone: "987 654 321",
      status: "unverified",
    },
    chart: {
      dataKeys: [
        { name: "visits", color: "#82ca9d" },
        { name: "clicks", color: "#8884d8" },
      ],
      data: [
        { name: "Sun", visits: 4100, clicks: 2450 },
        { name: "Mon", visits: 3050, clicks: 1400 },
        { name: "Tue", visits: 2050, clicks: 3850 },
        { name: "Wed", visits: 2800, clicks: 3950 },
        { name: "Thu", visits: 1900, clicks: 4850 },
        { name: "Fri", visits: 2400, clicks: 3850 },
        { name: "Sat", visits: 3500, clicks: 4350 },
      ],
    },
    activities: [
      { text: "Lena Johansson purchased a new iPhone", time: "2 days ago" },
      {
        text: "Lena Johansson added 2 items into their wishlist",
        time: "5 days ago",
      },
      { text: "Lena Johansson purchased a MacBook Pro", time: "1 week ago" },
      { text: "Lena Johansson reviewed a product", time: "3 weeks ago" },
      {
        text: "Lena Johansson added 4 items into their wishlist",
        time: "1 month ago",
      },
      { text: "Lena Johansson reviewed a product", time: "2 months ago" },
    ],
  },
  {
    id: 113,
    title: "Ivan Petrova",
    img: "https://images.pexels.com/photos/1587004/pexels-photo-1587004.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    firstName: "Ivan",
    lastName: "Petrova",
    email: "ivan.p@gmail.com",
    createdAt: "15.11.1985",
    verified: true,
    info: {
      username: "ivan85",
      fullname: "Ivan Petrova",
      phone: "111 222 333",
      status: "verified",
    },
    chart: {
      dataKeys: [
        { name: "visits", color: "#82ca9d" },
        { name: "clicks", color: "#8884d8" },
      ],
      data: [
        { name: "Sun", visits: 4200, clicks: 2500 },
        { name: "Mon", visits: 3100, clicks: 1450 },
        { name: "Tue", visits: 2100, clicks: 3900 },
        { name: "Wed", visits: 2820, clicks: 4000 },
        { name: "Thu", visits: 1920, clicks: 4900 },
        { name: "Fri", visits: 2420, clicks: 3900 },
        { name: "Sat", visits: 3520, clicks: 4400 },
      ],
    },
    activities: [
      {
        text: "Ivan Petrova purchased a Samsung Galaxy S21",
        time: "1 day ago",
      },
      {
        text: "Ivan Petrova added 1 item into their wishlist",
        time: "4 days ago",
      },
      { text: "Ivan Petrova purchased a gaming laptop", time: "1 week ago" },
      { text: "Ivan Petrova reviewed a product", time: "2 weeks ago" },
      {
        text: "Ivan Petrova added 3 items into their wishlist",
        time: "3 weeks ago",
      },
      { text: "Ivan Petrova reviewed a product", time: "2 months ago" },
    ],
  },
  {
    id: 114,
    title: "Maria Rossi",
    img: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    firstName: "Maria",
    lastName: "Rossi",
    email: "maria.r@gmail.com",
    createdAt: "10.02.1992",
    verified: true,
    info: {
      username: "mari92",
      fullname: "Maria Rossi",
      phone: "333 444 555",
      status: "verified",
    },
    chart: {
      dataKeys: [
        { name: "visits", color: "#82ca9d" },
        { name: "clicks", color: "#8884d8" },
      ],
      data: [
        { name: "Sun", visits: 4300, clicks: 2550 },
        { name: "Mon", visits: 3150, clicks: 1500 },
        { name: "Tue", visits: 2150, clicks: 3950 },
        { name: "Wed", visits: 2840, clicks: 4050 },
        { name: "Thu", visits: 1940, clicks: 4950 },
        { name: "Fri", visits: 2440, clicks: 3950 },
        { name: "Sat", visits: 3540, clicks: 4450 },
      ],
    },
    activities: [
      { text: "Maria Rossi purchased a new camera", time: "1 day ago" },
      {
        text: "Maria Rossi added 5 items into their wishlist",
        time: "3 days ago",
      },
      { text: "Maria Rossi purchased a tablet", time: "1 week ago" },
      { text: "Maria Rossi reviewed a product", time: "2 weeks ago" },
      {
        text: "Maria Rossi added 2 items into their wishlist",
        time: "3 weeks ago",
      },
      { text: "Maria Rossi reviewed a product", time: "2 months ago" },
    ],
  },
  {
    id: 115,
    title: "Hans Müller",
    img: "https://images.pexels.com/photos/1239292/pexels-photo-1239292.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    firstName: "Hans",
    lastName: "Müller",
    email: "hans.m@gmail.com",
    createdAt: "05.05.1980",
    verified: false,
    info: {
      username: "hans80",
      fullname: "Hans Müller",
      phone: "666 777 888",
      status: "unverified",
    },
    chart: {
      dataKeys: [
        { name: "visits", color: "#82ca9d" },
        { name: "clicks", color: "#8884d8" },
      ],
      data: [
        { name: "Sun", visits: 4400, clicks: 2600 },
        { name: "Mon", visits: 3200, clicks: 1550 },
        { name: "Tue", visits: 2200, clicks: 4000 },
        { name: "Wed", visits: 2860, clicks: 4100 },
        { name: "Thu", visits: 1960, clicks: 5000 },
        { name: "Fri", visits: 2460, clicks: 4000 },
        { name: "Sat", visits: 3560, clicks: 4500 },
      ],
    },
    activities: [
      { text: "Hans Müller purchased a smartwatch", time: "2 days ago" },
      {
        text: "Hans Müller added 1 item into their wishlist",
        time: "4 days ago",
      },
      { text: "Hans Müller purchased a drone", time: "1 week ago" },
      { text: "Hans Müller reviewed a product", time: "2 weeks ago" },
      {
        text: "Hans Müller added 3 items into their wishlist",
        time: "3 weeks ago",
      },
      { text: "Hans Müller reviewed a product", time: "2 months ago" },
    ],
  },
  {
    id: 116,
    title: "Aya Nakamura",
    img: "https://images.pexels.com/photos/1356204/pexels-photo-1356204.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    firstName: "Aya",
    lastName: "Nakamura",
    email: "aya.n@gmail.com",
    createdAt: "14.12.1995",
    verified: true,
    info: {
      username: "ayan95",
      fullname: "Aya Nakamura",
      phone: "555 666 777",
      status: "verified",
    },
    chart: {
      dataKeys: [
        { name: "visits", color: "#82ca9d" },
        { name: "clicks", color: "#8884d8" },
      ],
      data: [
        { name: "Sun", visits: 4500, clicks: 2650 },
        { name: "Mon", visits: 3250, clicks: 1600 },
        { name: "Tue", visits: 2250, clicks: 4050 },
        { name: "Wed", visits: 2880, clicks: 4150 },
        { name: "Thu", visits: 1980, clicks: 5050 },
        { name: "Fri", visits: 2480, clicks: 4050 },
        { name: "Sat", visits: 3580, clicks: 4550 },
      ],
    },
    activities: [
      { text: "Aya Nakamura purchased a new TV", time: "1 day ago" },
      {
        text: "Aya Nakamura added 4 items into their wishlist",
        time: "3 days ago",
      },
      { text: "Aya Nakamura purchased a gaming console", time: "1 week ago" },
      { text: "Aya Nakamura reviewed a product", time: "2 weeks ago" },
      {
        text: "Aya Nakamura added 2 items into their wishlist",
        time: "3 weeks ago",
      },
      { text: "Aya Nakamura reviewed a product", time: "2 months ago" },
    ],
  },
  {
    id: 117,
    title: "Carlos Fernandez",
    img: "https://images.pexels.com/photos/1572063/pexels-photo-1572063.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    firstName: "Carlos",
    lastName: "Fernandez",
    email: "carlos.f@gmail.com",
    createdAt: "09.07.1988",
    verified: true,
    info: {
      username: "carlo88",
      fullname: "Carlos Fernandez",
      phone: "999 888 777",
      status: "verified",
    },
    chart: {
      dataKeys: [
        { name: "visits", color: "#82ca9d" },
        { name: "clicks", color: "#8884d8" },
      ],
      data: [
        { name: "Sun", visits: 4600, clicks: 2700 },
        { name: "Mon", visits: 3300, clicks: 1650 },
        { name: "Tue", visits: 2300, clicks: 4100 },
        { name: "Wed", visits: 2900, clicks: 4200 },
        { name: "Thu", visits: 2000, clicks: 5100 },
        { name: "Fri", visits: 2500, clicks: 4100 },
        { name: "Sat", visits: 3600, clicks: 4600 },
      ],
    },
    activities: [
      { text: "Carlos Fernandez purchased a sound system", time: "2 days ago" },
      {
        text: "Carlos Fernandez added 3 items into their wishlist",
        time: "5 days ago",
      },
      { text: "Carlos Fernandez purchased a tablet", time: "1 week ago" },
      { text: "Carlos Fernandez reviewed a product", time: "3 weeks ago" },
      {
        text: "Carlos Fernandez added 5 items into their wishlist",
        time: "1 month ago",
      },
      { text: "Carlos Fernandez reviewed a product", time: "2 months ago" },
    ],
  },
  {
    id: 118,
    title: "Elena Garcia",
    img: "https://images.pexels.com/photos/1587005/pexels-photo-1587005.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    firstName: "Elena",
    lastName: "Garcia",
    email: "elena.g@gmail.com",
    createdAt: "20.08.1991",
    verified: true,
    info: {
      username: "elena91",
      fullname: "Elena Garcia",
      phone: "222 333 444",
      status: "verified",
    },
    chart: {
      dataKeys: [
        { name: "visits", color: "#82ca9d" },
        { name: "clicks", color: "#8884d8" },
      ],
      data: [
        { name: "Sun", visits: 4700, clicks: 2750 },
        { name: "Mon", visits: 3350, clicks: 1700 },
        { name: "Tue", visits: 2350, clicks: 4150 },
        { name: "Wed", visits: 2920, clicks: 4250 },
        { name: "Thu", visits: 2020, clicks: 5150 },
        { name: "Fri", visits: 2520, clicks: 4150 },
        { name: "Sat", visits: 3620, clicks: 4650 },
      ],
    },
    activities: [
      { text: "Elena Garcia purchased a smartwatch", time: "1 day ago" },
      {
        text: "Elena Garcia added 2 items into their wishlist",
        time: "3 days ago",
      },
      { text: "Elena Garcia purchased a new TV", time: "1 week ago" },
      { text: "Elena Garcia reviewed a product", time: "2 weeks ago" },
      {
        text: "Elena Garcia added 4 items into their wishlist",
        time: "3 weeks ago",
      },
      { text: "Elena Garcia reviewed a product", time: "2 months ago" },
    ],
  },
  {
    id: 119,
    title: "John Smith",
    img: "https://images.pexels.com/photos/1239302/pexels-photo-1239302.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    firstName: "John",
    lastName: "Smith",
    email: "john.s@gmail.com",
    createdAt: "12.01.1982",
    verified: false,
    info: {
      username: "john82",
      fullname: "John Smith",
      phone: "555 444 333",
      status: "unverified",
    },
    chart: {
      dataKeys: [
        { name: "visits", color: "#82ca9d" },
        { name: "clicks", color: "#8884d8" },
      ],
      data: [
        { name: "Sun", visits: 4800, clicks: 2800 },
        { name: "Mon", visits: 3400, clicks: 1750 },
        { name: "Tue", visits: 2400, clicks: 4200 },
        { name: "Wed", visits: 2940, clicks: 4300 },
        { name: "Thu", visits: 2040, clicks: 5200 },
        { name: "Fri", visits: 2540, clicks: 4200 },
        { name: "Sat", visits: 3640, clicks: 4700 },
      ],
    },
    activities: [
      { text: "John Smith purchased a gaming console", time: "2 days ago" },
      {
        text: "John Smith added 1 item into their wishlist",
        time: "4 days ago",
      },
      { text: "John Smith purchased a new camera", time: "1 week ago" },
      { text: "John Smith reviewed a product", time: "2 weeks ago" },
      {
        text: "John Smith added 3 items into their wishlist",
        time: "3 weeks ago",
      },
      { text: "John Smith reviewed a product", time: "2 months ago" },
    ],
  },
  {
    id: 120,
    title: "Natalia Ivanova",
    img: "https://images.pexels.com/photos/1356205/pexels-photo-1356205.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    firstName: "Natalia",
    lastName: "Ivanova",
    email: "natalia.i@gmail.com",
    createdAt: "03.03.1993",
    verified: true,
    info: {
      username: "nata93",
      fullname: "Natalia Ivanova",
      phone: "888 777 666",
      status: "verified",
    },
    chart: {
      dataKeys: [
        { name: "visits", color: "#82ca9d" },
        { name: "clicks", color: "#8884d8" },
      ],
      data: [
        { name: "Sun", visits: 4900, clicks: 2850 },
        { name: "Mon", visits: 3450, clicks: 1800 },
        { name: "Tue", visits: 2450, clicks: 4250 },
        { name: "Wed", visits: 2960, clicks: 4350 },
        { name: "Thu", visits: 2060, clicks: 5250 },
        { name: "Fri", visits: 2560, clicks: 4250 },
        { name: "Sat", visits: 3660, clicks: 4750 },
      ],
    },
    activities: [
      { text: "Natalia Ivanova purchased a new laptop", time: "1 day ago" },
      {
        text: "Natalia Ivanova added 4 items into their wishlist",
        time: "3 days ago",
      },
      { text: "Natalia Ivanova purchased a smartwatch", time: "1 week ago" },
      { text: "Natalia Ivanova reviewed a product", time: "2 weeks ago" },
      {
        text: "Natalia Ivanova added 2 items into their wishlist",
        time: "3 weeks ago",
      },
      { text: "Natalia Ivanova reviewed a product", time: "2 months ago" },
    ],
  },
  {
    id: 121,
    title: "Omar Hassan",
    img: "https://images.pexels.com/photos/1572064/pexels-photo-1572064.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    firstName: "Omar",
    lastName: "Hassan",
    email: "omar.h@gmail.com",
    createdAt: "18.09.1984",
    verified: false,
    info: {
      username: "omar84",
      fullname: "Omar Hassan",
      phone: "111 333 222",
      status: "unverified",
    },
    chart: {
      dataKeys: [
        { name: "visits", color: "#82ca9d" },
        { name: "clicks", color: "#8884d8" },
      ],
      data: [
        { name: "Sun", visits: 5000, clicks: 2900 },
        { name: "Mon", visits: 3500, clicks: 1850 },
        { name: "Tue", visits: 2500, clicks: 4300 },
        { name: "Wed", visits: 2980, clicks: 4400 },
        { name: "Thu", visits: 2080, clicks: 5300 },
        { name: "Fri", visits: 2580, clicks: 4300 },
        { name: "Sat", visits: 3680, clicks: 4800 },
      ],
    },
    activities: [
      { text: "Omar Hassan purchased a sound system", time: "2 days ago" },
      {
        text: "Omar Hassan added 1 item into their wishlist",
        time: "4 days ago",
      },
      { text: "Omar Hassan purchased a new TV", time: "1 week ago" },
      { text: "Omar Hassan reviewed a product", time: "2 weeks ago" },
      {
        text: "Omar Hassan added 3 items into their wishlist",
        time: "3 weeks ago",
      },
      { text: "Omar Hassan reviewed a product", time: "2 months ago" },
    ],
  },
];

// GET USERS
app.get("/api/users", (req, res) => {
  res.json(users);
});

// GET USER
app.get("/api/users/:id", (req, res) => {
  const user = users.find((user) => user.id === parseInt(req.params.id));
  res.json(user);
});

// ADD USER
app.post("/api/users", (req, res) => {
  users.unshift(req.body);
  res.json(users);
});

// DELETE USER
app.delete("/api/users/:id", (req, res) => {
  users = users.filter((user) => user.id !== parseInt(req.params.id));
  res.json("User deleted!");
});

// GET PRODUCTS
app.get("/api/products", (req, res) => {
  res.json(products);
});

// GET PRODUCT
app.get("/api/products/:id", (req, res) => {
  const product = products.find(
    (product) => product.id === parseInt(req.params.id)
  );
  res.json(product);
});

// ADD PRODUCT
app.post("/api/products", (req, res) => {
  products.unshift(req.body);
  res.json(products);
});

// DELETE PRODUCT
app.delete("/api/products/:id", (req, res) => {
  products = products.filter(
    (product) => product.id !== parseInt(req.params.id)
  );
  res.json("Product deleted!");
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});
