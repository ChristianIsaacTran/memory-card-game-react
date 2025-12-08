import Header from "./header.jsx";
import ScoreBoard from "./scoreboard.jsx";
import CardContainer from "./cardContainer.jsx";

export default function MemoryGame() {
  return (
    <div className="memory-game">
      <header className="header-container">
        <Header />
        <ScoreBoard />
      </header>
      <section className="game-card-container">
        <CardContainer />
      </section>
    </div>
  );
}
