import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    telephone: { type: String },
    verified: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ["member", "trainer", "admin"],
      default: "member",
    },
    picture: { type: String },
    address: { type: String },
    trainerType: { type: String, enum: ["yoga", "pilates", "cardio"] },
    trainerDescription: { type: String },
    deleted: { type: Boolean, default: false }, 
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
