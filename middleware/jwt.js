require('dotenv').config()
const jwt    = require('jsonwebtoken')
const secret = process.env.JWT_SECRET || 'jsonwebtoken-secret' // mình có dùng dotenv 

let isAuth = async (req, res, next) => {

    let code     = 401,
        response = {}
    // Lấy token được gửi lên từ phía client, thông thường tốt nhất là các bạn nên truyền token vào header
    const access =  req.headers["auth-token"] || req.headers["authorization"] || req.query.token || req.body.token;
    try {

        if (!access) {
            code = 403
            /// không tồn tại access token
            throw new Error('Unauthorized!!!')
        }
        // Thực hiện giải mã token xem có hợp lệ hay không?
        // let user = await jwt.decode( access, secret ) => hàm này chỉ decode thôi nghen không phải xác thực
        const user = await jwt.verify( access, secret ) // hàm này để xác thực

        // Nếu token hợp lệ, lưu thông tin giải mã được vào đối tượng req, dùng cho các xử lý ở phía sau.
        req.user = user
        
        // Cho phép req đi tiếp sang controller.
        next();
    } catch (error) {
        
        // Nếu giải mã gặp lỗi: Không đúng, hết hạn...etc:
        response.code             = code || 401
        response.message          = error.message || 'Unauthorized.'
        response.internal_message = error.message || 'Unauthorized!'

        return res.status(response.code).json(response)
    }
}

let isAuthSocket = async token => {

    try {

        return await jwt.verify( token, secret )
    } catch (error) {
        return false
    }
}

module.exports = {
    isAuth,
    isAuthSocket,
}