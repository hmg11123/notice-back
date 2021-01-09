import PopularGallery from "../../../model/PopularGallery";
import { CURRENT_TIME } from "../../../../utils/commonUtils";

export default {
 Query: {
  getAllPopularGallerylength: async (_, args) => {
   const { searchValue } = args;
   try {
    const result = await PopularGallery.find({
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
  getPopularGallery: async (_, args) => {
   const { id } = args;
   try {
    const result = await PopularGallery.findOne({ _id: id });

    return result;
   } catch (e) {
    console.log(e);
    return {};
   }
  },
 },

 Mutation: {
  createPopularGallery: async (_, args) => {
   const { title, author, description, imgPath } = args;
   const current = await CURRENT_TIME();
   try {
    const result = await PopularGallery.create({
     title,
     author,
     description,
     createdAt: current,
     imgPath,
     hit: 0,
     isDelete: false,
     deletedAt: `none`,
    });

    return true;
   } catch (e) {
    console.log(e);
    return false;
   }
  },

  deletePopularGallery: async (_, args) => {
   const { id } = args;
   try {
    const result = await PopularGallery.deleteOne({ _id: id });
    return true;
   } catch (e) {
    console.log(e);
    return false;
   }
  },
  updatePopularGallery: async (_, args) => {
   const { id } = args;
   try {
    const result = await PopularGallery.updateOne(
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
