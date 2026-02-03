const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema(
  {
    topic: { type: String, required: true, unique: true, index: true },
    device: { type: String, index: true },
    label: { type: String, index: true },
  },
  { timestamps: true },
);

TopicSchema.index({ topic: 1, createdAt: -1 });

const TopicsModel = mongoose.model("Topic", TopicSchema);
module.exports = TopicsModel;
