import ContentLoader from "react-content-loader"

const UserSceleton = () => {
  return (
    <ContentLoader
      speed={2}
      width={315}
      height={400}
      viewBox="0 0 400 460"
      backgroundColor="#c7c7c7"
      foregroundColor="#ecebeb"
    >
      <circle cx="44" cy="44" r="44" />
      <rect x="0" y="141" rx="0" ry="0" width="185" height="27" />
      <rect x="0" y="175" rx="0" ry="0" width="106" height="19" />
      <rect x="0" y="234" rx="0" ry="0" width="84" height="24" />
      <rect x="0" y="292" rx="0" ry="0" width="103" height="24" />
      <rect x="0" y="349" rx="0" ry="0" width="109" height="24" />
    </ContentLoader>
  )
}

export default UserSceleton