const mongoose = require("mongoose");
const { DBCollections } = require("../app_constants");
const mongoosePaginate = require("mongoose-paginate-v2");

const sectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unqiue: true,
      required: true,
    },
    description: {
      type: String,
      //required: [true, "please enter description"],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

sectionSchema.virtual("postscount", {
  ref: DBCollections.Posts,
  localField: "_id",
  foreignField: "sectionId",
  count: true,
});

sectionSchema.plugin(mongoosePaginate);

module.exports = mongoose.model(DBCollections.Sections, sectionSchema);
