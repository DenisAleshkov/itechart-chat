const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

async function getCollection(collectionName) {
  const firestore = admin.firestore();
  const items = [];
  const itemsRef = await firestore.collection(collectionName).get();
  itemsRef.forEach((item) => {
    items.push({ ...item.data(), id: item.id });
  });

  return items;
}

exports.getAllUsers = functions.https.onRequest(async (request, response) => {
  const users = await getCollection("users");
  response.send(users);
});

exports.getListUserForMessage = functions.https.onRequest(
  async (request, response) => {
    const { id } = request.body;
    const users = await getCollection("users");
    const usersForMessage = users.filter((user) => {
      return user.id !== id;
    });
    response.send(usersForMessage);
  }
);

exports.getUserById = functions.https.onRequest(async (request, response) => {
  const { id } = request.body;
  const users = await getCollection("users");
  const user = users.filter((user) => user.id === id);
  response.send(user);
});

exports.sendMessage = functions.https.onRequest((request, response) => {
  const db = admin.firestore();
  const { myId, userId, message } = request.body;
  db.collection("messages")
    .doc("to")
    .collection(userId)
    .add(message)
    .catch((error) => response.send(error));

  db.collection("messages")
    .doc("from")
    .collection(myId)
    .add(message)
    .then((res) => response.send({ id: res.id, message: "SEND SUCCESS" }))
    .catch((error) => response.send(error));
});
