import NoticeBoard from "../../../model/NoticeBoard";
import { CURRENT_TIME } from "../../../../utils/commonUtils";

export default {
 Query: {
  getAllNoticelength: async (_, args) => {
   const { searchValue } = args;
   try {
    const result = await NoticeBoard.find({
     $or: [
      { title: { $regex: `.*${searchValue}.*` } },
      { description: { $regex: `.*${searchValue}.*` } },
     ],
    });

    const cnt = result.length;

    return parseInt(cnt);
   } catch (e) {
    console.log(e);
    return [];
   }
  },

  getAllNotice: async (_, args) => {
   const { searchValue, limit, currentPage } = args;
   try {
    const result = await NoticeBoard.find({}, {})
     .sort({
      createdAt: -1,
     })
     .limit(limit)
     .skip(currentPage * limit);

    return result;
   } catch (e) {
    console.log(e);
    return [];
   }
  },

  getNoticeTotalPage: async (_, args) => {
   const { searchValue, limit } = args;

   try {
    const result = await NoticeBoard.find({
     title: { $regex: `.*${searchValue}.*` },
    }).sort({
     createdAt: -1,
    });

    const cnt = result.length;

    const realTotalPage = cnt % limit > 0 ? cnt / limit + 1 : cnt / limit;

    return parseInt(realTotalPage);
   } catch (e) {
    console.log(e);
    return 0;
   }
  },
  getNotice: async (_, args) => {
   const { id } = args;
   try {
    const result = await NoticeBoard.findOne({ _id: id });

    return result;
   } catch (e) {
    console.log(e);
    return {};
   }
  },
 },

 Mutation: {
  createNotice: async (_, args) => {
   const { title, author, description, imgPath, type } = args;
   const current = await CURRENT_TIME();
   try {
    const result = await NoticeBoard.create({
     type: "Notice",
     title,
     author,
     description,
     createdAt: current,
     imgPath,
     hit: 0,
     recommendation: 0,
     isDelete: false,
     deletedAt: `none`,
    });

    return true;
   } catch (e) {
    console.log(e);
    return false;
   }
  },

  deleteNotice: async (_, args) => {
   const { id } = args;
   const current = await CURRENT_TIME();
   try {
    const result = await NoticeBoard.deleteOne(
     { _id: id },
     {
      $set: { isDelete: true, deletedAt: current },
     }
    );
    return true;
   } catch (e) {
    console.log(e);
    return false;
   }
  },
  updateNotice: async (_, args) => {
   const { id, title, description, imgPath } = args;
   try {
    const result = await NoticeBoard.updateOne(
     { _id: id },
     { $set: { title, description, imgPath } }
    );

    return true;
   } catch (e) {
    console.log(e);
    return false;
   }
  },
  noticeRecomUp: async (_, args) => {
   const { id, recommendation, recomUser } = args;
   try {
    const result = await NoticeBoard.updateOne(
     { _id: id },
     { $set: { recommendation }, $addToSet: { recomUser } }
    );

    return true;
   } catch (e) {
    console.log(e);
    return false;
   }
  },
 },
};
