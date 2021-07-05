# What is this?
I created a static react app as per the cartrawler requirements
Main work went into keeping the table reusable

Things to note: 

PropTypes entered to pass linter, normally - they'd be correct.

1. You can modify the carTable container headings array to change what is displayed in the table

2. The CustomTable component is reusable but unfinished, if you hover over the headers in the table they appear to be clickable/sortable - I didn't get this done in time so I left it there to show the attempt - but instead manually sorted the price from the container level from cheap -> expensive

3. the app is deployed here: https://master.d1khmn5cgxzqxt.amplifyapp.com/
via aws amplify and a ci/cd pipeline is setup
As soon as I merge to github master branch AWS picks it up and deploys

4. Example of the api response vs the cleaned version is in exampleData - i'm sure this could been done better to be honest. 

5. Improvements I would go for with more time

Make the site more reactive - the table doesn't reponse to changes in size that well - likewise page 2 is just ugly

Use next js - use SSR or so if the api response is always going to be static. This would remove the loading you can see at the start, also with next you get router for free no coding needed. Could use react-snapshot here too

Redux, Context or caching service to store data between route changes

Linter - should have done this earlier - git push failure when lint fails. Edit - This is done -> shoulda definitely done it earlier https://github.com/brian-geoghegan/react-demo/commit/89f5c68aef8ec31b87a77e3abc78d1bb3639a1f6#diff-eed1399c985840b07bf2835664456c3cd992f4c87587e26f83c2a62367ab1e48

unit testing - normally 90% min unit testing and use git pre-commit to fail git pushes

Error handler component - to display errors nicer

logger - need to keep an eye on logs

Legend and DisplayVehicle more generic - at the moment they're tightly coupled to the data

Create react app comes with babel and weppack behind the scenes, would look into that more as this cause issues when youi need to interact with them.



# Leaving these below for easy access

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
