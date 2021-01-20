import PhotoBoard from "../../../model/PhotoBoard";
import { CURRENT_TIME } from "../../../../utils/commonUtils";

export default {
 Query: {
  getAllPhotolength: async (_, args) => {
   const { searchValue } = args;
   try {
    const result = await PhotoBoard.find({
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

  getAllPhoto: async (_, args) => {
   const { searchValue, limit, currentPage } = args;
   try {
    const result = await PhotoBoard.find({}, {})
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

  getPhotoTotalPage: async (_, args) => {
   const { searchValue, limit } = args;

   try {
    const result = await PhotoBoard.find({
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
  getPhoto: async (_, args) => {
   const { id } = args;
   try {
    const result = await PhotoBoard.findOne({ _id: id });

    return result;
   } catch (e) {
    console.log(e);
    return {};
   }
  },
 },

 Mutation: {
  createPhoto: async (_, args) => {
   const { title, author, description, imgPath, type } = args;
   const current = await CURRENT_TIME();
   try {
    const result = await PhotoBoard.create({
     type: "Photo",
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

  deletePhoto: async (_, args) => {
   const { id } = args;
   const current = await CURRENT_TIME();
   try {
    const result = await PhotoBoard.deleteOne(
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
  updatePhoto: async (_, args) => {
   const { id, title, description, imgPath } = args;
   try {
    const result = await PhotoBoard.updateOne(
     { _id: id },
     { $set: { title, description, imgPath } }
    );

    return true;
   } catch (e) {
    console.log(e);
    return false;
   }
  },
  photoRecomUp: async (_, args) => {
   const { id, recommendation, recomUser } = args;
   try {
    const result = await PhotoBoard.updateOne(
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
