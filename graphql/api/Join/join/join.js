import JoinBoard from "../../../model/JoinBoard";
import { CURRENT_TIME } from "../../../../utils/commonUtils";

export default {
 Query: {
  getAllJoinlength: async (_, args) => {
   const { searchValue } = args;
   try {
    const result = await JoinBoard.find({
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

  getAllJoin: async (_, args) => {
   const { searchValue, limit, currentPage } = args;
   try {
    const result = await JoinBoard.find({}, {})
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

  getJoinTotalPage: async (_, args) => {
   const { searchValue, limit } = args;

   try {
    const result = await JoinBoard.find({
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
  getJoin: async (_, args) => {
   const { id } = args;
   try {
    const result = await JoinBoard.findOne({ _id: id });

    return result;
   } catch (e) {
    console.log(e);
    return {};
   }
  },
 },

 Mutation: {
  createJoin: async (_, args) => {
   const { title, author, description, detailAuthor } = args;
   const current = await CURRENT_TIME();
   try {
    const result = await JoinBoard.create({
     type: "Join",
     title,
     author,
     description,
     createdAt: current,
     hit: 0,
     recommendation: 0,
     isDelete: false,
     deletedAt: `none`,
     detailAuthor,
    });

    return true;
   } catch (e) {
    console.log(e);
    return false;
   }
  },

  deleteJoin: async (_, args) => {
   const { id } = args;
   const current = await CURRENT_TIME();
   try {
    const result = await JoinBoard.deleteOne(
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
  updateJoin: async (_, args) => {
   const { id, title, description } = args;
   try {
    const result = await JoinBoard.updateOne(
     { _id: id },
     { $set: { title, description } }
    );

    return true;
   } catch (e) {
    console.log(e);
    return false;
   }
  },
  joinRecomUp: async (_, args) => {
   const { id, recommendation, recomUser } = args;
   try {
    const result = await JoinBoard.updateOne(
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
