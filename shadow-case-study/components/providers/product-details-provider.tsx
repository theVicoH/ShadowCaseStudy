'use client'

import { Product } from "@/types"
import axios from "axios"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"


const ProductDetailsProvider = ({productId} : {productId : string}) => {
    const [productDetails, setProductDetails] = useState<Product>()
    
    const { data } = useQuery({
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
        <>
        
        </>
    )
}

export default ProductDetailsProvider
