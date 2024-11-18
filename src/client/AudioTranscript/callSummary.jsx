import React, { useState, useRef, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import CalldetailsTable from "./callDetailsTable";
import ReactAudioPlayer from "react-audio-player";
import PerformanceMetrics from "./performanceMetrics";

const CallSummary = ({ audioData }) => {
  const ref = useRef(null);
  const [showData, setShowData] = useState(audioData[0]);
  const [showConv, setShowConv] = useState([])

  const callDetailsData = [
    {
      conversationId: 1,
      overAllProcessStatus: "InProgress",
      createdDate: "01/01/2024",
      modifiedDate: "15/05/2024",
    },
    {
      conversationId: 2,
      overAllProcessStatus: "Completed",
      createdDate: "01/01/2024",
      modifiedDate: "15/05/2024",
    },
    {
      conversationId: 3,
      overAllProcessStatus: "InProgress",
      createdDate: "01/01/2024",
      modifiedDate: "15/05/2024",
    },
  ];

  useEffect(() => {
    const textData = showData?.transcription?.map((text) => {
      let replaceText = text.replace(/Speaker 1/g, 'Speaker 1:').replace(/Speaker 2/g, 'Speaker 2:')
      return replaceText
    })
    setShowConv(textData)
  }, [showData])
  const handleClick = (id) => {
    const filterAudioData = audioData.filter((e) => {
      return e.id == id;
    });
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setShowData(filterAudioData[0]);
  };

  return (
    <Grid container sx={{ width: "100%", padding: 5 }}>
      <Grid sx={{ width: "100%" }}>
        <Typography
          variant="c5"
          sx={{
            textAlign: "start",
            padding: 2,
            fontSize: 30,
            fontWeight: 700,
            paddingBottom: 2,
          }}
        >
          Call Analysis
        </Typography>
        <Grid sx={{ maxHeight: 400, overflowX: "scroll", marginTop: 2 }}>
          <CalldetailsTable
            callDetailsData={audioData}
            conversationCallback={handleClick}
          />
        </Grid>
      </Grid>

      <Grid sx={{ width: "100%", marginTop: 5 }} ref={ref}>
        <Typography
            variant="c5"
            sx={{
              textAlign: "start",
              padding: 2,
              fontSize: 30,
              fontWeight: 700,
              paddingBottom: 1,
            }}
          >
            Audio
          </Typography>
        <Grid
          sx={{
            border: "1px solid #000",
            borderRadius: 3,
            height: 400,
            width: "100%",
          }}
        >
          <Grid sx={{padding: 2, justifyContent:'center', display: 'flex'}}>
            <ReactAudioPlayer src={showData?.audioLink} controls />
          </Grid>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              padding: 2,
              paddingTop: 5,
            }}
          >
            <Grid
              sx={{
                width: "50%",
                display: "flex",
                alignItems: "flex-start",
                border: "0x solid #000",
                height: 230,
                flexDirection: "column",
                backgroundColor: "#e2e7f4",
                borderRadius: 5,
                padding: 1,
                overflowX: "scroll"
              }}
            >
              <Typography
              variant="c5"
                sx={{ fontSize: 20, fontWeight: 700, paddingBottom: 2 }}
              >
                Summary:{" "}
              </Typography>
              <Typography
                sx={{ fontSize: 14, fontWeight: 400, textAlign: "start" }}
                variant="c5"
              >
                {showData?.summarizeText}
              </Typography>
            </Grid>
            <Grid
              sx={{
                width: "50%",
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
                paddingLeft: 2,
                backgroundColor: "#e2e7f4",
                height: 230,
                borderRadius: 5,
                padding: 1,
                border: "0px solid #000",
                marginLeft: 1,
                overflowX: "scroll",
                textAlign: "left",
              }}
            >
              <Typography
                sx={{ fontSize: 20, fontWeight: 700, paddingBottom: 2 }}
                variant="c5"
              >
                Transcript:{" "}
              </Typography>
              {showConv?.map((converstaion, index) => {
                return (
                  <Typography
                    sx={{ fontSize: 14, fontWeight: 400, paddingBottom: 2 }}
                    variant="c5"
                  >
                    {converstaion}
                  </Typography>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid sx={{ width: "100%", marginTop: 5 }}>
        <Typography
          sx={{
            textAlign: "start",
            padding: 2,
            fontSize: 30,
            fontWeight: 700,
            paddingBottom: 2,
          }}
          variant="c5"
        >
          Performance Metrics
        </Typography>
        <Grid sx={{ maxHeight: 500, overflowX: "scroll" }}>
          {showData &&
            <PerformanceMetrics
              metricsData={showData.metricsData}
            />
          }
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CallSummary;
