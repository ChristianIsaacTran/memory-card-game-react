import Header from "./header.jsx";
import ScoreBoard from "./scoreboard.jsx";
import CardContainer from "./cardContainer.jsx";
import "../styles/memoryGame.css";
import {useState } from "react";

export default function MemoryGame() {
  // useState() to update score in the ScoreBoard component by passing as prop, also give it to the cards to trigger setScore onClick event
  const [score, setScore] = useState({score: 0, highScore: 0});


  

  return (
    <div className="memory-game">
      <header className="header-container">
        <Header />
        <ScoreBoard currentScore={score}  />
      </header>
      <section className="game-card-container">
        <CardContainer updateScore={setScore} />
      </section>
    </div>
  );
}
