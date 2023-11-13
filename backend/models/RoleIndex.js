import mongoose from "mongoose";

const roleIndexSchema = new mongoose.Schema(
   {
      email: {
         type: String,
         required: true,
         unique: true,
      },
      messId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
         ref: "Mess",
      },
      role: {
         type: String,
         default: "student",
         immutable: true,
      },
   });

const RoleIndex = mongoose.model("RoleIndex", roleIndexSchema);
export default RoleIndex;

