
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

/**
 * Only accepts array of objects [{}]
 * Each object must have a uniqueId key
 * 
 * @param {array} tableData is an array of objects. 
 * @param {array} headings is an array of headings.
 * @param {string} sortKey is an sortKey for the table.
 */

const Legend = (data) => {    
    const useStyles = makeStyles((theme) => ({
        root: {
          '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
          },
        },
      }));      
    
    const classes = useStyles();

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField
                    id="datetime-local"
                    label="Pick-up date and time"
                    type="datetime-local"
                    defaultValue={data ? data['@PickUpDateTime'] : Date.now().toLocaleString()}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />                
                <TextField
                    id="datetime-local"
                    label="Return date and time"
                    type="datetime-local"
                    defaultValue={data ? data['@ReturnDateTime'] : Date.now().toLocaleString()}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />    
            </div>
            <div>
                <TextField id="outlined-basic" label="Pick up location" variant="outlined">{data? data['@PickUpLocation.@Name']: ''}</TextField>
                <TextField id="outlined-basic" label='Return location' variant="outlined">{data? data['@ReturnLocation.@Name']: ''}</TextField>
            </div>
        </form>
    )
};

export default Legend;
