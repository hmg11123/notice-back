import mongoose from "mongoose";

const Schema = mongoose.Schema;

const NoticeBoard = new Schema(
 {
  type: {
   type: String,
   required: true,
  },
  title: {
   type: String,
   required: true,
  },
  description: {
   type: String,
   required: true,
  },
  //   author: [
  //    {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "author",
  //    },
  //   ],
  createdAt: {
   type: String,
   required: true,
  },
  isDelete: {
   type: Boolean,
   required: true,
   default: false,
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

export default mongoose.model(`NoticeBoard`, NoticeBoard, `NoticeBoard`);
