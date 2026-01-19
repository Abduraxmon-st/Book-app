type MainCardProps = {
  key?: number;
  className?: string;
};

export const MainCard = ({ key, className }: MainCardProps) => {
  return (
    <div key={key} className={`w-31.5 h-59 bg-gray-400 rounded-md ${className}`}>
    </div>
  )
}
