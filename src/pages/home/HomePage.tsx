import { Hero } from '../../components/hero'
import { GenreSection, MightLikeSection, MostPopularSection } from '../../components/main'

export const HomePage = () => {
  return (
    <div>
      <Hero />
     <div className='w-full max-w-97.5 mx-auto pl-4'>
       <MostPopularSection />
       <MightLikeSection />
       <GenreSection />
     </div>
    </div>
  )
}
