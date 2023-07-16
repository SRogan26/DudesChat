const { model, Schema } = require("mongoose");

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
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    memberIds: [{
      type: Schema.Types.ObjectId,
      ref: "User",
    }],
    isDM: {
      type: Boolean,
      required: true
    },
  },
  {timestamps : true}
);

const Thread = model("Thread", threadSchema);

module.exports = Thread;
