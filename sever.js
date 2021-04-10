require("dotenv").config();
const express = require("express");
const server = express();
const verifyToken = require("./middleware/auth");
// import jwt token
const jwt = require("jsonwebtoken");
// read data send client
const bodyParser = require("body-parser");

//setttings

server.use(bodyParser.urlencoded({ extended: false }));

// parse serverlication/json
server.use(bodyParser.json());

// create fake database connection
const users = [
  { id: 1, username: "HungDQ19" },
  { id: 2, username: "HungDQ18" },
  { id: 3, username: "HungDQ17" },
];
// Các bài post của từng thằng sau khi đã đăng nhập
const posts = [
  { userID: 1, post: "hom nay troi dep qua" },
  { userID: 2, post: "Di choi voi ban gai" },
  { userID: 1, post: "Toi muon di choi voi ban gai" },
  { userID: 2, post: "hom nay troi dep qua" },
  { userID: 2, post: "Di choi voi anh khong em" },
  { userID: 2, post: "Nha em o dau the" },
];

server.get("/posts", verifyToken, (req, res) => {
  const post = posts.filter((elm) => elm.userID === req.userID);
  res.status(200).json({ post });
});

server.post("/login", (req, res) => {
  // Thông tin người dùng gửi lên server
  const { username } = req.body;
  //check xem username co nam trong database hay Khong
  const userSearch = users.find((elm) => elm.username === username);
  //nếu không có thì trả về lỗi tài khoản chưa được đăng kí
  if (!userSearch)
    return res
      .status(404)
      .json({ success: false, message: "Tai  Khoan cua ban chua dang ki" });
  // Nếu người này có trên database có nghĩa là đã đăng kí thì sẽ trả lại cho người dùng 1 token
  const accessToken = jwt.sign(userSearch, process.env.ACCESS_TOKEN_SECRET);
  res.status(200).json({
    success: true,
    message: "ban dang nhap thanh cong",
    token: accessToken,
  });
});

const POST = process.env.POST || 5000;
server.listen(POST, () => {
  console.log(`SEVER START`);
});
