'use client'

import { Product } from '@/types'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Input } from '../ui/input'

const ProductsListProvider = () => {
  const [productsList, setProductsList] = useState<Product[]>([])
  const [searchValue, setSearchValue] = useState<string>("")
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])


  const { isError } = useQuery({
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
    setFilteredProducts(
      productsList.filter((product) =>
          product.brandName?.toLowerCase().includes(searchValue.toLowerCase()) ||
          product.displayName?.toLowerCase().includes(searchValue.toLowerCase())
      )
    )
    console.log(productsList)
  }, [productsList, searchValue])

  if(isError){
    return(
        <p>Error with product List</p>
    )
  }
  return (
    <>
      <Input
        placeholder="Search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <ul className="space-y-6">
          {filteredProducts.map((product, index) => (
              <li key={index} className="bg-red-200">
                  <Link href={`/product/${product.productId}`}>
                      {product?.brandName}
                      {product?.displayName}
                  </Link>
              </li>
          ))}
      </ul>
    </>
  )
}

export default ProductsListProvider
