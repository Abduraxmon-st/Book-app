type StarType = "full" | "half" | "empty";

export const getStarsFromRating = (rating: number): StarType[] => {
  const stars: StarType[] = [];

  const safeRating = Math.min(Math.max(rating, 0), 10);

  const fullStars = Math.floor(safeRating);
  const hasHalfStar = safeRating - fullStars >= 0.5;

  for (let i = 0; i < 10; i++) {
    if (i < fullStars) {
      stars.push("full");
    } else if (i === fullStars && hasHalfStar) {
      stars.push("half");
    } else {
      stars.push("empty");
    }
  }

  return stars;
};
