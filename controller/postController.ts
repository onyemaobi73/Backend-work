import express, { Request, Response } from "express";
import { HTTP, mainError } from "../error/mainError";
import userModel from "../model/userModel";
import cloudinary from "../config/cloudinary";
import postModel from "../model/postModel";
import mongoose from "mongoose";
import likeModel from "../model/likeModel";

export const createPost = async (req: any, res: Response) => {
  try {
    const { userID } = req.params;
    const { title, content } = req.body;

    const user: any = await userModel.findById(userID);

    if (user) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        req.file?.path
      );

      const post = await postModel.create({
        title,
        content,
        image: secure_url,
        imageID: public_id,
        userID,
        user,
      });

      user.post?.push(new mongoose.Types.ObjectId(post._id));
      user.save();

      return res.status(HTTP.CREATED).json({
        message: "post created",
        data: post,
      });
    } else {
      return res.status(HTTP.BAD_REQUEST).json({
        message: "Error",
      });
    }
  } catch (error) {
    new mainError({
      name: "Create Error",
      message: "This error came as a result of the you creating this user",
      status: HTTP.BAD_REQUEST,
      success: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error",
    });
  }
};

export const getAllPost = async (req: any, res: Response) => {
  try {
    const post = await postModel.find();
    return res.status(HTTP.OK).json({
      message: "post gotten",
      data: post,
    });
  } catch (error) {
    new mainError({
      name: "Create Error",
      message: "This error came as a result of the you creating this user",
      status: HTTP.BAD_REQUEST,
      success: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error",
    });
  }
};

export const getUserPost = async (req: any, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await userModel.findById(userId).populate({
      path: "post",
      options: {
        sort: { createdAt: -1 },
      },
    });

    return res.status(HTTP.OK).json({
      message: "post gotten",
      data: user,
    });
  } catch (error) {
    new mainError({
      name: "Create Error",
      message: "This error came as a result of the you creating this user",
      status: HTTP.BAD_REQUEST,
      success: false,
    });

    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error",
    });
  }
};

export const votePost = async (req: any, res: Response) => {
  try {
    const { userID, postID } = req.params;

    const post: any = await postModel.findById(postID);
    const user: any = await userModel.findById(userID);

    const like: any = await likeModel.create({ userID, like: true });

    postID.vote.push(new mongoose.Types.ObjectId(like._id));
    post.save();

    return res.status(HTTP.OK).json({
      message: "User voted this post",
      data: like,
    });
  } catch (error) {
    new mainError({
      name: "Create Error",
      message: "This error came as a result of the you creating this user",
      status: HTTP.BAD_REQUEST,
      success: false,
    });
    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error",
    });
  }
};
export const unvotePost = async (req: any, res: Response) => {
  try {
    const { userID, postID, likeID } = req.params;

    const post: any = await postModel.findById(postID);
    const like: any = await likeModel.findById(likeID);

    post.vote.pull(new mongoose.Types.ObjectId(likeID));
    post.save();

    return res.status(HTTP.OK).json({
      message: "User unvoted this post",
      data: post,
    });
  } catch (error) {
    new mainError({
      name: "Create Error",
      message: "This error came as a result of the you creating this user",
      status: HTTP.BAD_REQUEST,
      success: false,
    });
    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error",
    });
  }
};
export const viewVotedPost = async (req: any, res: Response) => {
  try {
    const { userID, postID, voteID } = req.params;

    const post: any = await postModel.findById(postID).populate({
      path: "vote",
      options: {
        sort: { createdAt: -1 },
      },
    });

    return res.status(HTTP.OK).json({
      message: "User has viewed this post",
      data: post,
    });
  } catch (error) {
    new mainError({
      name: "Create Error",
      message: "This error came as a result of the you creating this user",
      status: HTTP.BAD_REQUEST,
      success: false,
    });
    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error",
    });
  }
};
