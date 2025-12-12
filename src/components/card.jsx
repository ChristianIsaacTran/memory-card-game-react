import "../styles/card.css";
// import testImage from "../assets/testImage.png";

/*
    get description and image from 
    useEffect() with fetch from an API 
    of my choice. I can also import 
    local images for testing in react and 
    using them inside JSX by directly importing 
    them with a name if needed, then using 
    javascript brackets inside src={}
*/

/*
  passed API information through props from cardContainer.jsx parent component to use 
  in jsx of card.
*/
export default function Card({
  itemName,
  itemPictureSrc,
  clickHandler
}) {

  // insert current card itemName for use inside clickHandler callback 
  const itemNameWithClickHandler = () => {
    clickHandler(itemName)
  }
  
  return (
    <div className="card-hover-container" onClick={itemNameWithClickHandler}>
      <li className="card">
        <img className="test-image" src={itemPictureSrc} alt="" />
        <p className="skin-name">{itemName}</p>
      </li>
    </div>
  );
}

// note to self: fix the jitter on :hover pseudo class animation
