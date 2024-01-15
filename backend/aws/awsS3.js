const {
  S3Client,
  ListObjectsV2Command
} = require('@aws-sdk/client-s3');

const buckName = 'buckettarot';
const fileNameListStore = new Array(78);
const cardUrlList = new Array(78);
let client = null;

/**
 * s3Api 초기 설정을 위한 함수
 * s3Client를 초기화하고 버킷안에 있는 객체의 리스트를 가져온다.
 * 리스트를 가져오면서 파일명을 저장한다.
 * @returns {void}
 */
async function initializeS3() {
  if (client) throw new Error('이미 s3Api가 초기화 되어있습니다.');
  client = new S3Client();
  const commend = new ListObjectsV2Command({ Bucket: buckName, MaxKeys: 78 });
  const response = await client.send(commend);
  let urlBuffer = new String();
  let count = 0;

  for await (const object of response.Contents) {
    const fileName = object.Key; // 파일명 저장
    fileNameListStore[count] = fileName.split('/')[1]; // 폴더명 제외 파일명 저장
    urlBuffer = encodeURI(`https://${buckName}.s3.ap-northeast-2.amazonaws.com/${fileName}`); // url 인코딩
    cardUrlList[count] = urlBuffer; // url 저장
    count++;    
  }

  // 배열이 비어있으면 오류
  if (fileNameListStore.length === 0)
    throw new Error('bucketList를 가져오지 못했습니다.');

  console.log('s3Api 초기화 완료');
}

/**
 * s3Client를 반환하는 함수
 * @returns {S3Client} client - s3Client 객체
 */
function getS3Client() {
  if (!client) throw new Error('s3Api가 초기화 되지 않았습니다.');
  return client;
}

/**
 * s3Client가 초기화 되었는지 확인하는 함수
 */
function comfirmS3Client() {
  if (!client) throw new Error('s3Api가 초기화 되지 않았습니다.');
}

/**
 * 카드의 번호를 가지고 인덱스를 찾는 함수
 * @param {int} cardNum - 찾을 카드의 번호
 * @returns 가장 먼저 찾은 인덱스 번호
 */
function findIndex(cardNum) {
  return  fileNameListStore.findIndex(
    (element) => Number(element.split(',')[0]) === Number(cardNum)
  );
}

/**
 * 버킷안에 있는 카드의 원래 파일명을 가져오는 함수 ex) 폴더명/파일명
 * 폴더명이 포함된 파일명을 가져오는 함수
 * @param {int} index - 찾을 카드의 인덱스
 * @returns 버킷안 파일명
 */
function getOlnyFileName(index) {
  comfirmS3Client();
  return fileNameListStore[index];
}

/**
 * 버킷안에 있는 정보를 파일이름을 통해 가져와 파일의 주소를 반환하는 함수
 * @param {intger} index - 파일의 인덱스
 * @returns 파일의 주소
 */
function getS3ImageURL(index) {
  comfirmS3Client();
  return cardUrlList[index];
}

/**
 * 파일명을 통해 데이터를 가져오는 함수
 * @param {intger} index - 파일의 인덱스
 * @returns - 데이터를 담은 객체
 */
function getDataObject(index) {
  comfirmS3Client();
  const data = [];
  let fileName = getOlnyFileName(index);
  console.log('fileName : ' + fileName);

  for (let str of fileName.split(',')) {
    data.push(str);
  }
  
  return {
    number: data[0],
    name: data[1],
    english: data[2],
    mean: data[3].split('.')[0],
  };
}

module.exports = {
  initializeS3,
  getS3Client,
  findIndex,
  getOlnyFileName,
  getS3ImageURL,
  getDataObject,
};
