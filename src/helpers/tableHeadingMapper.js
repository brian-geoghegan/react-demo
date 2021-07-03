/**
 * These maps are used to map headings over to values in the data response
 * Keeps the table customisable for reuse.
 * Here we can specify what heading we want and what data from the response to display
 */

const vehicleTableMapper = new Map();

vehicleTableMapper.set('Vehicle', 'Name');
vehicleTableMapper.set('Status', 'Status');
vehicleTableMapper.set('Image', 'PictureURL');
vehicleTableMapper.set('Cost', 'RateTotalAmount');
vehicleTableMapper.set('Vendor', 'VendorName');
vehicleTableMapper.set('No of Doors', 'DoorCount');
vehicleTableMapper.set('Drive Type', 'DriveType');
vehicleTableMapper.set('Transmission Type', 'TransmissionType');
vehicleTableMapper.set('Fuel Type', 'FuelType');
vehicleTableMapper.set('Estimated Cost', 'EstimatedTotalAmount');

export default vehicleTableMapper;