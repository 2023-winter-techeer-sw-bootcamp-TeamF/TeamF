const jwt = require('jsonwebtoken');

const gptclientConnectionList = new Map();

const clientAuthor = (socket, next) => {
  const authHeader = socket.handshake.auth.token;

  const token = authHeader;

  // 토큰이 없으면 에러
  if (!token) {
    console.log('clientAuthor: 토큰이 필요합니다');
    return next(new Error('socketServer: 토큰이 필요합니다'));
  }

  try {
    const decoded = jwt.verify(token, 'your_secret_key_for_access_token');
    socket.user = decoded;
    console.log('socket.user : ', socket.user);
    return next(); // 성공적인 경우 여기서 next 호출
  } catch (error) {
    console.log('clientAuthor:', error);
    next(new Error('socketServer: 유효하지 않은 토큰입니다'));
  }
};

const newClientHandler = (socket, next) => {
  const socketId = socket.id;
  const userId = socket.user.name;

  gptclientConnectionList.set(userId, socketId);

  console.log('new client connected:', userId);
  console.log('socketId : ' + socketId);
  console.log('gptclientConnectionList : ' + gptclientConnectionList.get(userId));
  next();
};

const clientDisconnectHandler = (socket) => {
  const userId = socket.user.name;

  gptclientConnectionList.delete(userId);

  console.log('client disconnected:', userId);
};

const clientConnectedHandler = (socket) => {
  const userId = socket.user.name;
  for (const [key, value] of gptclientConnectionList) {
    console.log(`key: ${key}, value: ${value}`);
  }
  console.log('new client connected:', userId);
};

const getSocketId = (userId) => {
    console.log('getSocketId : ' + userId);
    console.log('getSocketId : ' + gptclientConnectionList.get(userId));
  return gptclientConnectionList.get(userId);
};

module.exports = {
  clientAuthor,
  newClientHandler,
  clientDisconnectHandler,
  clientConnectedHandler,
  getSocketId,
};
