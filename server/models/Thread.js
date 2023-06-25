const { model, Schema } = require("mongoose");

const messageSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
      trim: true,
    },
    authorId: {
      type: String,
      required: true,
    },
  },
  {timestamps : true}
);

const threadSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: [6, "Thread title needs at least 6 characters"],
      maxLength: [45, "Thread title can have no more than 45 characters"],
      trim: true,
    },
    creatorId: {
      type: String,
      required: true,
    },
    memberIds: {
      type: [String],
      required: true,
    },
    messages: {
      type: [messageSchema],
    },
  },
  {timestamps : true}
);

const Thread = model("Thread", threadSchema);

module.exports = Thread;
