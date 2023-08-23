import { Product } from "@/types"
import { AiFillStar } from "react-icons/ai"
interface CardProps {
    product: Product;
}

const Card : React.FC<CardProps>= ({ product }) => {
    const roundedRating = product?.rating ? Number(product.rating).toFixed(1) : '';

  return (
    <>
        <img
        src={product?.image450 ?? ""}
        className='w-full'
        alt={`Picture of ${product?.displayName}`}
        />
        <div className="flex flex-col m-6 space-y-3">
            <div className="flex flex-col space-y-1">
                <span className="display-name overflow-hidden whitespace-nowrap overflow-ellipsis font-semibold text-lg">{product?.displayName}</span>
                <span className="display-name overflow-hidden whitespace-nowrap overflow-ellipsis text-md text-neutral-500">{product?.brandName}</span>
            </div>
           
            <span className="font-semibold text-md">{
            product!.currentSku?.listPrice !== undefined && product!.currentSku?.listPrice !== ""
            ? product!.currentSku?.listPrice : "-- --"}
            </span>
            <div className="flex items-center space-x-2">
                <span className="">{product?.rating}</span>
                <AiFillStar/>
            </div>
        </div>
        
    </>
  )
}

export default Card
