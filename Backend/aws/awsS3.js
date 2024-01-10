const {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
} = require('@aws-sdk/client-s3');
const { Console } = require('console');
const { get } = require('http');

const buckName = 'buckettarot';
let bucketListStore = [];
let client = null;

/**
 * s3Api 초기 설정을 위한 함수
 */
async function initializeS3() {
  if (client) throw new Error('이미 s3Api가 초기화 되어있습니다.');
  client = new S3Client();
  const commend = new ListObjectsV2Command({ Bucket: buckName, MaxKeys: 78 });
  const response = await client.send(commend);

  for await (const object of response.Contents) {
    bucketListStore.push(object.Key);
  }

  if (bucketListStore.length === 0)
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
 * bucketList를 S3에서 가져오는 함수
 * @returns {string} bucketList - 버킷 리스트
 */
async function getbucketList() {
  comfirmS3Client();
  let bucketList = [];
  const commend = new ListObjectsV2Command({ Bucket: buckName, MaxKeys: 78 });
  const response = await client.send(commend);

  for await (const object of response.Contents) {
    bucketList.push(object.Key.split('/')[1]);
  }
  return await bucketList;
}

/**
 * 카드의 번호를 가지고 인덱스를 찾는 함수
 * @param {list} bucketList - 버킷안 카드의 리스트
 * @param {int} number - 찾을 카드의 번호
 * @returns 가장 먼저 찾은 인덱스 번호
 */
async function findIndex(bucketList, number) {
  return await bucketList.findIndex(
    (element) => Number(element.split(',')[0]) === Number(number)
  );
}

/**
 * 버킷안에 있는 카드의 원래 파일명을 가져오는 함수 ex) 폴더명/파일명
 * 폴더명이 포함된 파일명을 가져오는 함수
 * @param {int} index - 찾을 카드의 인덱스
 * @returns 버킷안 파일명
 */
function getObjectName(index) {
  return bucketListStore[index];
}

/**
 * 버킷안에 있는 카드의 원래 파일명을 가져오는 함수 ex) 폴더명/파일명, 파일명
 * 폴더명이 제외된 파일명을 가져오는 함수
 * @param {int} index - 찾을 카드의 인덱스
 * @param {list} bucketList - 버킷안 카드의 리스트
 * @returns 버킷안 파일명
 */
function getObjectNames(bucketList, index) {
  return bucketList[index];
}

/**
 * 버킷안에 있는 정보를 파일이름을 통해 가져와 파일의 주소를 반환하는 함수
 * @param {string} fileName - 파일이름
 * @returns 파일의 주소
 */
async function getS3ImageURL(fileName) {
  comfirmS3Client();
  let stringBuffer = '';
  const commend = new GetObjectCommand({ Bucket: buckName, Key: fileName });
  const response = await client.send(commend);
  stringBuffer += await String(response.Body.socket.servername);
  stringBuffer += await String(response.Body.req.path).split('?')[0];
  return stringBuffer;
}

/**
 * 파일명을 통해 데이터를 가져오는 함수
 * @param {string} fileName - 파일명만 있는 문자열
 * @returns - 데이터를 담은 객체
 */
function getDataObject(fileName) {
  let data = [];
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
  getbucketList,
  findIndex,
  getObjectName,
  getObjectNames,
  getS3ImageURL,
  getDataObject,
};
