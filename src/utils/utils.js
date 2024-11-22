const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

export function shuffleCardFn() {
  const shuffledCardArr = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => {
      return {
        ...card,
        id: Math.random().toString(36).slice(2),
      };
    });

  return shuffledCardArr;
}
