const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    sender: mongoose.Types.ObjectId,
    reciever: mongoose.Types.ObjectId,
  },
  {
    timestamps: true,
  }
);

const conversationSchema = mongoose.Schema(
  {
    messages: [messageSchema],
    _id: mongoose.Types.ObjectId,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Conversation", conversationSchema);
