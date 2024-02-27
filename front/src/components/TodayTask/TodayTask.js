import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  MenuItem,
  Select,
} from "@mui/material";
import style from "./TodayTask.module.css";

function TodayTask({ rows }) {

  function formatDate(inputDateString) {
    const inputDate = new Date(inputDateString);
    
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false, // Use 24-hour format
    };
  
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(inputDate);
    return formattedDate;
  }
  
  const [page, setPage] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  //change style according to the window width
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //add style to the status column according to the value
  const makeStyle = (status) => {
    if (status === "Completed") {
      return {
        color: "rgb(83, 153, 83)",
        backgroundColor: 'rgba(83, 153, 83,0.3)',
        borderRadius: '15px',
        padding: "5px 15px"
      };
    } else if (status === "Pending") {
      return {
        color: "#DA1D1D",
        backgroundColor: 'rgba(218, 29, 29,0.3)',
        borderRadius: '15px',
        padding: "5px 15px"
      };
    } else {
      return {
        color:'rgb(68, 152, 185)',
        backgroundColor: 'rgba(200,223,231,0.3)',
        borderRadius: '15px',
        padding: "5px 15px"
      };
    }
  };

  //still sorting according to the option//
  return (
    <div
      style={{
        width: "74%",
        // border: "1px solid #D9D9D9",
        // margin: "10px",
        backgroundColor: "hsl(0, 7%, 97%)",
        borderRadius: '20px',
        paddingTop: "15px",
      }}
    >
      <Box
        className={style.Box}
        display="flex"
        justifyContent="space-between"
        sx={{ width: "100%", marginBottom: 1.5 }}
      >
        <Typography className={style.tableTitle} variant="h3">
          Today's Tasks
        </Typography>
      </Box>
      <TableContainer
        component={Paper}
        className={style.Table}
        sx={{
          width: "95%",
          margin: "auto",
          padding: '0 10px',
          borderRadius: '10px',
          backgroundColor: 'hsl(0, 7%, 97%)',
          boxShadow: '-1px 12px 20px -8px rgba(236, 232, 232, 0.73)',
          '.MuiTableRow-root': {
            margin: '2px',
            border: 'none',
          },
        }}
      >
        <Table sx={{'.css-jhh93v-MuiTableRow-root': {
            margin: '2px',
            border: 'none',
            padding:'10px',
            '&:hover': {
              boxShadow: '0 10px 10px 0px rgb(218, 218, 218)',
              
            }
          }}}>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Decription</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>End Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * 3, page * 3 + 3).map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&: -child td": { border: 0, background: "red" } }}
              >
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>
                  {" "}
                  <span className={style.status} style={makeStyle(row.status)}>
                    {row.status}
                  </span>
                </TableCell>
                <TableCell>{formatDate(row.endDate)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[3]}
        component="div"
        count={rows.length}
        rowsPerPage={4}
        page={page}
        onPageChange={handleChangePage}
      />
    </div>
  );
}

export default TodayTask;
