import Notice from "../../../model/NoticeBoard";

export default {
 Query: {
  getAllNotice: async (_, args) => {
   const { searchValue, limit, currentPage } = args;
   try {
    const result = await Notice.find({}, {})
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
