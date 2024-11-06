import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
