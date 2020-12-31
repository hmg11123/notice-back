import Hobby from "../../../model/HobbyBoard";

export default {
 Query: {
  getAllHobby: async (_, args) => {
   const { searchValue, limit, currentPage } = args;
   try {
    const result = await Hobby.find({}, {})
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
