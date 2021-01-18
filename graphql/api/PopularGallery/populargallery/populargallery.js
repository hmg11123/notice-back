import Gallery from "../../../model/Gallery";
import { CURRENT_TIME } from "../../../../utils/commonUtils";

export default {
 Query: {
  //   getAllGallerylength: async (_, args) => {
  //    const { searchValue } = args;
  //    try {
  //     const result = await Gallery.find({
  //      $or: [
  //       { title: { $regex: `.*${searchValue}.*` } },
  //       { description: { $regex: `.*${searchValue}.*` } },
  //      ],
  //     });

  //     const cnt = result.length;

  //     return parseInt(cnt);
  //    } catch (e) {
  //     console.log(e);
  //     return [];
  //    }
  //   },

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

  //   getGalleryTotalPage: async (_, args) => {
  //    const { searchValue, limit } = args;

  //    try {
  //     const result = await Gallery.find({
  //      title: { $regex: `.*${searchValue}.*` },
  //     }).sort({
  //      createdAt: -1,
  //     });

  //     const cnt = result.length;

  //     const realTotalPage = cnt % limit > 0 ? cnt / limit + 1 : cnt / limit;

  //     return parseInt(realTotalPage);
  //    } catch (e) {
  //     console.log(e);
  //     return 0;
  //    }
  //   },
  //   getGallery: async (_, args) => {
  //    const { id } = args;
  //    try {
  //     const result = await Gallery.findOne({ _id: id });

  //     return result;
  //    } catch (e) {
  //     console.log(e);
  //     return {};
  //    }
  //   },
 },

 //  Mutation: {
 //   createGallery: async (_, args) => {
 //    const { title, author, description, imgPath } = args;
 //    const current = await CURRENT_TIME();
 //    try {
 //     const result = await Gallery.create({
 //      title,
 //      author,
 //      description,
 //      createdAt: current,
 //      imgPath,
 //      hit: 0,
 //      isDelete: false,
 //      deletedAt: `none`,
 //     });

 //     return true;
 //    } catch (e) {
 //     console.log(e);
 //     return false;
 //    }
 //   },

 //   deleteGallery: async (_, args) => {
 //    const { id } = args;
 //    try {
 //     const result = await Gallery.deleteOne({ _id: id });
 //     return true;
 //    } catch (e) {
 //     console.log(e);
 //     return false;
 //    }
 //   },
 //   updateGallery: async (_, args) => {
 //    const { id } = args;
 //    try {
 //     const result = await Gallery.updateOne(
 //      { _id: id },
 //      { $set: { title, description, imgPath } }
 //     );

 //     return true;
 //    } catch (e) {
 //     console.log(e);
 //     return false;
 //    }
 //   },
 //  },
};
