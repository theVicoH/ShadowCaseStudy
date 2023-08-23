import { NextResponse } from 'next/server'
import axios from 'axios'

export const GET = async (request: Request) => {
    const options = {
        method: 'GET',
        url: 'https://sephora.p.rapidapi.com/products/list',
        params: {
          categoryId: 'cat150006',
          pageSize: '60',
          currentPage: '1'
        },
        headers: {
          'X-RapidAPI-Key': process.env.API_KEY,
          'X-RapidAPI-Host': 'sephora.p.rapidapi.com'
        }
    }
    try {
        const response = await axios.request(options);
        return NextResponse.json(
            response.data,
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            "Failed to fetch products",
            { status: 500 }
        )
    }

}