import mongoose from "mongoose";
import cloudinary from "../config/cloudinary";
import bcrypt from "bcrypt";
import userModel from "../model/userModel";
import express, { Request, Response } from "express";
import { HTTP, mainError } from "../error/mainError";

export const registerUser = async (
  req: any,
  res: Response
): Promise<Response> => {
  try {
    const { password, email, name } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file?.path
    );

    const user = await userModel.create({
      name,
      password: hashed,
      email,
      avatar: secure_url,
      avatarID: public_id,
    });
    return res.status(HTTP.CREATED).json({
      message: "Created",
      data: user,
    });
  } catch (error) {
    new mainError({
      name: "create Error",
      message: "This error came as a result of the user creating this user",
      status: HTTP.BAD_REQUEST,
      success: false,
    });
    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error",
    });
  }
};
export const signInUser = async (
  req: any,
  res: Response
): Promise<Response> => {
  try {
    const { password, email } = req.body
    // const errors = validationResult(req)

    const user = await userModel.findOne({email})

    // if (errors) {
    //     return res.status(HTTP.BAD_REQUEST).json(errors)
    // } 
    
    if (user) {
        const checked = await bcrypt.compare(password, user.password!)
        if (checked) {
            return res.status(HTTP.CREATED).json({
                message:"welcome back",
                data:user._id
            })
    } else {
        new mainError({
            name : "password Error",
            message:`This password is not correct`,
            status:HTTP.BAD_REQUEST,
            success:false
        })

        return res.status(HTTP.BAD_REQUEST).json({
            message:"inCorrect password"
        })
    }
}else {
        new mainError({
            name:'SignIn Error',
            message:`This user cannot be found`,
            status:HTTP.BAD_REQUEST,
            success:false
        })

        return res.status(HTTP.BAD_REQUEST).json({
            message:"Error"
        })
    }
  } catch (error) {
    new mainError({
      name: "create Error",
      message: "This error came as a result of the user creating this user",
      status: HTTP.BAD_REQUEST,
      success: false,
    });
    return res.status(HTTP.BAD_REQUEST).json({
      message: "Error",
    });
  }
};

export const getUsers = async (
    req: any,
    res: Response
  ): Promise<Response> => {
    try {
  
      const user = await userModel.find()

      return res.status(HTTP.OK).json({
        message: "users gotten",
        data: user,
      });
      
    } catch (error) {
      new mainError({
        name: "create Error",
        message: "This error came as a result of the user creating this user",
        status: HTTP.BAD_REQUEST,
        success: false,
      });
      return res.status(HTTP.BAD_REQUEST).json({
        message: "Error",
      });
    }
  };

export const getUser = async (
    req: any,
    res: Response
  ): Promise<Response> => {
    try {

        const {id} = req.params
      const user = await userModel.findById(id)

      return res.status(HTTP.OK).json({
        message: "user gotten",
        data: user,
      });

    } catch (error) {
      new mainError({
        name: "create Error",
        message: "This error came as a result of the user creating this user",
        status: HTTP.BAD_REQUEST,
        success: false,
      });
      return res.status(HTTP.BAD_REQUEST).json({
        message: "Error",
      });
    }
  };
