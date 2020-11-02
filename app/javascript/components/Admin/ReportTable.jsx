import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Axios from "axios";
import EditReportForm from "./EditReportForm";

// Material ui customization
const useStyles = makeStyles({
  
  table: {
    width: "90%",
    margin: "auto",
  },
  tableHead: {
    backgroundColor: "#a47638",
    
  },
  tableCellHead: {
    color: "white",
    fontSize: "1.5rem",
    fontFamily: "Roboto",
    lineHeight: "3rem",
  },
  tableCellHeader: {
    fontSize: "1.5rem",
    fontFamily: "Roboto",
  },
  tableCellBody: {
    fontSize: "1.5rem",
    fontFamily: "Roboto",
  },
  avatar: {
    backgroundColor: "#004578",
    width: "35px",
    height:"35px"
  },
});
const style = {
  width: "25px",
  height: "25px"
}



 

export default function ReportsTable(props) {
  const classes = useStyles();
  const {reports} = props;
//   const handleSubmit = () => {
//     console.log(reports)
//      //   Axios.delete(`api/v1/reports/${props.report.id}`)
// //   .then( () => {
// //     console.log ("deleted!")
// //   setTimeout(() => {
// //     alert("Deleeted")
// //   }, 400);
// // })
// //   .catch ((error) => {
// //     console.log("not sent, ", error)
// //   })
// }
    

  // console.log("reports: ", reports);
  return (
    <TableContainer >
      <Table className={classes.table} aria-label="customized table">
      
        <TableHead >
          <TableRow className={classes.tableHead}> 
            <TableCell className={classes.tableCellHead}>Horse</TableCell>
            <TableCell className={classes.tableCellHead} >Name</TableCell>
            <TableCell className={classes.tableCellHead} >Day of Ride</TableCell>
            <TableCell className={classes.tableCellHead} >Warm-Up</TableCell>
            <TableCell className={classes.tableCellHead} >Activity</TableCell>
            <TableCell className={classes.tableCellHead} >Exercises</TableCell>
            <TableCell className={classes.tableCellHead} >Comments</TableCell>
            <TableCell className={classes.tableCellHead} >Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reports.map((report) => {
            const {
              id,
              activity_date,
              answer1,
              answer2,
              answer3,
              answer4,
              horse,
              user
            } = report.attributes;
            return (
              <TableRow key={report.id}>
                
                <TableCell className={classes.tableCellBody} component="th" scope="row">
                  {horse.name}
                </TableCell>
                
                <TableCell className={classes.tableCellBody}  component="th" scope="row">
                 {`${user.first_name} ${user.last_name}`}
                </TableCell>
                
                <TableCell className={classes.tableCellBody} >{activity_date}
                </TableCell>
                
                <TableCell className={classes.tableCellBody} >  {answer1?"Yes":"No"}
                </TableCell>
                <TableCell className={classes.tableCellBody} >{answer2}
                </TableCell>
                
                <TableCell className={classes.tableCellBody} >{answer3}
                </TableCell>
                
                <TableCell className={classes.tableCellBody} >{answer4}
                </TableCell>

                <TableCell className={classes.tableCellBody} >
                <EditReportForm report={report} onSubmit={props.onChange} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
       
      </Table>
    </TableContainer>
  );
}
