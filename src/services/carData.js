async function retrieveCarData() {
    // modify the url to work with aws amplify as it is automatically https.
    // Another way to deal with this would be, to have a backend that handles any downstream apis
    const url = ' https://cors-everywhere.herokuapp.com/http://www.cartrawler.com/ctabe/cars.json';
    try {
        const response = await fetch(
            url, {
            mode: 'cors'
        });
        const carData = await response.json();
        if (!carData) {
            throw new Error('Car data not found');
        }
        return carData;
    } catch (error) {
        // To-do: Should fire off an appropriate error handler/error component
        console.log('Error: ', error ? error.message: 'unknown error');
        alert('Error: ', error ? error.message: 'unknown error');
    }

}

export {
    retrieveCarData
}