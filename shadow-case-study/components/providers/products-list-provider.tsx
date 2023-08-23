'use client'

import { Product } from '@/types'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Input } from '../ui/input'
import Image from 'next/image'
import Card from '../ui/card'

const ProductsListProvider = () => {
  const [productsList, setProductsList] = useState<Product[]>([])
  const [searchValue, setSearchValue] = useState<string>("")
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])


  const { isLoading, isError } = useQuery({
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
      {isLoading===true ? "Loading" : (
        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product, index) => (
              <li key={index}>
                  <Link href={`/product/${product.productId}`}>
                      <Card product={product}/>
                  </Link>
              </li>
            ))}
        </ul>
      )}
      
      {
        (isLoading===false && filteredProducts.length===0) ?? "No product"
      }
    </>
  )
}

export default ProductsListProvider
