import React, {memo} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

/**
 * Support for variable image keyNames
 */
const pictureOptions = ['PictureURL', 'Image', 'Picture']

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
      },
      tableRow: {
          "&:hover": {
              backgroundColor: '#eee',
              cursor:'pointer'
          }
      }
});

/**
 * Stolen from material UI table docs 
 * Note: Did not get this working
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
  
/**
 * Stolen from material UI table docs
 * As you can see it doesn't work yet!
 */
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function EnhancedTableHead(props) {
    const { classes, order, orderBy, numSelected, rowCount, onRequestSort, headings } = props;
    const createSortHandler = (property) => (event) => {
        alert('He never finished my sorting ability');
        onRequestSort(event, property);
      };
    return (
      <TableHead>
        <TableRow>
          {headings.map((headCell) => (
            <TableCell
              key={headCell}
              sortDirection={orderBy === headCell ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell}
                direction={orderBy === headCell ? order : 'asc'}
                onClick={createSortHandler(headCell)}
              >
                {headCell}
                {orderBy === headCell ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
/**

 * Depending on incoming data this could ne weird.
 * @param {Array Objects} rowData data to be displayed 
 * @param {func} handler callback to container to handle row clicks
 * @param {styling} classes what type makeStyles returns
 */

const createTableBodyRow = (rowData, handler, classes) => {
    return (
        <TableRow 
            key={rowData.uniqueId}
            className={classes.tableRow}
        >
            {
            Object.entries(rowData).map(cellId => {
                if (cellId[0] !== 'uniqueId') {
                return (
                    <TableCell 
                        onClick={handler ? () => handler(rowData.uniqueId) : null} 
                        component='th'
                        scope='row'
                    >
                        {
                            pictureOptions.includes(cellId[0])
                              ? <img src={cellId[1]} alt={cellId} height="80"/> 
                              : cellId[1]
                        }
                    </TableCell>
                    )
                } else return null})
            }
        </TableRow>
    )
};

const createTableBody = (tableData, handler, classes) => {
     return tableData.map(rowData => createTableBodyRow(rowData, handler, classes)) 
};

/**
 * Only accepts array of objects [{}]
 * Each object must have a uniqueId key
 * 
 * @param {array} tableData is an array of objects. 
 * @param {array} headings is an array of headings.
 * @param {string} sortKey is an sortKey for the table.
 */
const CustomTable = (tableData, headings, sortKey, handler) => {
    const [order, setOrder] = React.useState('dsc');
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

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const classes = useStyles();

    if(!tableData) return <LinearProgress />

    return (
        <Paper className={classes.paper}>
            <TableContainer component={Paper}>
                <Table 
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size={'medium'}
                    aria-label='enhanced table'
                >
                    <EnhancedTableHead
                        headings={headings}
                        classes={classes}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={tableData.length}
                    />
                    <TableBody>
                    {
                        createTableBody(
                            stableSort(tableData, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
                            handler,
                            classes
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