'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

const ProductsListProvider = () => {
    const [productsList, setProductsList] = useState([])
    const { data } = useQuery({
      queryKey: ['data'],
      queryFn: async () => {
        const response = await axios.get('/api/products/list')
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
    <div>
      HEY
    </div>
  )
}

export default ProductsListProvider
