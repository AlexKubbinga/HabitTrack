import { useContext } from 'react';
import { AppContext } from '../App';
import StatCard from './statCard';

function CardsGrid() {
  const { averages } = useContext(AppContext);
  return (
    <div className="flex justify-center">
      <div className="p-10  grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-1 ">
        {averages.map((average) => (
          <StatCard key={average.name} average={average}></StatCard>
        ))}
      </div>
    </div>
  );
}

export default CardsGrid;
