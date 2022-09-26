const conversationModel = require("../models/conversationModel");
const userModel = require("../models/userModel");
const User = require("../models/userModel");

const getChats = async (req, res) => {
  const allUsers = await User.find().select("-password");
  res.json({ chats: allUsers });
};

const getchatuser = async (req, res) => {
  const { id } = req.params;
  try {
    const chatUser = await User.findById(id)
      .select("-password")
      .select("-chats");
    res.json({ user: chatUser });
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

const sendMessage = async (req, res) => {
  const senderId = req.user._id.toString();
  const { recieverId } = req.params;
  const { message } = req.body;

  const conversationId = [recieverId, senderId].sort()[0];

  try {
    if (message) {
      const messageObj = {
        message,
        senderId,
        recieverId,
        time: Date.now(),
      };

      conversationModel.updateOne(
        { _id: conversationId },
        { $push: { messages: messageObj } },
        {
          new: true,
          upsert: true,
        },
        (err, docs) => {
          if (err) {
            console.log(err);
            res.status(400).json({ error: "can't send message !" });
          }
        }
      );

      // const user = await userModel.findById(senderId);
      const user = await userModel.updateOne(
        { _id: "633135bafdddd54c3e9c7dc9", "chats.id": conversationId },
        { $set: { "chats.$.name": "Tahir Shareef 2" } },
        { upsert: true }
      );

      return;
      console.log(res, "Response");
      return;
      await userModel.updateOne(
        { _id: user._id },
        {
          $set: {
            chats: { newMessage: "My Message" },
          },
        },
        {
          new: true,
          upsert: true,
        },
        (err, docs) => {
          if (err) {
            console.log(err);
            res.status(400).json({ error: "can't send chat !" });
          }
        }
      );

      res.json(messageObj);
    } else {
      res.status(400).json({ error: "message must be provided !" });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e });
  }
};

module.exports = { getChats, getchatuser, sendMessage };
