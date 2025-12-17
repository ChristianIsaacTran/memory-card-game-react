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

# potential components and structure idea

- it looks like the memory game example has a couple of basic features it keeps track of: 
    1. order of the cards
    2. a main card container component in a grid layout
    3. each card has it's own picture and descriptor (like a character name or something)
    4. a current score and a highscore
    5. title of the game
    6. game directions and objectives
    7. when you click a card, it shuffles the card's order within the grid randomly
    8. when you click on a card, the only time it counts as a point
    is if you dont click on a card more than once (this is a the rules that the example went with)
    9. The score resets if the player fails and clicks the same card twice, resetting the game
 

# host is netlify, has automatic publish on push

https://memory-fortnite-react.netlify.app
