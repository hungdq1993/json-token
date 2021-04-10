// Thằng này làm việc gác cửa, nghĩa là khi muốn thực hiện req nào muốn thông qua thằng này
// Tác dụng của thằng này là kiểm tra xem cái token  được gửi về cho client có phải là hàng chuẩn hay không
const jwt = require('jsonwebtoken')
// tạo ra 1 hàm để xác nhận xem token có phải hàng xinj hay không :D
 const verifyToken = (req, res, next) =>{
      
     const authHeader = req.header('Authorization');
     console.log(authHeader);
     const token = authHeader && authHeader.split(' ')[1];
      if(!token) return res.status(403).json({success: false, message:"Ban vui long dang nhap lai"})
      try {
          const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
          req.userID = decode.id;
          next();
      } catch (error) {
          res.status(404).json("ERROR ROI BAN OI")
      }
    
 }
 module.exports = verifyToken;