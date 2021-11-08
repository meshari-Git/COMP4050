# COMP4050 Project
- [Meshari Algethami](https://www.linkedin.com/in/meshari-algethami-6076671b3/)
- [Benjamin Fricke](https://www.linkedin.com/in/ben-fricke/)
- [Maleon Johan-Mosi](https://www.linkedin.com/in/leon-jm/)
- [Malachi Mashiah](https://www.linkedin.com/in/malachi-mashiah/)
- [Jonah Skinner](https://www.linkedin.com/in/jonah-skinner/)

The [Trello board](https://trello.com/b/40TmiuF2/4050-project) for this project.

The [unit guide](https://unitguides.mq.edu.au/unit_offerings/129584/unit_guide) for COMP4050.

# File Structure
  ```
src/  
┣ assets/  
┃ ┣ css/  
┃ ┃ ┣ app.css  
┃ ┃ ┣ changeinfo.css  
┃ ┃ ┣ dashboard.css  
┃ ┃ ┣ homepage.css  
┃ ┃ ┣ index.css  
┃ ┃ ┣ jobpage.css  
┃ ┃ ┣ myjobpage.css  
┃ ┃ ┣ navbar.css  
┃ ┃ ┣ profile.css  
┃ ┃ ┣ sidebar.css  
┃ ┃ ┣ sidebarnav.css  
┃ ┃ ┗ userinfo.css  
┃ ┗ img/  
┃   ┣ cardTest.png  
┃   ┗ default-user.jpg  
┣ authentication/  
┃ ┗ apiindex.js  
┣ components/  
┃ ┣ JSX/  
┃ ┃ ┣ ChangeInfo.jsx  
┃ ┃ ┗ DataFill.jsx  
┃ ┣ ActiveListings.js  
┃ ┣ CurrentJobs.js  
┃ ┣ Footer.js  
┃ ┣ History.js  
┃ ┣ Info.js  
┃ ┣ Layout.js  
┃ ┣ MyJob.js  
┃ ┗ Profile.js  
┣ hooks/  
┃ ┣ DataRouter.js  
┃ ┣ NavBar.js  
┃ ┗ PrivateRoute.js  
┣ tests/  
┃ ┣ App.test.js  
┃ ┣ homePage.test.js  
┃ ┗ test.html  
┣ views/  
┃ ┣ DashBoardPage.js  
┃ ┣ HomePage.js  
┃ ┣ JobPage.js  
┃ ┣ Login.js  
┃ ┗ Register.js  
┣ App.js  
┣ config.js  
┣ index.js  
┗ serviceWorker.js
 ``` 
## Getting the Project Running

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm run server`

Runs the server of the app and you will be able to access the whole app from 
[http://localhost:3001](http://localhost:3001) to view it in the browser.



### `npm start`

Launches the Front-End on http://localhost:3006
The page will reload if you make edits.\
You will also see any lint errors in the console.
### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.