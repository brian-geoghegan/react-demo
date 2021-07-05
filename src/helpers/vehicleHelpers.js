// Disabling as I need the loops - need to improve this whole file!
/* eslint-disable no-restricted-syntax */
import { flatten } from 'flat';
import vehicleTableMapper from './tableHeadingMapper';

/**
 * This simplifies keys so we can map them easier.
 * The flattened keys above are concatencated versions of the original nested object
 * eg: VehAvails.Vehicle.@AirConditionInd. will become AirConditionInd
 * @param {*} flattenedArray the flattened array from parsing earlier data.
 */
const keySimplifier = (flattenedVehicleData) => {
  const cleanedData = flattenedVehicleData;
  for (const [key, value] of Object.entries(flattenedVehicleData)) {
    if (key.includes('.') || key.includes('@')) {
      const newKey = key.replace('@', '').split('.').pop();
      delete cleanedData[key];
      cleanedData[newKey] = value;
    }
  }
  return cleanedData;
};

/**
 * This is the add the vendor information to the vehicle so its easier to flatten.
 * Adds vendor key and code as they seem to be the only unique
 * data when put together, this is done to iterate through the
 * data more efficiently - unique ids should be be used instead of
 * indexes.
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
};

/**
 * Overengineered for the task -> but lets us decouple from
 * the table component so we could reuse it later.
 * @param {JSONarray} data is the returned data from the carTrawler api.
 * @returns A flattened simplified list for the resuable table component.
 */
const parseCarTableData = (rawVehicleData) => {
  let flattenedArray = [];
  const vehicleData = rawVehicleData.map((vendorData) => vendorData.VehAvails.map((vehicle) => {
    const vehicleDisplayData = addUniqueIdAndVendorToVehicle(vehicle, vendorData);
    const flattenedVehicleData = flatten(vehicleDisplayData);
    const vehicleSimplfiedKeys = keySimplifier(flattenedVehicleData);
    return vehicleSimplfiedKeys;
  }));
  vehicleData.forEach((array) => { flattenedArray = flattenedArray.concat(array); });
  return flattenedArray;
};

/**
 * This function takes in the entire table and an array of headings
 * Basically filters out data
 * @param {*} parsedTableData all table data
 * @param {*} headings headings that will be mapped over
 */
const mapHeadingsToData = (parsedTableData, headings) => {
  const mappedHeadings = {};
  const finalDisplayData = [];
  for (const key of headings) {
    const mappedHeading = vehicleTableMapper.get(key);
    mappedHeadings[mappedHeading] = mappedHeading;
  }
  for (const vehicleData of parsedTableData) {
    // Set unique id of final data as its separate to headings
    const extractedVehicle = {
      uniqueId: vehicleData.uniqueId,
    };
    for (const [key] of Object.entries(mappedHeadings)) {
      extractedVehicle[key] = vehicleData[key];
    }
    finalDisplayData.push(extractedVehicle);
  }
  return finalDisplayData;
};

/**
 * This sorts the data cheapest first.
 * @param {*} displayData data to be displayed
 */
const sortByPrice = (displayData) => {
  const sortedData = displayData
    .sort((a, b) => ((parseFloat(a.RateTotalAmount) > parseFloat(b.RateTotalAmount))
      ? 1 : -1));
  return sortedData;
};

export {
  parseCarTableData,
  mapHeadingsToData,
  sortByPrice,
};
