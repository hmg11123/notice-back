import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MovieBoard = new Schema(
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
  imgPath: {
   type: String,
   required: true,
   default: "-",
  },
 },
 {
  versionKey: false,
 }
);

export default mongoose.model(`MovieBoard`, MovieBoard, `MovieBoard`);
