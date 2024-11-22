import { useEffect, useState } from "react";
import { shuffleCardFn } from "./utils/utils";
import SingleCard from "./components/SingleCard";
import "./App.css";

const App = () => {
  const [cards, setCards] = useState(shuffleCardFn());
  const [turns, setTurns] = useState(0);
  const [clickOne, setClickOne] = useState(null);
  const [clickTwo, setClickTwo] = useState(null);
  const [cardsDisabled, setCardsDisabled] = useState(false);
  const [timer, setTimer] = useState(0);

  const handleCardsShuffle = () => {
    setCards(() => shuffleCardFn());
    setTurns(0);
    setTimer(0);
  };

  const handleCardClick = (card) => {
    if (clickOne) {
      setClickTwo(card);
    } else {
      setClickOne(card);
    }
  };

  const resetCardClickFn = () => {
    setClickOne(null);
    setClickTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setCardsDisabled(false);
  };

  useEffect(() => {
    if (clickOne && clickTwo) {
      setCardsDisabled(true);
      if (clickOne.src === clickTwo.src) {
        console.log("cards match");
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === clickOne.src) {
              return {
                ...card,
                matched: true,
              };
            }

            if (card.src === clickTwo.src) {
              return {
                ...card,
                matched: true,
              };
            }

            return {
              ...card,
            };
          });
        });
      } else {
        console.log("cards DO NOT match");
      }
      setTimeout(() => {
        resetCardClickFn();
      }, 1000);
    }
  }, [clickOne, clickTwo]);

  useEffect(() => {
    let intervalId;

    if (timer < 30) {
      intervalId = setTimeout(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }

    return () => {
      clearTimeout(intervalId);
    };
  }, [timer]);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={handleCardsShuffle}>New Game</button>
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
        {cards.map((card) => {
          return (
            <SingleCard
              key={card.id}
              card={card}
              handleCardClick={handleCardClick}
              flipped={card === clickOne || card === clickTwo || card.matched} // true
              isDisabled={cardsDisabled}
            />
          );
        })}
      </div>
      <p>Number of turns: {turns}</p>
    </div>
  );
};

export default App;
