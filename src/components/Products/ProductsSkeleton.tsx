import ContentLoader from "react-content-loader"

const ProductsSkeleton = () => {
  return (
<ContentLoader
  speed={2}
  width='100%'
  height="100%"
  viewBox="0 0 352 251"
  backgroundColor="#c7c7c7"
  foregroundColor="#ecebeb"
>
<rect x="0" y="0" rx="20" ry="20" width="352" height="165" />
<rect x="13" y="185" rx="0" ry="0" width="200" height="22" />
<rect x="13" y="215" rx="0" ry="0" width="250" height="18" />
</ContentLoader>
  )
}

export default ProductsSkeleton