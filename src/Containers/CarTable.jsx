import { useEffect, useState } from "react";
import CustomTable from '../Components/CustomTable';
import { connect } from "react-redux";
import { retrieveCarData } from '../services/carData';
import { parseCarTableData, mapHeadingsToData } from '../helpers/vehicleHelpers';

function CarTable() {
    const [tableData, setTableData] = useState(null);
    const [legendData, setLegendData] = useState(null);

    const sortKey = 'Cost';
    /**
     * Customizable data shown in UI. 
     * See mapHeadingsToData to view or modify headings/data shown.
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
            const legendData = resp[0].VehAvailRSCore.VehRentalCore;

            const parsedTableData = parseCarTableData(carData);
            const dataMappedToHeadings = mapHeadingsToData(parsedTableData, vehicleTableHeadings);
            setTableData(dataMappedToHeadings);
        }
    });

    return (
        <div>
            {CustomTable(tableData, vehicleTableHeadings, sortKey)}
        </div>
    )
};

export default connect()(CarTable);