import GameBoard from "../../../model/GameBoard";
import { CURRENT_TIME } from "../../../../utils/commonUtils";

export default {
 Query: {
  getAllGamelength: async (_, args) => {
   const { searchValue } = args;
   try {
    const result = await GameBoard.find({
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
  getAllGame: async (_, args) => {
   const { searchValue, limit, currentPage } = args;
   try {
    const result = await GameBoard.find({}, {})
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

  getGameTotalPage: async (_, args) => {
   const { searchValue, limit } = args;

   try {
    const result = await GameBoard.find({
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
  getGameBoard: async (_, args) => {
   const { id } = args;
   try {
    const result = await GameBoard.findOne({ _id: id });

    return result;
   } catch (e) {
    console.log(e);
    return {};
   }
  },
 },

 Mutation: {
  createGameBoard: async (_, args) => {
   const { title, author, description, imgPath, type } = args;
   const current = await CURRENT_TIME();
   try {
    const result = await GameBoard.create({
     type: "Game",
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

  deleteGameBaord: async (_, args) => {
   const { id } = args;
   const current = await CURRENT_TIME();
   try {
    const result = await GameBoard.deleteOne(
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
  updateGameBaord: async (_, args) => {
   const { id } = args;
   try {
    const result = await GameBoard.updateOne(
     { _id: id },
     { $set: { title, description, imgPath } }
    );

    return true;
   } catch (e) {
    console.log(e);
    return false;
   }
  },
 },
};
