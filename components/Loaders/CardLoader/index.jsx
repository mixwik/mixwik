import ContentLoader from 'react-content-loader'

export const CardLoader = (props) => (
  <ContentLoader
    width={170}
    height={300}
    viewBox='0 0 170 300'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
    {...props}
  >
    <rect x='7' y='8' rx='5' ry='5' width='155' height='16' />
    <rect x='2' y='310' rx='3' ry='3' width='380' height='6' />
    <rect x='7' y='26' rx='5' ry='5' width='156' height='237' />
    <rect x='8' y='270' rx='5' ry='5' width='152' height='10' />
    <rect x='10' y='284' rx='5' ry='5' width='123' height='8' />
  </ContentLoader>
)
