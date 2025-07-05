import React from 'react'
import ContentLoader from 'react-content-loader'

const PerProductSkeleton = () => {
  return (
    <ContentLoader
      speed={2}
      // width='100%'
      // height="100%"
      viewBox="0 0 706 325"
      backgroundColor="#c7c7c7"
      foregroundColor="#ecebeb"
    >
    <rect x="0" y="0" rx="10" ry="10" width="38" height="38" />
    <rect x="75" y="0" rx="0" ry="0" width="381" height="38" />
    <rect x="564" y="0" rx="20" ry="20" width="143" height="38" />
    <rect x="0" y="75" rx="20" ry="20" width="324" height="248" />
    <rect x="372" y="75" rx="0" ry="0" width="242" height="21" />
    <rect x="372" y="126" rx="0" ry="0" width="242" height="21" />
    <rect x="372" y="177" rx="0" ry="0" width="242" height="121" />
    </ContentLoader>
  )
}

export default PerProductSkeleton