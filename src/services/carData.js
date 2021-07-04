async function retrieveCarData() {
    const url = 'http://www.cartrawler.com/ctabe/cars.json';
    try {
        const response = await fetch(
            url, {
            mode: 'cors'
        });
        const carData = await response.json();
        if (!carData) {
            throw new Error('Car data not found :(');
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