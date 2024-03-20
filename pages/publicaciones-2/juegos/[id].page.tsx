import { useRouter } from 'next/router'
import Layout from '../../../components/Layout'

const PublicationsGamesPage = () => {
  const router = useRouter()
  const { id, page } = router.query
  return (
    <Layout title='juegos'>
      <section>
        <h1>Publicaciones de juegos</h1>
      </section>
      {id} - {page}
    </Layout>
  )
}
export default PublicationsGamesPage
