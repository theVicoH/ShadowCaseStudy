'use client'

import { ProductDetails } from "@/types"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { Button } from "../ui/button"
import Container from "../ui/container"



const ProductDetailsProvider = ({productId} : {productId : string}) => {
    const [productDetails, setProductDetails] = useState<ProductDetails>()
    
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
        <div className="w-screen h-scr">
          <Container>
            <div className="h-full w-full grid lg:grid-cols-2">
              <img src={productDetails?.currentSku?.skuImages?.image300} alt={productDetails?.displayName} className="w-full aspect-square" />
              <div className="bg-red-400">
                <Link href="/">
                  <Button variant="outline">Back</Button>
                </Link>
                {productDetails?.brand?.displayName}
                {productDetails?.displayName}
                {productDetails?.currentSku?.listPrice}
                {productDetails?.rating}
                {productDetails?.quickLookDescription}
                {productDetails?.longDescription}
              </div>
            </div>
          </Container>

        </div>
    )
}

export default ProductDetailsProvider
