const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema(
  {
    messages: {
      type: Array,
      default: [],
    },
    _id: mongoose.Types.ObjectId,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Conversation", conversationSchema);
