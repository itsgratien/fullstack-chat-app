import mongoose from "mongoose";
import { environment } from "./Environment";

export const connect = async () => {
  try {
    await mongoose.connect(environment.databaseUri);
    return undefined;
  } catch (error) {
    throw error;
  }
};
