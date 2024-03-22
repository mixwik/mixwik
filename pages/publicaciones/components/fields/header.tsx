export const Header = ({ title, age, mixWikTeams, limitedAdministrator }) => {
  return (
    <header className='sticky top-0 left-0 z-20 flex items-center justify-between gap-2 p-5 bg-white shadow-md'>
      <div className='flex flex-col'>
        <h1 className='flex gap-2 text-xl font-bold'>
          {title}
          <span className='px-2 py-1 text-sm text-white rounded-full bg-aero'>
            {mixWikTeams && 'Teams'}
          </span>
        </h1>
        <p className='text-sm text-gray-500'>{age} años</p>
      </div>
      {limitedAdministrator && <button className=''>Editar</button>}
    </header>
  )
}
