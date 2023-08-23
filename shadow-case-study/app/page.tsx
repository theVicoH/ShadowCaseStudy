'use client'
import axios from "axios";
import { useEffect } from "react";

export default function Home() {
  const options = {
    method: 'GET',
    url: 'https://sephora.p.rapidapi.com/products/list',
    params: {
      categoryId: 'cat150006',
      pageSize: '60',
      currentPage: '1'
    },
    headers: {
      'X-RapidAPI-Key': '73a94bf7e4msh29cf4d243723ab4p14f1fdjsnb92a96ef79ca',
      'X-RapidAPI-Host': 'sephora.p.rapidapi.com'
    }
  };
  const fetchProduct = async () => {
    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
    fetchProduct()
  }, [])
  return (
    <>
      Salut
    </>
  )
}
