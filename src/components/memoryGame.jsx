import Header from "./header.jsx";
import ScoreBoard from "./scoreboard.jsx";
import CardContainer from "./cardContainer.jsx";
import "../styles/memoryGame.css";
import { useState, useRef, useEffect } from "react";
import peelyGif from "../assets/peelytheshame.gif";

export default function MemoryGame() {
  // useState() to update score in the ScoreBoard component by passing as prop, also give it to the cards to trigger setScore onClick event
  const [score, setScore] = useState({ score: 0, highScore: 0 });


  // useRef() hook used to reference the dialog element in useEffect()
  const dialogRef = useRef(null);

  // useEffect() that checks everytime score changes if score is 12. If it is, then display the modal
  useEffect(() => {

    if (score.score === 12 && dialogRef.current) {
      dialogRef.current.showModal();
      const modalContent = document.querySelector(".modal-content");
      modalContent.className="modal-content open";
    } else {
      const modalContent = document.querySelector(".modal-content");
      modalContent.className="modal-content";
    }


  }, [score]);


  const closeModalHandler = () => {
    dialogRef.current.close();

  };

  return (
    <div className="memory-game">
      <dialog ref={dialogRef} className="win-modal">
        <div className="modal-content">
        <h1>YOU GOT ALL 12 POINTS! VICTORY ROYALE!</h1>
        <img className="peely-gif" src={peelyGif} alt="" />
        <h1>Re-click any image to reset game!</h1>
        <button className="modal-close" type="button" onClick={closeModalHandler}>
          Close
        </button>
        </div>
      </dialog>
      <header className="header-container">
        <Header />
        <ScoreBoard currentScore={score} />
      </header>
      <section className="game-card-container">
        <CardContainer updateScore={setScore} />
      </section>
    </div>
  );
}
