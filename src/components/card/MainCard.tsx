type MainCardProps = {
  key?: number;
  className?: string;
};

export const MainCard = ({ key, className }: MainCardProps) => {
  return (
    <div key={key} className={`w-full h-48.5 bg-gray-400 rounded-md ${className}`}>a
    </div>
  )
}
