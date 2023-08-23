import { Skeleton } from "../ui/skeleton"

const LoadingProductsList = () => {
    const num = 6;
  return ( 
    <div className="grid grid-cols-1 gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: num }, (_, index) => (
            <Skeleton key={index} className="h-[590px]" />
        ))}
    </div>
  )
}

export default LoadingProductsList
