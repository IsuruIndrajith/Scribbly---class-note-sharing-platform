import express from "express";
import FileModel from "../models/FileModel.js";

export async function searchFiles(req, res) {
  try {
    const searchKey = req.params.key;

    const searchData = await FileModel.find({
      $or: [
        { filename: { $regex: searchKey, $options: "i" } }, // case-insensitive search
        
      ]
    });

    res.status(200).json(searchData);
  } catch (error) {
    res.status(500).json({ message: "Error searching files", error });
  }
}
