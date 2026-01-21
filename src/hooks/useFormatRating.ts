export const formatRating = (rating: number): string => {
  return `10/${(rating * 10).toFixed(1)}`;
};