import ContentLoader from "react-content-loader";

const PerProductSkeleton = () => {
  return (
    <ContentLoader
      speed={2}
      width={'707'}
      height={'330'}
      viewBox="0 0 707 330"
      backgroundColor="#aaa"
      foregroundColor="#ccc"
    >
      <rect x="0" y="0" rx="11" ry="11" width="38" height="38" />
      <rect x="79" y="4" rx="2" ry="2" width="250" height="30" />
      <rect x="564" y="0" rx="18" ry="18" width="143" height="35" />
      <rect x="0" y="75" rx="18" ry="18" width="323" height="248" />
      <rect x="372" y="75" rx="2" ry="2" width="198" height="22" />
      <rect x="372" y="126" rx="2" ry="2" width="198" height="22" />
      <rect x="372" y="177" rx="2" ry="2" width="350" height="76" />
     
    </ContentLoader>
  )
}

export default PerProductSkeleton