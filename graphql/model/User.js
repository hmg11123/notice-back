import mongoose from "mongoose";

const Schema = mongoose.Schema;

const User = new Schema(
 {
  email: {
   type: String,
   required: true,
  },
  type: {
   type: String,
   required: true,
  },
  nickName: {
   type: String,
   required: true,
  },
  myBoard: [
   {
    type: mongoose.Schema.Types.ObjectId,
    ref: "NoticeBoard",
   },
  ],
  isDelete: {
   type: Boolean,
   required: true,
  },
  deletedAt: {
   type: String,
   required: true,
  },
 },
 {
  versionKey: false,
 }
);

export default mongoose.model(`User`, User, `User`);
