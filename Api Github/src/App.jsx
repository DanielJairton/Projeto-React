import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [usuario, setUsuario] = useState("")
  function handleBuscar(){

    axios.get(`https://api.github.com/users/${usuario}`).then(response => console.log(response.data))
    axios.get(`https://api.github.com/users/${usuario}/repos`).then(response => console.log(response.data))
    // let dados = axios.get(`https://api.github.com/users/${usuario}`).then(response => response.json())
    // console.log(dados)
  }

  return (
    <>
      {/* <img src="https://avatars.githubusercontent.com/u/152343755?v=4" alt="avtar" /> */}
      {/* <img src="res" alt="avatar"/> */}
      <div className='box-maior'>
        <div className='box-input'>
          <input type="text" value={usuario} onChange={e => setUsuario(e.target.value)}/>
          <button onClick={handleBuscar}>Pesquisar</button>
        </div>

        <div className='box-perfil'>
          <img src="" alt="img-perfil" />
          <label htmlFor="">Login</label>
        </div>

        <div className='box-repos'>
        </div>
      </div>
    </>
  )
}

export default App

// `https://api.github.com/users/${usuario}/repos`
//nome, foto, repositorios