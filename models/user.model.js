const mongoose = require("mongoose");
const { Gender, DBCollections } = require("../app_constants");
const { encryptPassword } = require("../utils/common_utils");
const mongoosePaginate = require("mongoose-paginate-v2");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      validate: {
        validator: (value) => {
          var pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          return pattern.test(value);
        },
        message: ``,
      },
    },
    password: {
      type: String,
      required: true,
      // password must be more than 6 chars
      validate: {
        validator: (v) => v.length > 6,
      },
    },
    gender: {
      type: String,
      required: true,
      enums: [Gender.MALE, Gender.FEMALE],
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

userSchema.virtual("postscount", {
  ref: DBCollections.Posts,
  localField: "_id",
  foreignField: "userId",
  count: true,
});

// Set the 'virtuals' option to true
userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   // Hashing user password
//   this.password = await encryptPassword(this.password);
//   next();
// });

userSchema.plugin(mongoosePaginate);

userSchema.pre(/^find/, function (next) {
  this.populate("postscount");

  next();
});

module.exports = mongoose.model(DBCollections.Users, userSchema);
