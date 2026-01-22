export const SearchSkelet = () => {
  return (
    <div className="grid gap-4">
      {
        [1, 2, 3].map((_, index) => (
          <div key={index} className="flex gap-4">
            <div className="w-11 h-15 bg-descColor/20 animate-pulse rounded-md" />
            <div className="flex flex-col justify-between w-full">
              <div className="w-full h-4 bg-descColor/20 animate-pulse rounded-sm" />
              <div className="w-1/2 h-4 bg-descColor/20 animate-pulse rounded-sm" />
              <div className="w-8 h-4 ml-auto bg-descColor/20 animate-pulse rounded-sm" />
            </div>
          </div>
        ))
      }
    </div>
  )
}
