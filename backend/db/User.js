/**
 * {
 *   username: 'timqian',
 *   email: 'timqian@t9t.io',
 *   createdAt: '',
 * }
 */

const dynamodb = require('./dynamodb');

async function createTable() {
  console.log('going to create "repo-analytics-user" table');
  await dynamodb.createTable({
    TableName: 'repo-analytics-user',
    KeySchema: [
      { AttributeName: 'username', KeyType: 'HASH' },
    ],
    AttributeDefinitions: [
      { AttributeName: 'username', AttributeType: 'S' },
    ],
    BillingMode: 'PAY_PER_REQUEST',
    // ProvisionedThroughput: {
    //   ReadCapacityUnits: 1,
    //   WriteCapacityUnits: 1,
    // },
  }).promise();
  console.log('successfully created table "repo-analytics-user"');
}

async function deleteTable() {
  await dynamodb.deleteTable({ TableName: 'repo-analytics-user' }).promise();
}

async function get({ username }) {
  const { Item } = await dynamodb.getItem({
    TableName: 'repo-analytics-user',
    Key: {
      username: { S: username },
    },
  }).promise();
  return Item;
}

async function put({
  username, email, accessToken, displayName, photo,
}) {
  await dynamodb.putItem({
    TableName: 'repo-analytics-user',
    Item: {
      username: { S: username },
      email: { S: email },
      accessToken: { S: accessToken },
      displayName: { S: displayName },
      photo: { S: photo },
      createdAt: { S: new Date().toISOString() },
    },
  }).promise();
}

module.exports = {
  createTable,
  deleteTable,
  get,
  put,
};


// // test
// (async () => {
//   // await createTable();
//   // await new Promise((r) => setTimeout(r, 1000));
//   await put({
//     username: 'timqn',
//     email: 'timqian@t9t.io',
//     displayName: 'timqian', photo:'abc',
//   });
//   const item = await get({
//     username: 'timqian',
//   });
//   console.log(item);
// })();
