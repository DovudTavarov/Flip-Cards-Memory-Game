const SingleCard = ({ card, handleCardClick, flipped, isDisabled }) => {
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img src={card.src} alt="card front" className="front" />
        <img
          onClick={() => {
            if (!isDisabled) {
              handleCardClick(card);
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
