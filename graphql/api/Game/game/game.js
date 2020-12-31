import GameBoard from "../../../model/GameBoard";

export default {
 Query: {
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
 },
};
