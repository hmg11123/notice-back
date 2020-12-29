import Notice from "../../../model/NoticeBoard";

export default {
 Query: {
  getAllNotice: async (_, args) => {
   try {
    const result = await Notice.find({}, {});

    return result;
   } catch (e) {
    console.log(e);
    return [];
   }
  },
 },
};
