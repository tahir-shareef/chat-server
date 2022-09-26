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
        sender: senderId,
        reciever: recieverId,
        time: Date.now(),
      };

      // first we find a user
      const recieverUser = await userModel.findById(recieverId);
      if (recieverUser) {
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

        // Upadting Main view Chats
        const objToset = {
          user: recieverId,
        };

        const chatObj = await userModel.findOneAndUpdate(
          { _id: senderId, "chats.user": recieverId },
          { $set: { "chats.$": objToset } }
        );

        console.log(chatObj);

        // if not in a chat array then push new one
        if (!chatObj) {
          await userModel.updateOne(
            { _id: senderId },
            { $push: { chats: objToset } }
          );
        }

        res.json(messageObj);
      } else {
        res.status(400).json({
          error: "The user you're trying to reach , doesn't exists !",
        });
      }
    } else {
      res.status(400).json({ error: "message must be provided !" });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e });
  }
};

const getConversation = async (req, res) => {
  const senderId = req.user._id.toString();
  const { recieverId } = req.params;

  const conversationId = [recieverId, senderId].sort()[0];
  try {
    const conversation = await conversationModel.findById({
      _id: conversationId,
    });
    res.json({
      conversation,
    });
  } catch (e) {
    res.status(400).json({
      error: "cannot get conversation !",
      serverError: e,
    });
  }
};
module.exports = { getChats, getchatuser, sendMessage, getConversation };
