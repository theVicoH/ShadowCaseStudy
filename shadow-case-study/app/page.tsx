'use client'

import axios from "axios"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"

export default function Home() {
  const [productsList, setProductsList] = useState([])
  const { data } = useQuery({
    queryKey: ['data'],
    queryFn: async () => {
      const response = await axios.get('/api/products/all')
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
      Salut
    </>
  )
}
