import mongoose from "mongoose";

const Schema = mongoose.Schema;

const NoticeFiles = new Schema(
 {
  originName: {
   type: String,
   required: true,
  },
  fileURL: {
   type: String,
   required: true,
  },
 },
 {
  versionKey: false,
 }
);

export default mongoose.model(`NoticeFiles`, NoticeFiles, `NoticeFiles`);
