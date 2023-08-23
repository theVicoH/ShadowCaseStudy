'use client'

import { ProductDetails } from "@/types"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { Button } from "../ui/button"
import Container from "../ui/container"
import { AiFillStar } from "react-icons/ai"



const ProductDetailsProvider = ({productId} : {productId : string}) => {
    const [productDetails, setProductDetails] = useState<ProductDetails>()
    
    const roundedRating = productDetails?.rating ? Number(productDetails.rating).toFixed(1) : '';
    
    useQuery({
        queryKey: ['details'],
        queryFn: async () => {
          const response = await axios.get('/api/product/details',{
            params:{
                productId: productId
            }
          })
          return response.data
        },
        onSuccess: (data) => {
            setProductDetails(data)
        }
      })
      useEffect(()=>{
        console.log(productDetails)
      }, [productDetails])
    return (
        <div className="w-screen h-screen">
          <Container className="w-full h-full">
            <div className="h-full w-full grid md:grid-cols-2">
              <div className="w-full h-full flex items-center pr-10">
                <img src={productDetails?.currentSku?.skuImages?.image300} alt={productDetails?.displayName} className="w-full aspect-square" />
              </div>
             
              <div className="w-full h-full flex flex-col pt-40 pl-10 space-y-10 md:order-1">
                <Link href="/">
                  <Button variant="outline">Back</Button>
                </Link>
                <div className="flex flex-col space-y-6 ">
                  <div className="flex flex-col space-y-2">
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{productDetails?.displayName}</h3>
                    <span className="display-name overflow-hidden whitespace-nowrap overflow-ellipsis text-md text-neutral-500" >{productDetails?.brand?.displayName}</span>
                    
                  </div>
                  
                  <div className="flex justify-between">
                      <span className="font-semibold text-md">{
                      productDetails?.currentSku?.listPrice !== undefined && productDetails?.currentSku?.listPrice !== ""
                      ? productDetails?.currentSku?.listPrice : "-- --"}
                      </span>
                      <div className="flex items-center space-x-2">
                          <span className="">{roundedRating}</span>
                          <AiFillStar/>
                      </div>
                  </div>
                </div>
                
                <span>{productDetails?.quickLookDescription}</span>
              </div>
            </div>
          </Container>

        </div>
    )
}

export default ProductDetailsProvider
