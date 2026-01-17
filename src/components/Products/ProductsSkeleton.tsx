import ContentLoader from "react-content-loader";

const ProductsSkeleton = () => {
  return (
    <ContentLoader
      speed={2}
      width={'100%'}
      height={'100%'}
      viewBox="0 0 377 245"
      backgroundColor="#aaa"
      foregroundColor="#ccc"
    >
      <rect x="0" y="0" rx="18" ry="18" width="377" height="165" />
      <rect x="13" y="191" rx="2" ry="2" width="90" height="14" />
      <rect x="13" y="218" rx="2" ry="2" width="220" height="12" />
     
    </ContentLoader>
  )
}

export default ProductsSkeleton