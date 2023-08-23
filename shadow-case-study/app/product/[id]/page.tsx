interface ProductParams {
    params: {
      id: string
    }
}

const Page : React.FC<ProductParams> = ({ params }) => {
    return(
        <p>Test</p>
    )
}

export default Page