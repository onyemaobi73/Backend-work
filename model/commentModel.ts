import mongoose from "mongoose";

interface iComment {
  content?: string;

  positiveVote?: Array<string>;

  reply?: {}[];

  userID?: string;
  post?: {};
}

interface iCommentData extends iComment, mongoose.Document {}

const commentModel = new mongoose.Schema<iComment>(
  {
    content: {
      type: String,
    },
    userID: {
      type: String,
    },
    positiveVote: {
      type: Array<String>,
    },
    reply: [
      {
        type: mongoose.Types.ObjectId,
        ref: "replies",
      },
    ],
    post: {
      type: mongoose.Types.ObjectId,
      ref: "posts",
    },
  },
  { timestamps: true }
);

export default mongoose.model<iCommentData>("comments", commentModel);
