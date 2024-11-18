import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CustomizedProgressBars from "./ProgressBar";

export const ActionAreaCard = ({ questions, onClick }) => {
  console.log("questionsquestions", questions);
  return (
    <Card sx={{ maxWidth: 1000, marginRight: 2, backgroundColor: "#f0f4f9" }} onClick={onClick}>
      <CardActionArea>
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            style={{ color: "black", fontSize: "1rem", fontWeight: 400 }}
          >
            {questions.question}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "transparent",
  border: "none",
  p: 2000,
};

export default function BasicModal({ loading = false }) {
  return (
    <div>
      <Modal
        open={loading}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CustomizedProgressBars />
        </Box>
      </Modal>
    </div>
  );
}
