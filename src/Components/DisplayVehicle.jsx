import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  information: {
    textAlign: 'left',
  },
  imagecontainer: {
    marginTop: 200,
  },
}));

/**
 * Not decoupled as the data is
 * already tightly coupled to the output page.
 * If we needed more functionality such as 'book now'
 * It would be wrapped in a container.
 */
const DisplayVehicle = ({ location }) => {
  const history = useHistory();
  const classes = useStyles();

  const {
    VendorName,
    Status,
    AirConditionInd,
    TransmissionType,
    FuelType,
    DriveType,
    PassengerQuantity,
    BaggageQuantity,
    Code,
    CodeContext,
    DoorCount,
    Name,
    PictureURL,
    RateTotalAmount,
    EstimatedTotalAmount,
    CurrencyCode,
  } = location.state[0];

  /**
     * Could map backwards here - keys to table headings
     */
  return (
    <Container>
      <Grid container spacing={6}>
        <Grid item xs={6} className={classes.information}>
          <h1>{`${Name} : €${EstimatedTotalAmount}`}</h1>
          <p>
            Status:
            {Status}
          </p>
          <p>
            Fuel Type:
            {FuelType}
          </p>
          <p>
            Vendor Name:
            {VendorName}
          </p>
          <p>
            Transmission Type:
            {TransmissionType}
          </p>
          <p>
            AirConditionind:
            {AirConditionInd}
          </p>
          <p>
            No of Passengers:
            {PassengerQuantity}
          </p>
          <p>
            Baggage Quantity:
            {BaggageQuantity}
          </p>
          <p>
            Code Context:
            {CodeContext}
          </p>
          <p>
            Rate Total Amount:
            {RateTotalAmount}
          </p>
          <p>
            No of Doors:
            {DoorCount}
          </p>
          <p>
            DriveType:
            {DriveType}
          </p>
          <p>
            Currency:
            {CurrencyCode}
          </p>
          <p>
            Code:
            {Code}
          </p>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push('/')}
          >
            Return Home
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => alert('I have no purpose')}
          >
            Select
          </Button>
        </Grid>
        <Grid item xs={6}>
          <img alt="Vehicle" className={classes.imagecontainer} src={PictureURL} />
          <p>Don&apos;t mind my styling as a page I didn&apos;t get my deserved time</p>
        </Grid>
      </Grid>
    </Container>
  );
};

DisplayVehicle.propTypes = {
  location: PropTypes.func.isRequired,
};

export default DisplayVehicle;
