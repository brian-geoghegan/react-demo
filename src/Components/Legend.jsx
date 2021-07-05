import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { CardHeader } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

/**
 * Tightly coupled - put too much time into table component
 */
const Legend = (data) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    cardroot: {
      minWidth: 275,
      marginTop: 50,
      color: '#000000',
      backgroundColor: '#e3e3e3',
    },
    textField: {
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },

  }));

  const classes = useStyles();

  if (!data) return <LinearProgress />;

  /* eslint-disable react/destructuring-assignment */
  const pickUpTime = data['@PickUpDateTime'].substring(0, data['@PickUpDateTime'].length - 4);
  const returnTime = data['@ReturnDateTime'].substring(0, data['@PickUpDateTime'].length - 4);

  const pickUpLocation = data.PickUpLocation['@Name'];
  const returnLocation = data.ReturnLocation['@Name'];
  /* eslint-enable react/destructuring-assignment */

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Card className={classes.cardroot} variant="outlined">
        <CardHeader>
          Pick your date and time
        </CardHeader>
        <CardContent>
          <div>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Pick your date and time
            </Typography>
            <div>
              <TextField
                id="pick-up-date"
                label="Pick-up date and time"
                type="datetime-local"
                defaultValue={pickUpTime}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="return-date"
                label="Return date and time"
                type="datetime-local"
                className={classes.textField}
                defaultValue={returnTime}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div>
              <TextField
                id="outlined-basic"
                label="Pick up location"
                className={classes.textField}
                variant="outlined"
                defaultValue={pickUpLocation}
              />
              <TextField
                id="outlined-basic"
                label="Return location"
                className={classes.textField}
                variant="outlined"
                defaultValue={returnLocation}
              />
            </div>
            <Button variant="contained" color="primary" onClick={() => alert('I don\'t do anything yet')}>Search</Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default Legend;
