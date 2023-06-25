const { model, Schema } = require("mongoose");

const messageSchema = new Schema(
  {
    messageBody: {
      type: String,
      required: true,
      trim: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    threadId: {
      type: Schema.Types.ObjectId,
      ref: "Thread",
      required: true,
    },
  },
  {timestamps : true}
);
const Message = model("Message", messageSchema);

module.exports = Message;
