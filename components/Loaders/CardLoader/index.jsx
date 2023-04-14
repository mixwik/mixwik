import ContentLoader from "react-content-loader"

export const CardLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={140}
    height={250}
    viewBox="0 0 140 250"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="-50" y="0" rx="3" ry="3" width="257" height="16" /> 
    <rect x="-113" y="20" rx="3" ry="3" width="410" height="175" /> 
    <rect x="-32" y="200" rx="3" ry="3" width="380" height="6" /> 
    <rect x="-30" y="222" rx="3" ry="3" width="380" height="6" /> 
    <rect x="-12" y="211" rx="3" ry="3" width="380" height="6" /> 
    <rect x="-11" y="233" rx="3" ry="3" width="380" height="6" />
  </ContentLoader>
)
