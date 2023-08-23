interface ContainerProperties {
    children: React.ReactNode
}

const Container: React.FC<ContainerProperties> = ( { children } ) => {
  return <div className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
}

export default Container