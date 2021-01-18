import MovieBoard from "../../../model/MovieBoard";
import { CURRENT_TIME } from "../../../../utils/commonUtils";

export default {
 Query: {
  getAllMovielength: async (_, args) => {
   const { searchValue } = args;
   try {
    const result = await MovieBoard.find({
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
  getAllMovie: async (_, args) => {
   const { searchValue, limit, currentPage } = args;
   try {
    const result = await MovieBoard.find({}, {})
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

  getMovieTotalPage: async (_, args) => {
   const { searchValue, limit } = args;

   try {
    const result = await MovieBoard.find({
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
  getMovieBoard: async (_, args) => {
   const { id } = args;
   try {
    const result = await MovieBoard.findOne({ _id: id });

    return result;
   } catch (e) {
    console.log(e);
    return {};
   }
  },
 },

 Mutation: {
  createMovieBoard: async (_, args) => {
   const { title, author, description, imgPath, type } = args;
   const current = await CURRENT_TIME();
   try {
    const result = await MovieBoard.create({
     type: "Movie",
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

  deleteMovieBaord: async (_, args) => {
   const { id } = args;
   const current = await CURRENT_TIME();
   try {
    const result = await MovieBoard.deleteOne(
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
  updateMovieBaord: async (_, args) => {
   const { id } = args;
   try {
    const result = await MovieBoard.updateOne(
     { _id: id },
     { $set: { title, description, imgPath } }
    );

    return true;
   } catch (e) {
    console.log(e);
    return false;
   }
  },
  recommendationUp: async (_, args) => {
   const { id, recommendation, recomUser } = args;
   try {
    const result = await MovieBoard.updateOne(
     { _id: id },
     { $set: { recommendation }, $push: { recomUser } }
    );

    return true;
   } catch (e) {
    console.log(e);
    return false;
   }
  },
 },
};
