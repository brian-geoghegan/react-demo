import { flatten } from 'flat';
import vehicleTableMapper from './tableHeadingMapper';
/**
 * Overengineer for the task -> but provides a reusable table componenet and structure in general
 * @param {JSONarray} data is the returned data from the carTrawler api.
 * @returns A flattened simplified list for the resuable table component.
 */
const parseCarTableData = (rawVehicleData) => {
    let flattenedArray = [];
    const vehicleData = rawVehicleData.map(vendorData => {
        return vendorData.VehAvails.map(vehicle => {
        const vehicleDisplayData = addUniqueIdAndVendorToVehicle(vehicle, vendorData);
        const flattenedVehicleData = flatten(vehicleDisplayData);
        const vehicleSimplfiedKeys = keySimplifier(flattenedVehicleData);
        return vehicleSimplfiedKeys;
    })});
    vehicleData.map(array => flattenedArray = flattenedArray.concat(array));
    return flattenedArray;
}

/**
 * This simplifies keys so we can map them easier.
 * The flattened keys above are concatencated versions of the original nested object 
 * eg: VehAvails.Vehicle.@AirConditionInd. will become AirConditionInd
 * @param {*} flattenedArray the flattened array from parsing earlier data.
 */
const keySimplifier = (flattenedVehicleData) => {
    let cleanedData = flattenedVehicleData;
    for(const [key, value] of Object.entries(flattenedVehicleData)) {
        if (key.includes('.') || key.includes('@')) {
            const newKey = key.replace('@', '').split('.').pop();
            delete cleanedData[key];
            cleanedData[newKey] = value;
        }
    }
    return cleanedData;
}

/**
 * This is the add the vendor information to the vehicle so its easier to flatten.
 * Vendor Key has Code and
 * and create a unqiueId to iterate through efficiently.
 * 
 * @param {} vehicle 
 * @param {*} venderData 
 */
const addUniqueIdAndVendorToVehicle = (vehicle, venderData) => {
    const vehicleWithUniqueId = vehicle;
    vehicleWithUniqueId.VendorCode = venderData.Vendor['@Code'];
    vehicleWithUniqueId.VendorName = venderData.Vendor['@Name'];
    vehicleWithUniqueId.uniqueId = vehicle.Vehicle['@Code'] + vehicle.VendorCode;
    return vehicleWithUniqueId;
}

/**
 * 
 * @param {*} parsedTableData all table data
 * @param {*} headings 
 */
const mapHeadingsToData = (parsedTableData, headings) => {
    let mappedHeadings = {};
    let finalDisplayData = [];
    for(const key of headings) {
        const mappedHeading = vehicleTableMapper.get(key);
        mappedHeadings[mappedHeading] = mappedHeading;
    }
    for(const vehicleData of parsedTableData) {
        let extractedVehicle = {
            uniqueId: vehicleData.uniqueId
        };
        for (const [key] of Object.entries(mappedHeadings)) {
            extractedVehicle[key] = vehicleData[key]; 
        }
        finalDisplayData.push(extractedVehicle); 
    }
    return finalDisplayData;
}

export {
    parseCarTableData,
    mapHeadingsToData
}