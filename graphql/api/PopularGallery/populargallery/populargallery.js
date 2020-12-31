import PopularGallery from "../../../model/PopularGallery";

export default {
 Query: {
  getAllPopularGallery: async (_, args) => {
   const { searchValue, limit, currentPage } = args;
   try {
    const result = await PopularGallery.find({}, {})
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

  getPopularGalleryTotalPage: async (_, args) => {
   const { searchValue, limit } = args;

   try {
    const result = await PopularGallery.find({
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
 },
};
