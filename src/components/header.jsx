import "../styles/header.css";

export default function Header() {
  return (
    <div className="header-text-group">
      <h1 className="game-title">Fortnite Memory</h1>
      <p className="directions">
        Get points by clicking on an image, but don't click on the same image
        more than once or else it's game over! Try to get 
        to 12 points!
      </p>
    </div>
  );
}
