import fs from "fs";
import { openai, waitForSec } from "../../utils/utils.mjs";
import uploadFile from "./uploadFile.mjs";
import { postAudioData } from "../../utils/FirebaseDB.mjs";
import {getAudio} from '../../utils/FirebaseDB.mjs';
import {metricsData1} from './metricsData.mjs';

const assistant_id = "asst_g2K9Mn6b3X6o2et5eCHtDPj9";

export const getAllAudioData = async (req, res) => {
  try {
    const audioData = await getAudio();
    res.status(200).json(audioData);
  } catch (e) {
    res.status(500).send(e);
  }
};

export const uploadAudioFile = (req, res) => {
  console.log(req, 'reqdsfhdskh')
  const uploadData = req.file;
  console.log(uploadData, 'uploadDatauploadData')
  uploadFile(uploadData, async (status, response) => {
    if (status) {
      if(response){
        let transcriptionData = [];
        const transcription = await openai.audio.transcriptions.create({
          file: fs.createReadStream(uploadData.path),
          model: "whisper-1",
          response_format: "verbose_json",
          prompt: `Please transcribe the attached audio file. The audio contains a conversation between two speakers. Ensure each speaker's dialogue is clearly marked and separated in the transcription.
          For example:
          Speaker 1: Hello, how are you?
          Speaker 2: I'm good, thank you. I am calling you regarding a credit card issue.
          Speaker 1: Yeah, please tell me. I am here to help you.
          Speaker 2: I came to the store and I used my credit card for payment, but it's getting declined. May I know why?
          Speaker 1: Yeah sure, please be on the line. I will check it.
          Speaker 2: Yeah.
          Speaker 1: Thanks for waiting. Your card has been blocked. You can call the helpline number; they will resolve your issue.
          Speaker 2: Ok, thank you. I will call them.
          
          Give me the response as above example, strictly label the two speakers as "Speaker 1" for first speaker and "Speaker 2" for second speaker and highlight with boldness.`,
        });

        transcription?.segments?.map((i) => {
          transcriptionData.push(i.text)
        })

        let listOfKeys = [];
        metricsData1.map((i) => {
          listOfKeys.push(i.action_display_name)
        })
        // summarizeText = completion.choices[0].message.content
        let transcriptionText = transcription.text;
        let transcriptPrompt = 'Summarize the given text in 3 lines';
        let metricsPromt = `From the given conversation go through all the keys in
        ${JSON.stringify(listOfKeys)} one after another, find if the key is there or not from the whole conversation.
        if you found the key then return the chunk as json like [{found: true, chunk: founded text, key: key}].
        otherwise return [{found: false, chunk: null, key: key}].
        return all the keys from this list ${JSON.stringify(listOfKeys)}
        for example [{
          action_display_name: "Greeting",
          result: true,
          transcript_chunk: "Good day, this is Ravi from National Bank of India."
        }]`;
      
        const summaryResult = await commonCompletion(transcriptionText, transcriptPrompt)
        const metricsResult = await commonCompletion(transcriptionText, metricsPromt)

        console.log(JSON.parse(metricsResult), 'metricsResultmetricsResult')
        
        const audioData = await getAudio();

        await postAudioData(req, response, transcriptionData, summaryResult, audioData.length, JSON.parse(metricsResult));
      }
      res.status(200).json({ message: "File uploaded successfully" });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  });
};

const commonCompletion = async(text, prompt) => {

  let summarizeText = '';
        const completion = await openai.chat.completions.create({
          messages: [
            { role: "system", content: text },
            { role: "user", content: prompt }
          ],
          model: "gpt-3.5-turbo-16k",
        });
        
        summarizeText = completion.choices[0].message.content;
        return summarizeText;
}