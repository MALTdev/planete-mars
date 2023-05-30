export const getRandom = (min: number, max: number): number => {
  return Math.floor(getRandomFloat(min, max));
};

export const getRandomFloat = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};
