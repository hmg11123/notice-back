import SoprtsBoard from "../../../model/SoprtsBoard";

export default {
 Query: {
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
 },
};
