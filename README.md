<p align='center'>
<img alt='loglo' src='https://images.frandroid.com/wp-content/uploads/2023/06/shadow-logo-gradient-resized.jpeg'>
<p>

<h1 align='center'>Shadow Case Study</h1>

<p align='center'>A Case Study with a call API from Rapid API.</p>
<p align='center'><a href="https://shadow-case-study.vercel.app/">https://shadow-case-study.vercel.app/</a></p>

<p align='center'>
<a href='#tech-stack'><strong>Tech Stack</strong></a> .
<a href='#runing-locally'><strong>Runing locally</strong></a> .
<a href='#documentation'><strong>Documentation</strong></a>
</p>
<br/>

## Tech Stack

- [Next.js](https://nextjs.org) framework
- [Typescript](https://www.typescriptlang.org) language
- [shadcn/ui](https://ui.shadcn.com)
  - Styling with [Tailwind CSS](https://tailwindcss.com)
  - [Radix UI](https://www.radix-ui.com) for headless component primitives
  - Icons from [React Icons](https://react-icons.github.io/react-icons)
- [React-Query](https://tanstack.com/query/v3/) For the cache API

## Runing locally

You will need to use the environement variables [defined in `.env.example`](.env.example) and change `API_KEY` with your API from [Rapid API](https://rapidapi.com/apidojo/api/sephora). After that, you have to rename the `.env.example` file in to `.env`.

```bash
npm i
npm run dev
```
> npm i for install all dependencies<br>
> npm run dev for starte server

**Your app should now be running on [localhost:3000](http://localhost:3000/)**

## Documentation

### API

We have this snippets of code from rapid API:

```ts
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
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}
```

We just need to change this snippets of code to the api root `app/api/product` to make a GET a response with NextResponse.


You will also see that in the root we have two child root:
- List
- Details

When we setup the GET response, we can make the call api with react-query and axios.

```ts
const [productsList, setProductsList] = useState<Product[]>([])

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
```

And now, we have the all the productList and Voila.

### Input Sort

For the sorting I used the Input from shad cn that look the event and set the value.
```ts
const [searchValue, setSearchValue] = useState<string>("")
const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

<Input
    placeholder="Search"
    value={searchValue}
    className='col-span-2'
    onChange={(e) => setSearchValue(e.target.value)}
/>
```
After that, we just need to local compare the product brand and displayName with the search value, and put in a new array filteredProducts.

```ts
useEffect(()=>{
setFilteredProducts(
    productsList.filter((product) =>
        product.brandName?.toLowerCase().includes(searchValue.toLowerCase()) ||
        product.displayName?.toLowerCase().includes(searchValue.toLowerCase())
    )
)
}, [productsList, searchValue])
```

### Product Details

When we click to a products, we will redirect to the product details of the product. To do that we use the component `Link` provide by Next and we give him the productId.
```ts
<Link href={`/product/${product.productId}`}>
```
To get the `id` we just need to rename the folder as `[id]` and put this code in page.tsx:
```ts
import ProductDetailsProvider from "@/components/providers/product-details-provider"

interface ProductParams {
    params: {
      id: string
    }
}

const Page : React.FC<ProductParams> = ({ params }) => {
    return(
        <ProductDetailsProvider productId={params.id}></ProductDetailsProvider>
    )
}

export default Page
```
In the product Details page we make another api call with params of productId.
```ts
useQuery({
    queryKey: ['details'],
    queryFn: async () => {
        const response = await axios.get('/api/product/details',{
        params:{
            productId: productId
        }
        })
        return response.data
    },
    onSuccess: (data) => {
        setProductDetails(data)
    }
})
```
After that the api will get the params with `url.searchParams` and put in the options for Rapid API.
```ts
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
```

And that's it for this case study, enjoy !