import "../styles/scoreboard.css";

/*
  score goes up whenever the user successfully clicks on an icon that hasn't been clicked before. 
  Resets score if user clicks the same image more than once.
*/
export default function ScoreBoard({currentScore }) {


  return (
    <div className="scoreboard-text-group">
      <h3 className="current-score">
        Current Score: {currentScore.score}
      </h3>
      <h3 className="high-score">High Score: {currentScore.highScore} </h3>
    </div>
  );
}
