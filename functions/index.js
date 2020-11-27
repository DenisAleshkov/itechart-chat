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
    console.log('id', id)
    const users = await getCollection("users");
    const usersForMessage = users.filter((user) => user.id !== id);
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
    .doc(myId)
    .collection("message")
    .add(message)
    .then((res) => console.log("MESSSAGES SEND"))
    .catch((error) => response.send(error));

  db.collection("messages")
    .doc("from")
    .collection(myId)
    .doc(userId)
    .collection("message")
    .add(message)
    .then((res) => response.send({ id: res.id, message: "SEND SUCCESS" }))
    .catch((error) => response.send(error));
});

exports.getMessages = functions.https.onRequest((request, response) => {
  const db = admin.firestore();

  const { myId, userId, type } = request.body;
  const messages = [];

  db.collection("messages")
    .doc(type)
    .collection(userId)
    .doc(myId)
    .collection("message")
    .get()
    .then((result) => {
      result.forEach((element) => {
        messages.push({
          ...element.data(),
          date: element.data().date.seconds,
          type: type,
          id: element.id,
        });
      });
      return response.send({ messages: messages });
    })
    .catch((error) => response.send(error));
});
