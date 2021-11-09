<h1> Swap Street </h1>

<p>

SwapStreet is a Web application that allows for people who live locally to swap favours. Members
offer to do favours in exchange for other favours within a certain proximity to each other.
The app is aimed for people to get to know their neighbours through those interactions. Thus, not
only do they help each other, but also a happier local community is established.
    </p>
<p align="center">
    <img src="swapstreet.gif" alt="swapstreet"/>
</p>
  
# COMP4050 Project
- [Meshari Algethami](https://www.linkedin.com/in/meshari-algethami-6076671b3/)
- [Benjamin Fricke](https://www.linkedin.com/in/ben-fricke/)
- [Maleon Johan-Mosi](https://www.linkedin.com/in/leon-jm/)
- [Malachi Mashiah](https://www.linkedin.com/in/malachi-mashiah/)
- [Jonah Skinner](https://www.linkedin.com/in/jonah-skinner/)

The [Trello board](https://trello.com/b/40TmiuF2/4050-project) for this project.

The [unit guide](https://unitguides.mq.edu.au/unit_offerings/129584/unit_guide) for COMP4050.

# Deployment
[4050-SwapStreet-group-3](https://infinite-refuge-32502.herokuapp.com/)

# Technologies

<p align="left"> 
    <p>   <a href="https://reactnative.dev/" target="_blank"> <img src="https://reactnative.dev/img/header_logo.svg" alt="reactnative" width="40" height="40" /> </a>
      <a href="https://www.mongodb.com/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40" />
 <a href="https://expressjs.com" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40" /> </a>
  <a href="https://getbootstrap.com" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg" alt="bootstrap" width="40" height="40" /> </a> <a href="https://heroku.com" target="_blank"> <img src="https://www.vectorlogo.zone/logos/heroku/heroku-icon.svg" alt="heroku" width="40" height="40" /> </a>
</p>
    
# File Structure
  ```

📦COMP4050
 ┣ 📂public
 ┣ 📂server
 ┃ ┣ 📂config
 ┃ ┣ 📂controllers
 ┃ ┣ 📂models
 ┣ 📂src
 ┃ ┣ 📂assets
 ┃ ┃ ┣ 📂icons
 ┃ ┃ ┣ 📂img
 ┃ ┃ ┃ ┣ 📂splash
 ┃ ┃ ┣ 📂sass
 ┃ ┃ ┃ ┣ 📂abstracts
 ┃ ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📂layout
 ┃ ┃ ┃ ┣ 📂pages
 ┃ ┃ ┃ ┃ ┣ 📂createJob
 ┃ ┃ ┃ ┃ ┣ 📂profilePage
 ┃ ┃ ┃ ┃ ┗ 📂splash
 ┃ ┃ ┃ ┗ 📂vendors
 ┃ ┃ ┗ 📂scss
 ┃ ┣ 📂authentication
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂JSX
 ┃ ┃ ┣ 📂forms
 ┃ ┣ 📂hooks
 ┃ ┣ 📂services
 ┃ ┣ 📂tests
 ┃ ┣ 📂views
 ┣ 📜.env
 ┣ 📜.gitignore
 ┣ 📜.jshintrc
 ┣ 📜Project_Description.md
 ┣ 📜README.md
 ┣ 📜gulpfile.js
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜sendgrid.env
 ┗ 📜yarn.lock
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

## Deployment to Heroku 

### `git push heroku master`

Pushes the current code base to Heroku to be built and hosted. 
