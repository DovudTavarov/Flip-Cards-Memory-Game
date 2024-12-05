import { useDispatch, useSelector } from "react-redux";
import { cardClick } from "../redux/gameSlice";

const SingleCard = ({ card, flipped }) => {
  const dispatch = useDispatch();

  const { cardsDisabled } = useSelector((state) => state.game);
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img src={card.src} alt="card front" className="front" />
        <img
          onClick={() => {
            if (!cardsDisabled) {
              dispatch(cardClick(card));
            }
          }}
          src="/img/cover.png"
          alt="card back"
          className="back"
        />
      </div>
    </div>
  );
};

export default SingleCard;
