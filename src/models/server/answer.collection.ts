import { Permission } from "node-appwrite";
import { databases } from "./config";
import { answerCollection, db } from "../name";

export default async function createAnswerCollection() {
  await databases.createCollection(db, answerCollection, answerCollection, [
    Permission.create("users"),
    Permission.read("any"),
    Permission.read("users"),
    Permission.update("users"),
    Permission.delete("users"),
  ]);
  console.log("Answer collection created");

  // creating Attributes
  await Promise.all([
    databases.createStringAttribute(
      db,
      answerCollection,
      "content",
      10000,
      true
    ),
    databases.createStringAttribute(db, answerCollection, "authorId", 50, true),
    databases.createStringAttribute(
      db,
      answerCollection,
      "questionId",
      50,
      true
    ),
  ]);

  console.log("Attributes created");
}
