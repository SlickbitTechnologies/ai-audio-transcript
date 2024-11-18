import React, {useState, useEffect, useMemo} from 'react';
import { styled } from '@mui/material/styles';
import {
  Grid, 
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {metricsData} from './performanceMetricsData';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#d2ddf7',
    // color: theme.palette.common.white,
    fontSize: 16,
    color:'#000',
    fontWeight: 700,
    border: 0,
    height: '10px !important',
    // width: '28%'
    fontFamily: 'Roboto, sans-serif'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color:'#000',
    fontWeight: 400,
    border: 0,
    height: '10px !important',
    // width: '28%'
    fontFamily: 'Roboto, sans-serif'
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#FFF',
    height: '10px !important'
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#d2ddf7',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


const PerformanceMetrics = ({metricsData}) => {

  return (
    <TableContainer component={Paper} sx={{borderRadius: 3, maxHeight: "100vh"}}>
      <Table stickyHeader sx={{ border: '1px solid #EEE' }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Metrics</StyledTableCell>
            <StyledTableCell align="left" sx={{whiteSpace: 'nowrap'}}>AI Detection</StyledTableCell>
            <StyledTableCell align="left">Transcript Chunk</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {metricsData?.length > 0 ? 
          <>
          {metricsData?.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row" sx={{ whiteSpace: "nowrap", width: 100 }}>{row.key}</StyledTableCell>
              <StyledTableCell align="left" style={{display: 'flex', fontWeight: 700, color:row.found == true ? 'green' : 'red' }}>{row.found == true ? 'YES' : 'NO'}</StyledTableCell>
              <StyledTableCell align="left">{row.found == false ? 'N/A' : row.chunk}</StyledTableCell>
            </StyledTableRow>
          ))}
          </>
          :
          <Grid sx={{height: 50, display:'flex', alignItems:'center', justifyContent:'center'}}>
            <Typography>No data to display</Typography>
          </Grid>
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PerformanceMetrics;