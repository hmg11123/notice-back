import SoprtsBoard from "../../../model/SoprtsBoard";
import { CURRENT_TIME } from "../../../../utils/commonUtils";

export default {
 Query: {
  getAllSoprtslength: async (_, args) => {
   const { searchValue } = args;
   try {
    const result = await SoprtsBoard.find({
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

  getAllSoprts: async (_, args) => {
   const { searchValue, limit, currentPage } = args;
   try {
    const result = await SoprtsBoard.find({}, {})
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

  getSoprtsTotalPage: async (_, args) => {
   const { searchValue, limit } = args;

   try {
    const result = await SoprtsBoard.find({
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
  getSoprts: async (_, args) => {
   const { id } = args;
   try {
    const result = await SoprtsBoard.findOne({ _id: id });

    return result;
   } catch (e) {
    console.log(e);
    return {};
   }
  },
 },

 Mutation: {
  createSoprts: async (_, args) => {
   const { title, author, description, imgPath, detailAuthor } = args;
   const current = await CURRENT_TIME();
   try {
    const result = await SoprtsBoard.create({
     type: "Soprts",
     title,
     author,
     description,
     createdAt: current,
     imgPath,
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

  deleteSoprts: async (_, args) => {
   const { id } = args;
   const current = await CURRENT_TIME();
   try {
    const result = await SoprtsBoard.deleteOne(
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
  updateSoprts: async (_, args) => {
   const { id, title, description, imgPath } = args;
   try {
    const result = await SoprtsBoard.updateOne(
     { _id: id },
     { $set: { title, description, imgPath } }
    );

    return true;
   } catch (e) {
    console.log(e);
    return false;
   }
  },
  soprtsRecomUp: async (_, args) => {
   const { id, recommendation, recomUser } = args;
   try {
    const result = await SoprtsBoard.updateOne(
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
