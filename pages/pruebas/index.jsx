
const Pruebas = () => {
  window.addEventListener('beforeunload', function (event) {
    event.preventDefault()
    event.returnValue = ''
    const confirmationMessage = '¡ATENCIÓN! Si cierras esta pestaña sin elegir una publicación la promoción no se llevará acabo';
    (event || window.event).returnValue = confirmationMessage // Gecko + IE
    return confirmationMessage // Webkit, Safari, Chrome etc.
  })

  return (
    <div>
      <h1>Pruebas</h1>
      <button>Click</button>
    </div>
  )
}

export default Pruebas
