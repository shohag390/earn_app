import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  photo: { type: String },
  role: {
    type: String,
  },
});

export default mongoose.model("Admin", AdminSchema);
