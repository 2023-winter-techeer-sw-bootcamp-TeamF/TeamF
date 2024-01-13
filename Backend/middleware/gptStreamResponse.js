const gptclientConnectionList = new Map();
let userData = null;

const gptClientAuthor = (socket, next) => {
    const { token } = socket.handshake.query;

    // 토큰이 없으면 에러
    if (!token) {
        console.log('in gptClientAuthor: 토큰이 필요합니다')
        return next(new Error('gptStreamServer: 토큰이 필요합니다'))
    }

    try {
        const decoded = jwt.verify(token, 'your_secret_key_for_access_token')
        socket.user = decoded
        return next(); // 성공적인 경우 여기서 next 호출
    } catch (error) {
        console.log('in gptClientAuthor:', error)
        next(new Error('gptStreamServer: 유요하지 않은 토큰입니다'));
    }
}

const newGptClientHandler = async (socket, next) => {
    const socketId = socket.id
    //const userId = socket.decoded.userId
    const userId = socket.handshake.query.token;

    userData = userId;
    
    gptclientConnectionList.set(userId, socketId);

    console.log('new client connected:', userId);
    console.log('socketId : ' + socketId);
    console.log('gptclientConnectionList : ' + gptclientConnectionList.get(userId));

    next();
}

const gptClientDisconnectHandler = async (socket, next) => {
    const userId = userData;

    gptclientConnectionList.delete(userId)

    console.log('client disconnected:', userId);

    next();
}

const gptClientConnectedHandler = async (socket, next) => {
    const userId = userData;
    console.log('new client connected:', userId);
    next();
}

const getSocketId = (userId) => {
    return gptclientConnectionList.get(userId);
}


module.exports = {
    gptClientAuthor,
    newGptClientHandler,
    gptClientDisconnectHandler,
    gptClientConnectedHandler,
    getSocketId,
}