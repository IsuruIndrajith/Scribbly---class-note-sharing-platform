import express from "express";
import FileModel from "../models/FileModel.js";

export async function searchFiles(req, res) {
  try {
    const searchKey = req.params.key;

    let searchData;
    if (!searchKey || searchKey.trim() === '' || searchKey === 'all') {
      // If no search key or 'all', return all files
      searchData = await FileModel.find({});
    } else {
      // Search by filename
      searchData = await FileModel.find({
        filename: { $regex: searchKey, $options: "i" } // case-insensitive search
      });
    }

    res.status(200).json(searchData);
  } catch (error) {
    res.status(500).json({ message: "Error searching files", error });
  }
}
