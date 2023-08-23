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