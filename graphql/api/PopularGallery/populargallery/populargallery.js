import Gallery from "../../../model/Gallery";
import { CURRENT_TIME } from "../../../../utils/commonUtils";

export default {
 Query: {
  getAllPopularGallerylength: async (_, args) => {
   const { searchValue } = args;
   try {
    const result = await Gallery.find({
     recommendation: { $gt: 49 },
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

  getAllPopularGallery: async (_, args) => {
   const { searchValue, limit, currentPage } = args;
   try {
    const result = await Gallery.find({}, {})
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

  getAllRecomPopGall: async (_, args) => {
   const { searchValue, limit, currentPage } = args;
   try {
    const result = await Gallery.find({ recommendation: { $gt: 49 } })
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
    const result = await Gallery.find({
     recommendation: { $gt: 49 },
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
