import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SingleCard from "./components/SingleCard";
import "./App.css";
import {
  incrementTimer,
  matchCards,
  resetClicks,
  setCardsDisabled,
  shuffleCards,
} from "./redux/gameSlice";

const App = () => {
  const dispatch = useDispatch();
  const { cards, turns, clickOne, clickTwo, timer } = useSelector(
    (state) => state.game
  );

  useEffect(() => {
    if (clickOne && clickTwo) {
      dispatch(setCardsDisabled(true));

      if (clickOne.src === clickTwo.src) {
        console.log("cards match");
        dispatch(matchCards());
      } else {
        console.log("cards DO NOT match");
      }

      setTimeout(() => {
        dispatch(resetClicks());
      }, 1000);
    }
  }, [clickOne, clickTwo, dispatch]);

  useEffect(() => {
    let intervalId;

    if (timer < 30) {
      intervalId = setTimeout(() => {
        dispatch(incrementTimer());
      }, 1000);
    }

    return () => {
      clearTimeout(intervalId);
    };
  }, [timer, dispatch]);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={() => dispatch(shuffleCards())}>New Game</button>
      <div className="wrapper">
        <progress
          className="progress"
          id="file"
          value={timer}
          max="30"
        ></progress>
      </div>
      {timer === 30 && <h1>Game Over!</h1>}
      <div className={`card-grid ${timer === 30 && "times-up"}`}>
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            flipped={card === clickOne || card === clickTwo || card.matched}
          />
        ))}
      </div>
      <p>Number of turns: {turns}</p>
    </div>
  );
};

export default App;
