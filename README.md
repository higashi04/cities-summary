# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `App.js`
App.js is the entry point, rendered within index.js. Here we have two components: Header and Body.

### `Header.jsx`
A simple functional component that renders a header element consisting only of an image.

### `Body.jsx`
This is where most of our app renders the components. It takes a ToasterMessage, a toaster message component native from Bootstrap, CityBtn which consist in buttons rendered from the cities state, and PromptText
which is made of the result of the query made to OpenAI 's GPT-3 API. 

This component renders locally an input type of text, a label, and a button that takes an svg to show a small picture as text, these work as a search bar that require at least three inputted characters to send a get request to Geo Ciites API, then the result is stored into the cities state and used to generate n number of buttons.

Body.jsx uses useState hook for keeping track of the clicked button and properly render a small paragraph pertaining the user's selection, as well as a MapBox component which shows a pin on the map regarding the user's selection as well.

There are two error catching processes included: one is used to validate whether the text inputted into the search bar is made up only of letters. To achieve this result a regex function is implemented and it runs
in two different moments: the first one is upon entering the text, and the other one should the user still decide to click the search button without correcting the inputted value.
The second error catching process takes place when searching for the cities on the Geo Cities API, should the HTTP call fail or produce zero results an error is thrown.

### `CityBtn.jsx`
It renders a div styled like a button. The text consists of the concatenated city and region  names passed as props. When clicked, this component makes a HTTP call to OpenAI API
and gets a reponse containing  information about each city from OpenAI's GPT-3.5 API. Then props drilling techniques are performed to send the HTTP result back to Body.jsx.

### `PromptText.jsx`
This component started out as a simple paragraph containig only the resulting OpenAI query, but it was expanded to contain the MapBio.jsx component as well, since both depend on which button the user clicks.

### `MapBio.jsx`
This component is made out of the react-mapbox-gl npm package. It makes an API call to mapbox servers to render a map on the screen. The component takes both longitude and latitude coordinates (provided by GeoDB Cities API) to put a pin on the map that corresponds to the provided coordinates. The pin consits of a Marker.jsx component, which takes a Marker component from the react-mapbox-gl package.# cities-summary
