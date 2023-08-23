'use client'

import { Product } from '@/types'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Input } from '../ui/input'
import Card from '../ui/card'
import Container from '../ui/container'
import LoadingProductsList from '../loading/loading-products-list'


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
  }, [productsList, searchValue])

  if(isError){
    return(
        <p>Error with product List</p>
    )
  }
  return (
    <>
      <div className='border-b pb-6 pt-20'>
        <Container>
          <div className=' flex flex-col space-y-2 md:grid md:grid-cols-8'>
            <h2 className="col-span-6 croll-m-20 pb-2 text-3xl font-semibold tracking-tight t">Sephora</h2>
            <Input
              placeholder="Search"
              value={searchValue}
              className='col-span-2'
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>

        </Container>
      </div>
      <Container>
        {isLoading===true ? <LoadingProductsList/> : (
          <ul className="grid grid-cols-1 gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-3">
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
      </Container>

    </>
  )
}

export default ProductsListProvider
