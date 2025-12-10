import Card from "./card.jsx";
import "../styles/cardContainer.css";
import { useState, useEffect } from "react";
export default function CardContainer() {
  //useState to hold API data. each object inside the useState is going to have a name and a src image link.
  const [fortniteData, setFortniteData] = useState([]);

  //utility function: used to extract the name and image src link and returned as an object
  const processAPIData = (inputJSON) => {
    const tempObj = {
      name: inputJSON.data.name,
      imageSrc: inputJSON.data.images.smallIcon,
    };

    return tempObj;
  };

  // utility function: variant of the processAPIData function to get the variant president blanka from API
  const processBlankaData = (inputJSON) => {
    const tempObj = {
      name: `President ${inputJSON.data.name}`,
      imageSrc: inputJSON.data.variants["0"].options["1"].image,
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
        console.log(peelyData);

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
          key={crypto.randomUUID()}
        />
      );
    });

    return tempArr;
  };

  // default loading render if fortniteData has no api data yet
  if(fortniteData.length === 0) {
    return (<h1>Loading fortnite API...</h1>);
  }


  // data loaded render if fortniteData obtained api data
  return (
    <ul className="card-container">
      {/* make a bunch of grid card components here */ makeCards()}
    </ul>
  );
}
