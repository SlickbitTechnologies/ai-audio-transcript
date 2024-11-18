import React, { useState } from "react";
import { Grid, Typography, Button, styled } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import Dropdown from "../components/Dropdown";
import { useDispatch } from "react-redux";
import {
  useUploadAudioMutation,
  AudioTransactiptApi,
} from "../context/api/AudioTranscriptApi";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const UploadAudio = ({ callbackSubmit }) => {
  const [audioFile, setAudioFile] = useState(null);
  const [menuValue, setMenuValue] = useState("");
  const dispatch = useDispatch();
  const [uploadAudio] = useUploadAudioMutation();

  const menuList = [
    {
      id: 1,
      value: "Pharma",
    },
    {
      id: 2,
      value: "Health care",
    },
    {
      id: 3,
      value: "Finance",
    },
    {
      id: 4,
      value: "Retail",
    },
    {
      id: 5,
      value: "Telecom",
    },
    {
      id: 6,
      value: "Business",
    },
  ];

  const handleUploadAudioFile = (e) => {
    console.log(e.target.files[0], "dsfkhsjfkhk");
    setAudioFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", audioFile);
    formData.append("domain",menuValue)
    const { data, error } = await uploadAudio(formData);
    if (data?.message) {
      const { data, error } = dispatch(
        AudioTransactiptApi.endpoints.getAllAudioData.initiate({
          q: new Date().getTime(),
        })
      );
      callbackSubmit();
      setAudioFile(null);
      setMenuValue("")
    }
  };

  return (
    <Grid sx={{ paddingTop: 15, display: "flex", justifyContent: "center" }}>
      <Grid
        sx={{
          height: 300,
          width: "60%",
          border: "1px solid #544f4f",
          borderRadius: 10,
          backgroundColor: "#e2e7f4",
          padding: 2,
          display:'flex',
          alignItems:'center',
          // justifyContent:'center',
          flexDirection:'column'
        }}
      >
        <Typography
          sx={{ fontSize: 24, textAlign: "left", padding: 2, fontWeight: 600 }} variant="c5"
        >
          Input configuration
        </Typography>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 2,
          }}
        >
          <Grid sx={{display: 'flex', flexDirection:'column', paddingTop: 1}}>
            <Typography variant="c5">
              Upload Audio File<span style={{ color: "#FF0000" }}>*</span>
            </Typography>
            <Button
              component="label"
              role={undefined}
              className="audio-button"
              sx={{ "&:hover": { backgroundColor: "transparent" } }}
            >
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  backgroundColor: "#FFF",
                  width: 150,
                  borderRadius: 3,
                  alignItems: "center",
                  border: "1px solid #000",
                  padding: 1,
                }}
              >
                <VolumeUpIcon />
                <Typography
                  variant="c5"
                  sx={{
                    paddingLeft: 1,
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    width: 150,
                    display: "inline-block",
                    overflow: "hidden",
                  }}
                >
                  {audioFile == null ? "Select File" : audioFile?.name}
                </Typography>
                <VisuallyHiddenInput
                  type="file"
                  onChange={handleUploadAudioFile}
                />
              </Grid>
            </Button>
          </Grid>
          <Grid style={{width: 150}}>
            <Typography variant="c5" >
              Select Domain<span style={{ color: "#FF0000", lineHeight: '30px' }}>*</span>
            </Typography>
            <Dropdown
              list={menuList}
              value={menuValue}
              handleChange={(e) => {
                setMenuValue(e.target.value);
              }}
              valueKey="value"
              displayKey="value"
              label={"Select"}
              width={"100%"}
              border='1px solid #000'
            />
          </Grid>
        </Grid>
        <Button
          onClick={handleSubmit}
          disabled={ menuValue.length == 0 || audioFile == null ? true : false}
          sx={{
            padding: '5px',
            width: 130,
            backgroundColor: "#FFF",
            marginTop: 5,
            border: "1px solid #000",
            borderRadius: 3,
          }}
          variant="c5"
        >
          <Typography variant="c5" sx={{ fontSize: 20, fontWeight: 500, fontFamily: 'Roboto, san-serif' }}>Submit</Typography>
        </Button>
      </Grid>
    </Grid>
  );
};

export default UploadAudio;
