const mongoose = require("mongoose");
const { DBCollections } = require("../app_constants");
const mongoosePaginate = require("mongoose-paginate-v2");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      index: true,
      required: true,
      ref: DBCollections.Users,
    },
    sectionId: {
      type: mongoose.SchemaTypes.ObjectId,
      index: true,
      ref: DBCollections.Sections,
      required: true,
    },
    postDate: {
      type: Date,
      immutable: true, // can't edit later
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

postSchema.plugin(mongoosePaginate);

module.exports = mongoose.model(DBCollections.Posts, postSchema);
