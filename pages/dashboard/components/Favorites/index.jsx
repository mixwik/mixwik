
const Favorites = ({ currentUser }) => {
  console.log(currentUser)

  return (
    <div>
      <div className='bg-aero h-[5vh] font-bold text-xl text-white flex items-center pl-5'>Favoritos</div>
      <div className='bg-white h-[85vh] p-5'>Cuerpo</div>
    </div>

  )
}

export default Favorites
