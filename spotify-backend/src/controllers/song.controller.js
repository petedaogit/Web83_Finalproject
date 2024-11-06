import { v2 as cloudinary } from "cloudinary";
import songModel from "../models/songs.model.js";

const addSong = async (req, res) => {
  try {
    const name = req.body.name;
    const desc = req.body.desc;
    const album = req.body.album;
    const audioFile = req.files.audio[0];
    const imageFile = req.files.image[0];

    const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
      resource_type: "video",
    });
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const seconds = Math.floor(audioUpload.duration) % 60;
    const formattedSeconds = seconds.toString().padStart(2, "0");
    const duration = `${Math.floor(
      audioUpload.duration / 60
    )}:${formattedSeconds}`;

    const songData = {
      name,
      desc,
      album,
      image: imageUpload.secure_url,
      file: audioUpload.secure_url,
      duration,
    };
    const song = songModel(songData);
    await song.save();
    res.status(200).json({ success: true, message: "Song added!" });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

const listSong = async (req, res) => {
  try {
    const allSongs = await songModel.find({});
    res.status(200).json({ success: true, songs: allSongs });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

const removeSong = async (req, res) => {
  try {
    await songModel.findByIdAndDelete(req.body.id);
    res.status(200).json({ success: true, message: "song removed!" });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

export { addSong, listSong, removeSong };
