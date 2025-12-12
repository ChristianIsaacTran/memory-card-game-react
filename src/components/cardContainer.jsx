import Card from "./card.jsx";
import "../styles/cardContainer.css";
import { useState, useEffect } from "react";

export default function CardContainer({ updateScore }) {
  //useState to hold API data. each object inside the useState is going to have a name and a src image link.
  const [fortniteData, setFortniteData] = useState([]);

  //utility function: used to extract the name and image src link and returned as an object
  const processAPIData = (inputJSON) => {
    const tempObj = {
      name: inputJSON.data.name,
      imageSrc: inputJSON.data.images.smallIcon,
      clickedOn: false,
      uniqueID: crypto.randomUUID(),
    };

    return tempObj;
  };

  // utility function: variant of the processAPIData function to get the variant president blanka from API
  const processBlankaData = (inputJSON) => {
    const tempObj = {
      name: `President ${inputJSON.data.name}`,
      imageSrc: inputJSON.data.variants["0"].options["1"].image,
      clickedOn: false,
      uniqueID: crypto.randomUUID(),
    };

    return tempObj;
  };

  // attempting to use fortnite API to get cosmetic data with useEffect() to ping the api data, store data inside the useState()
  useEffect(() => {
    try {
      /*
        fetchRequestFunc() makes a fetch request to the api, then processes the api data JSON and extracts 
        the name and the item image src link, then returns an object with those two properties.

        --note: in fortnite, every cosmetic item has an itemID attached to it.
        use the fortnite wiki to lookup any battle royale (br) item id
        and insert it into the function.
      */
      const fetchRequestFunc = async (
        itemID,
        dataProcessCallback = processAPIData
      ) => {
        const response = await fetch(
          `https://fortnite-api.com/v2/cosmetics/br/${itemID}`
        );
        const itemDataJSON = await response.json();
        const processedData = dataProcessCallback(itemDataJSON);

        // for now, check to see if JSON is even being queried correctly
        return processedData;
      };

      // call fetchRequest for the 12 items from fortnite, insert them into the useState() obj to use inside JSX
      const insertDataToState = async () => {
        const jonesyData = await fetchRequestFunc(
          "CID_989_Athena_Commando_M_ProgressiveJonesy"
        );

        const hopeData = await fetchRequestFunc(
          "Character_VoidRedemption_Rebel"
        );

        const peelyData = await fetchRequestFunc(
          "CID_349_Athena_Commando_M_Banana"
        );

        const presidentBlankaData = await fetchRequestFunc(
          "CID_A_384_Athena_Commando_M_Rumble",
          processBlankaData
        );

        const mikuData = await fetchRequestFunc("Character_JadeTowelGloss");

        const shifuData = await fetchRequestFunc(
          "CID_509_Athena_Commando_M_WiseMaster"
        );

        const spidermanData = await fetchRequestFunc(
          "CID_A_293_Athena_Commando_M_ParallelComic"
        );

        const shoheiData = await fetchRequestFunc("Character_VelvetDeskCam");

        const hinataData = await fetchRequestFunc(
          "CID_A_435_Athena_Commando_F_Ensemble"
        );
        const saloneData = await fetchRequestFunc(
          "CID_A_113_Athena_Commando_F_Innovator"
        );

        const agelessData = await fetchRequestFunc("Character_Citadel");

        const shaggyData = await fetchRequestFunc("Character_FluteLamp");

        // make an array of objects and send that into the useState() for jsx rendering
        const tempArr = [
          jonesyData,
          hopeData,
          peelyData,
          presidentBlankaData,
          mikuData,
          shifuData,
          spidermanData,
          shoheiData,
          hinataData,
          saloneData,
          agelessData,
          shaggyData,
        ];

        setFortniteData(tempArr);
      };

      insertDataToState();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // rendering: used to make multiple card components based on the fortniteData and pass the data as props. returns an array of components to dynamically render
  const makeCards = () => {
    const tempArr = fortniteData.map((gameCharacter) => {
      // make sure to assign a key to each jsx component since we are using them in list and the key will help react remember which component is which inside the list
      return (
        <Card
          itemName={gameCharacter.name}
          itemPictureSrc={gameCharacter.imageSrc}
          key={gameCharacter.uniqueID}
          clickHandler={cardClickHandler}
        />
      );
    });

    return tempArr;
  };

  // utility: used to shuffle the order of the cards in the unordered list around when the user scores a point
  const cardShuffle = () => {
    /*
      reworked setFortniteData() call to use previousFortniteData in the callback to 
      keep up to date with updated calls. Without previousFortniteData, the cardShuffle() would 
      use non-updated data on the current render, and would copy non-updated data to the tempArr.
    */
    setFortniteData((previousFortniteData) => {
      // copy fortniteData into a tempArray
      const tempArr = [...previousFortniteData];

      // use fisher yates shuffle algorithm to swap data positions within the array
      for (let i = tempArr.length - 1; i > 0; i = i - 1) {
        // generate random index, then swap position with current "end" of the array
        let randomIndex = Math.floor(Math.random() * (i + 1));
        let tempObj = tempArr[i];
        tempArr[i] = tempArr[randomIndex];
        tempArr[randomIndex] = tempObj;
        
      }

      // once shuffling is done, trigger re-render. makeCards() should re-render with the new order
      return tempArr;
    });
  };

  /*
  handler: when the user clicks on a character card, it triggers this handler which checks to see if the 
  character's object data inside of fortniteData (useState) has an property of clickOn, which is a boolean

  clickedOn = an object property that marks if the character has already been clicked or not

  if a card has already been clicked on, set the score to 0 and reset all clickedOn properties

  if a card has NOT been clicked on, use updateScore to tell the upper useState "score" that the user has successfully
  scored a point 
  */
  const cardClickHandler = (itemName) => {
    // find current card data inside of fortniteData and check if clickedOn boolean
    const foundData = fortniteData.find(
      (fortniteCharacter) => fortniteCharacter.name === itemName
    );

    // if the card HASN'T been clicked before, add 1 to score and update clicked character data's clickedOn boolean to true and shuffle cards in list
    if (foundData.clickedOn === false) {
      // add score by 1, make sure to use previousScore in the setState callback to use previous render's score
      updateScore((previousScore) => {
        return { ...previousScore, score: previousScore.score + 1 };
      });

      // update the current card's clickedOn property, then update the previousFortniteData with the new updated fortniteData (but with the changed clickedOn boolean)
      setFortniteData((previousFortniteData) => {
        return previousFortniteData.map((fortniteCharacter) => {
          if (fortniteCharacter.name === itemName) {
            return { ...fortniteCharacter, clickedOn: true };
          }
          return fortniteCharacter;
        });
      });

      // trigger a card shuffle upon successful point
      cardShuffle();

      // if the card HAS been clicked on before, reset score to 0 and re-update all clickedOn to false
    } else if (foundData.clickedOn === true) {
      // reset score upon lose, and check to see if score is greater than highscore, overwrite if true
      updateScore((previousScore) => {
        if (previousScore.score > previousScore.highScore) {
          return { score: 0, highScore: previousScore.score };
        }

        return { ...previousScore, score: 0 };
      });

      // reset fortniteData upon lose, turn all of the clickedOn boolean to false
      setFortniteData((previousFortniteData) => {
        return previousFortniteData.map((fortniteCharacter) => {
          return { ...fortniteCharacter, clickedOn: false };
        });
      });
    }
  };

  // default loading render if fortniteData has no api data yet
  if (fortniteData.length === 0) {
    return <h1>Loading fortnite API...</h1>;
  }

  // data loaded render if fortniteData obtained api data. INITIAL LOAD
  return (
    <ul className="card-container">
      {/* make a bunch of grid card components here */ makeCards()}
    </ul>
  );
}
