import PopularGallery from "../../../model/PopularGallery";

export default {
 Query: {
  getAllPopularGallery: async (_, args) => {
   try {
    const result = await PopularGallery.find({}, {});

    return result;
   } catch (e) {
    console.log(e);
    return [];
   }
  },
 },
};
