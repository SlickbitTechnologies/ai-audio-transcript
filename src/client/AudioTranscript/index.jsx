import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import UploadAudio from "./uploadAudio";
import CallSummary from "./callSummary";
import { useSelector, useDispatch } from "react-redux";
import BasicModal from "../components/cardAction";
import Alert from "../components/Alert";
import { clearLoader } from "../context/reducers/LoadingReducer";
import {
  useGetAllAudioDataQuery,
  AudioTransactiptApi,
} from "../context/api/AudioTranscriptApi";
import { clearAudioTranscript } from "../context/reducers/AudioTranscriptReducer";

const AudioTranscript = () => {
  const dispatch = useDispatch();
  const [indexValue, setIndexValue] = useState(1);
  const { loading, error } = useSelector((state) => state?.loader);
  const { audioData, toastMessage } = useSelector((state) => state.audio);

  useEffect(() => {
    dispatch(clearLoader());
    dispatch(clearAudioTranscript())
    const { data, error } = dispatch(
      AudioTransactiptApi.endpoints.getAllAudioData.initiate({
        q: new Date().getTime(),
      })
    );
  }, []);

  const handleSubmitAudioFiles = () => {
    setIndexValue(2);
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid
        item
        xs={2}
        sx={{ backgroundColor: "#FFF", borderRight: "2px solid #EEE" }}
      >
        <Grid
          onClick={() => setIndexValue(1)}
          sx={{
            height: 50,
            width: "100%",
            backgroundColor: indexValue == 1 ? "#d2ddf7" : "#FFF",
            alignItems: "center",
            display: "flex",
            cursor: "pointer",
          }}
        >
          <Typography
            sx={{
              paddingLeft: 2,
              color: indexValue == 1 ? "#000" : "#000",
              fontWeight: 500,
            }}
            variant="c5"
          >
            Upload Audio
          </Typography>
        </Grid>
        <Grid
          onClick={() => setIndexValue(2)}
          sx={{
            height: 50,
            width: "100%",
            backgroundColor: indexValue == 2 ? "#d2ddf7" : "#FFF",
            alignItems: "center",
            display: "flex",
            cursor: "pointer",
          }}
        >
          <Typography
            sx={{
              paddingLeft: 2,
              color: indexValue == 2 ? "#000" : "#000",
              fontWeight: 500,
            }}
            variant="c5"
          >
            Call Summary Transcript
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={10} sx={{ backgroundColor: "#FFF" }}>
        {indexValue == 1 ? (
          <UploadAudio callbackSubmit={handleSubmitAudioFiles} />
        ) : (
          <CallSummary audioData={audioData} />
        )}
      </Grid>
      {loading && <BasicModal loading={loading} />}
      {error && (
        <Alert
          open={true}
          message={"Failed to upoad the file."}
          severity="error"
        />
      )}
      {toastMessage && (
        <Alert
          open={true}
          message={"File uploaded successfully."}
          severity="success"
        />
      )}
    </Grid>
  );
};

export default AudioTranscript;
