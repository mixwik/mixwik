import Layout from '../../components/Layout'
import { BackgroundDots } from '../../components/background-dots'

const Ours = () => {
  return (
    <Layout>
      <section className='flex items-center justify-center'>
        <BackgroundDots />
        <div className='flex flex-col gap-10 bg-white md:w-1/2 p-5 md:h-[90vh] mb-[10vh] md:mb-0'>
          <h1 className='text-3xl font-bold text-center md:text-4xl'>Que es MixWik</h1>
          <p>
            Bienvenidos a MixWik.com, la plataforma donde puedes encontrar jugadores cercanos para compartir tus hobbies y juegos favoritos. Somos un equipo de apasionados por los videojuegos y juegos de mesa, y creamos MixWik.com para proporcionar una solución fácil y eficiente para encontrar jugadores cercanos con intereses similares.
          </p>

          <p>
            En MixWik.com, puedes buscar jugadores cerca de ti que compartan tus mismos intereses en juegos de PC y juegos de mesa. Ya sea que estés buscando nuevos amigos para jugar en línea o en persona, nuestra plataforma te permite conectarte con personas que comparten tus mismos pasatiempos.
          </p>
          <p>
            Nuestro objetivo es proporcionar una experiencia enriquecedora a nuestros usuarios, ayudándoles a encontrar a personas con las que puedan compartir su amor por los juegos. Creemos que los juegos son más divertidos cuando los compartes con amigos, y nuestra plataforma está diseñada para ayudarte a hacer precisamente eso.
          </p>
          <p>
            Nos esforzamos por mantener una comunidad amigable y segura, donde todos los usuarios son bienvenidos. Si tienes alguna sugerencia o comentario, no dudes en ponerte en contacto con nosotros. Estamos comprometidos a proporcionar la mejor experiencia posible a nuestros usuarios y trabajamos constantemente para mejorar y agregar nuevas características a nuestra plataforma.
          </p>
        </div>
      </section>
    </Layout>
  )
}

export default Ours
