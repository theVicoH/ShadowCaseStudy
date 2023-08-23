import { NextResponse } from 'next/server'
import axios from 'axios'

export const GET = async (request: Request) => {
    const url = new URL(request.url)
    const nextUrlParam = url.searchParams.get("productId")
    const options = {
        method: 'GET',
        url: 'https://sephora.p.rapidapi.com/products/detail',
        params: {
          productId: nextUrlParam,
          preferedSku: '2210607'
        },
        headers: {
          'X-RapidAPI-Key': process.env.API_KEY,
          'X-RapidAPI-Host': 'sephora.p.rapidapi.com'
        }
    };
    try {
        const response = await axios.request(options);
        return NextResponse.json(
            response.data,
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            "Failed to fetch products details",
            { status: 500 }
        )
    }

}