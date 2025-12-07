# purpose of this repo

- this is right after learning about the 
useEffect hook in react where we can use the 
useEffect to manage and create side effects which are effects that happen outside of react's rendering (like API calls, DOM manipulation (like document.create()), event listeners, and anything that interacts with the outside world).

- In this project we are creating a card memory game, keeping track of highest score and also getting images from an API (giphy or pokemon API, or any free API to get the images and text) which would require it to be inside a useEffect.

- From the last lesson, useEffects are made up of 3 parts: 

useEffect(()=> {

//side effect goes here


//cleanup function is used to close the side effect



//a second parameter, an array called the dependency array which controls when this useEffect activates based on if the variables inside the dependency array change at all.
}, []);