import React, { useState, useEffect, useMemo } from "react";
import { styled } from "@mui/material/styles";
import {
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import moment from "moment"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#d2ddf7",
    // color: theme.palette.common.white,
    fontSize: 16,
    color: "#000",
    fontWeight: 700,
    border: 0,
    height: "10px !important",
    fontFamily: 'Roboto, san-serif',
    // width: '28%'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: "#000",
    fontWeight: 400,
    border: 0,
    height: "10px !important",
    fontFamily: 'Roboto, san-serif',
    // width: '28%'
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#FFF",
    padding: "10px !important",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#d2ddf7",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const CalldetailsTable = ({ callDetailsData, conversationCallback }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 3,
        maxHeight: "100vh"
      }}
    >
      <Table stickyHeader sx={{ border: '1px solid #EEE' }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Call ID</StyledTableCell>
            <StyledTableCell align="left" sx={{ whiteSpace: "nowrap" }}>
              File name
            </StyledTableCell>
            <StyledTableCell align="left">Domain</StyledTableCell>
            <StyledTableCell align="left">File Size</StyledTableCell>
            <StyledTableCell align="left">Created Date</StyledTableCell>
            <StyledTableCell align="left"> </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {callDetailsData?.length > 0 ? (
            <>
              {callDetailsData?.map((row, index) => {
                let fileName = '';
                if(row.filename != ''){
                  fileName = row.filename.split('_')
                }
                return(
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    000{row.call_id}
                  </StyledTableCell>
                  <StyledTableCell align="left">{fileName[1]}</StyledTableCell>
                  <StyledTableCell align="left">{row.domain}</StyledTableCell>
                  <StyledTableCell align="left">{row.size} kb</StyledTableCell>
                  <StyledTableCell align="left">
                    {moment(row?.created_DTM).format('DD-MM-YYYY HH:mm:ss')}
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    sx={{ cursor: "pointer" }}
                    onClick={() => conversationCallback(row.id)}
                  >
                    <ArrowCircleRightIcon fontSize="large" />
                  </StyledTableCell>
                </StyledTableRow>
                )
              })}
            </>
          ) : (
            <Grid
              sx={{
                height: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography>No data to display</Typography>
            </Grid>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CalldetailsTable;
