import ContentLoader from "react-content-loader";

const UserSkeleton = () => {
  return (
    <ContentLoader
      speed={2}
      width={210}
      height={355}
      viewBox="0 0 210 355"
      backgroundColor="#aaa"
      foregroundColor="#ccc"
    >
      <circle cx="45" cy="45" r="45" />
      <rect x="0" y="118" rx="2" ry="2" width="159" height="16" />
      <rect x="0" y="145" rx="2" ry="2" width="104" height="12" />
      <rect x="0" y="205" rx="2" ry="2" width="104" height="19" />
      <rect x="0" y="264" rx="2" ry="2" width="104" height="19" />
      <rect x="0" y="323" rx="2" ry="2" width="104" height="19" />
     
    </ContentLoader>
  );
};

export default UserSkeleton;
