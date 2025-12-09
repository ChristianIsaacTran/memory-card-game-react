import "../styles/card.css";
import testImage from "../assets/testImage.png";

/*
    get description and image from 
    useEffect() with fetch from an API 
    of my choice. I can also import 
    local images for testing in react and 
    using them inside JSX by directly importing 
    them with a name if needed, then using 
    javascript brackets inside src={}
*/

export default function Card() {
  return (
    <li>
      <img className="test-image" src={testImage} alt="" />
      <p>Something</p>
    </li>
  );
}
