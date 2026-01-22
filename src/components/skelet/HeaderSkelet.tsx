export const HeaderSkelet = ({ key, className }: { key?: number; className?: string }) => {
  return (
    <div key={key} className={`w-[calc(180px/1.4)] overflow-hidden ${className}`}>
      <div className="bg-gray-200 rounded-md w-full h-48 animate-pulse"></div>
      <div className="mt-2">
        <div className="bg-gray-200 rounded-md w-full h-4 animate-pulse"></div>
        <div className="bg-gray-200 rounded-md w-1/2 mx-auto h-3 mt-1 animate-pulse"></div>
      </div>
    </div>
  )
}
