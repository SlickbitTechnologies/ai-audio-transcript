import express from "express";
import {
  getAllAudioData,
  uploadAudioFile
} from "../controllers/audioTranscript/index.mjs";
import upload from "../utils/UploadMiddleware.mjs";

const AudioTranscriptRouter = express.Router();
const URI = "/api/audio-transcript";
// AudioTranscriptRouter.get(`${URI}`, getAudioData);
AudioTranscriptRouter.get(`${URI}/all`, getAllAudioData);
AudioTranscriptRouter.post(
  `${URI}/upload`,
  upload.single("file"),
  uploadAudioFile
);

export default AudioTranscriptRouter;
