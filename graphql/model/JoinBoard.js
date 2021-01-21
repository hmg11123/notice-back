import mongoose from "mongoose";

const Schema = mongoose.Schema;

const JoinBoard = new Schema(
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
  createdAt: {
   type: String,
   required: true,
  },
  isDelete: {
   type: Boolean,
   required: true,
  },
  deletedAt: {
   type: String,
   required: true,
  },
  author: {
   type: String,
   required: true,
  },
  detailAuthor: {
   type: String,
   required: true,
  },
  hit: {
   type: Number,
   required: true,
  },
  recommendation: {
   type: Number,
   required: true,
  },
  recomUser: [
   {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
   },
  ],
 },
 {
  versionKey: false,
 }
);

export default mongoose.model(`JoinBoard`, JoinBoard, `JoinBoard`);
