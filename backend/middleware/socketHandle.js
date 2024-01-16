const socketConnection = require('../middleware/socketConnection');
let io = null;

const socketSendHandler = (req, res, next) => {
    const userId = req.user.name
    
    // socket.io 연결
    io = req.app.get('io'); // app 객체에 저장된 io 객체를 가져옴
    const socketId = socketConnection.getSocketId(userId); // 사용자 아이디를 통해 소켓 아이디를 가져옴
    console.log('socketId : ' + socketId);

    if(socketId == null || socketId == 'undefined') {
        res.status(500).json({ message: '소켓 연결 오류', error: '소켓 연결이 되어있지 않습니다' });
        return;
    }

    req.socketId = socketId;

    // socket.io를 연결
    io.to(socketId).emit('start', '데이터 전송 시작');
    console.log('유저(' + userId + '): 연결 성공');

    return next();
};

const socketFinishHandler = (req, res, next) => {
    const socketId = res.locals.store.socketId;
    console.log("req.socketId : " + socketId);
    // socket.io를 연결
    io.to(socketId).emit('finish', '데이터 전송 완료');

    return next();
};

module.exports = { socketSendHandler, socketFinishHandler };