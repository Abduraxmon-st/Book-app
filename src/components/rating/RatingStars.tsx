import { HalfStarIcon, StarIcon } from "../../assets/icons";
import { getStarsFromRating } from "../../hooks";

const EmptyStar = () => (
  <StarIcon className="text-descColor/50 size-" />
);

export const RatingStars = ({ rating }: { rating: number }) => {
  const stars = getStarsFromRating(rating);

  return (
    <div className="flex items-center gap-1">
      {stars.map((type, index) => {
        if (type === "full") return <StarIcon className="text-mainColor size-" key={index} />;
        if (type === "half") return <div className="relative flex items-center">
          <HalfStarIcon className="text-mainColor size-" key={index} />
          <HalfStarIcon className="text-descColor/50 absolute -scale-x-100 ml-px size-" key={index} />
        </div>;
        return <EmptyStar key={index} />;
      })}
    </div>
  );
};
