import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';


const pictureOptions = ['PictureURL', 'Image', 'Picture']

/**
 * Stolen from material UI table docs 
 */
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

/**
 * I'm not even sure if this is good practice
 * A function to creates unstructured tables
 * Depending on incoming data this could ne weird.
 * @param {TableItems} data 
 */

const createTableBodyRow = (rowData) => {
    const uniqueId = rowData.uniqueId;
    delete rowData.uniqueId;
    console.log(rowData)
    return (
        <TableRow key={uniqueId}>
            {
            Object.entries(rowData).map(cellId => 
                <TableCell component='th' scope='row'>
                    {pictureOptions.includes(cellId[0])
                        ? <img src={cellId[1]} alt={cellId} height="80"/> 
                        : cellId[1]
                    }
                </TableCell>)
            }
        </TableRow>
    )
};

const createTableBody = (tableData) => {
     return tableData.map(rowData => createTableBodyRow(rowData)) 
};

const createTableHeader = (headings) => {
    return(
        <TableRow>
            {headings.map(heading =><TableCell>{heading}</TableCell>)}
        </TableRow>
    )
}

/**
 * Only accepts array of objects [{}]
 * Each object must have a uniqueId key
 * 
 * @param {array} tableData is an array of objects. 
 * @param {array} headings is an array of headings.
 * @param {string} sortKey is an sortKey for the table.
 */
const CustomTable = (tableData, headings, sortKey) => {
    const [order, setOrder] = React.useState('Cost');
    const [orderBy, setOrderBy] = React.useState(sortKey);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(4);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

    
    const useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
    });
    
    const classes = useStyles();

    if(!tableData) return <p>No data to display</p>

    return (
        <Paper className={classes.paper}>
            <TableContainer component={Paper}>
                <Table 
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size={'medium'}
                    aria-label='enhanced table'
                >
                    <TableHead>
                        {createTableHeader(headings)}
                    </TableHead>
                    <TableBody>
                    {
                        createTableBody(
                            stableSort(tableData, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        )
                    }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[4, 10, 25]}
                component="div"
                count={tableData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>


)
};

export default CustomTable;