import { Product } from "@/types"

interface CardProps {
    product: Product;
}

const Card : React.FC<CardProps>= ({ product }) => {
    console.log(product)
  return (
    <>
        <img
        src={product?.image450 ?? ""}
        className='w-full'
        alt={`Picture of ${product?.displayName}`}
        />
        <div className="flex flex-col m-4 bg-red-500">
            <span className="text-lg font-semibold">{product?.displayName}</span>
            <span className="">{product?.brandName}</span>
            <span>{
            product!.currentSku?.listPrice !== undefined && product!.currentSku?.listPrice !== ""
            ? product!.currentSku?.listPrice : "-- --"}
            </span>
            {product?.rating}
        </div>
        
    </>
  )
}

export default Card
