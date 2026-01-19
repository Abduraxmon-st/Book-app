import { MainCard } from '../card'

export const HeaderCarousel = () => {
  return (
    <div className="w-full h-max absolute top-0">
      <div className="grid overflow-x-auto mt-10">
        <div className='flex gap-4'>
          {[...Array(6)].map((_, index) => (
            <MainCard key={index} className="flex-1" ></MainCard>
          ))}
        </div>
      </div>
    </div>
  )
}
