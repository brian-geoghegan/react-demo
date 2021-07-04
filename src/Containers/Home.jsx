import { useEffect, useState } from "react";
import { retrieveCarData } from '../services/carData';
import { parseCarTableData, mapHeadingsToData, sortByCost } from '../helpers/vehicleHelpers';
import CustomTable from '../Components/CustomTable';
import Legend from '../Components/Legend';
import { useHistory } from 'react-router-dom';

function Home() {
    const [tableData, setTableData] = useState(null);
    const [allVehicleData, setAllVehicleData] = useState(null);
    const [legendData, setLegendData] = useState(null);

    const sortKey = 'Cost';
    let history = useHistory();

    /**
     * Customizable data shown in UI. 
     * See mapHeadingsToData to view or modify headings/data shown.
     * Acts as a 'lightswitch' for particular pieces of data shown in the table
     * In case product owner suddenly changes there mind :/
     */
    const vehicleTableHeadings = [
        'Cost',
        'Vehicle',
        'Status',
        'Vendor',
        'Fuel Type',
        'No of Doors',
        'Drive Type',
        'Estimated Cost',
        'Image'
    ]
    
    useEffect( async() => {
        if (!tableData) {
            const resp = await retrieveCarData();
            if (!resp) throw new Error('Api returned error');
            const carData = resp[0].VehAvailRSCore.VehVendorAvails;
            const legendApiData = resp[0].VehAvailRSCore.VehRentalCore;
            const parsedTableData = parseCarTableData(carData);
            const dataMappedToHeadings = mapHeadingsToData(parsedTableData, vehicleTableHeadings);
            /**
             * Failed to get material ui sorting working properly by Monday so
             * So manually sorting here, there are a few options I could do here
             * such as not using material ui and just passing up a manually sort here.
             * But I spend alot of time in other places.
             * */ 
            const sortedData = sortByCost(dataMappedToHeadings);
            setTableData(dataMappedToHeadings);
            setAllVehicleData(parsedTableData);
            setLegendData(legendApiData);
        }
    });

    const displayVehicleHandler = (displayVehicleId) => {
        if (allVehicleData) {
            const displayVehicleData = allVehicleData.filter(vehicle => vehicle.uniqueId === displayVehicleId);
            history.push('/vehicle', displayVehicleData);
        }
    }

    return (
        <div>
            {Legend(legendData)}
            {CustomTable(tableData, vehicleTableHeadings, sortKey, displayVehicleHandler)}
        </div>
    )
};

export default Home;