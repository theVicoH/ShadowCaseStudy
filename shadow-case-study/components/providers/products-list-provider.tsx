'use client'

import { Product } from '@/types'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

const ProductsListProvider = () => {
    const [productsList, setProductsList] = useState<Product[]>([])
    const { data } = useQuery({
      queryKey: ['list'],
      queryFn: async () => {
        const response = await axios.get('/api/product/list')
        return response.data
      },
      onSuccess: (data) => {
        setProductsList(data)
      }
    })
    useEffect(()=>{
      console.log(productsList)
    }, [productsList])
  return (
    <>
        <ul className="space-y-6">
            {productsList.map((product, index) => (
                <li key={index} className="bg-red-200">
                    <Link href={`/product/${product.productId}`}>
                        {product?.brandName}
                    </Link>
                </li>
            ))}
        </ul>
    </>
  )
}

export default ProductsListProvider
