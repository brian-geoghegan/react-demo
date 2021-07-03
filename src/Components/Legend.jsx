


/**
 * Only accepts array of objects [{}]
 * Each object must have a uniqueId key
 * 
 * @param {array} tableData is an array of objects. 
 * @param {array} headings is an array of headings.
 * @param {string} sortKey is an sortKey for the table.
 */
const Legend = (tableData, headings, sortKey) => {
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

export default Legend;
