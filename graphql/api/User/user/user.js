import User from "../../../model/User";

export default {
 Mutation: {
  createUser: async (_, args) => {
   const { email, nickName, name, passWord, isDelete, deletedAt } = args;
   try {
    const result = await User.create({
     email,
     nickName,
     name,
     passWord,
     isDelete,
     deletedAt,
    });

    return true;
   } catch (e) {
    console.log(e);
    return false;
   }
  },
 },
};
