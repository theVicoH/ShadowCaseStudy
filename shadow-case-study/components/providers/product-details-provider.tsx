'use client'

import { Product } from "@/types"
import axios from "axios"
import { useState } from "react"
import { useQuery } from "react-query"


const ProductDetailsProvider = () => {
    const [productDetails, setProductDetails] = useState<Product>()
    
    const { data } = useQuery({
        queryKey: ['data'],
        queryFn: async () => {
          const response = await axios.get('/api/product/list')
          return response.data
        },
        onSuccess: (data) => {
            setProductDetails(data)
        }
      })
    return (
        <>
        
        </>
    )
}

export default ProductDetailsProvider
