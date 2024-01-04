import { useState } from 'react'
import axios from 'axios'
import './App.css'


function App() {
  const [usuario, setUsuario] = useState("")
  function handleBuscar(){

    // axios.get(`https://api.github.com/users/${usuario}`).then(response => console.log(response.data))
    // axios.get(`https://api.github.com/users/${usuario}/repos`).then(response => console.log(response.data))

    //Implementando o consumo da api por Axios invés de fetch
    // const api = axios.create({
    //   baseURL: "https://api.github.com",
    // });

    buscarDados(usuario);
  }

  //Busca os dados da Api Github para pegar os dados do usuário
  async function buscarDados(usuario){
    let dados = await fetch(`https://api.github.com/users/${usuario}`).then(Response => Response.json())
    let repos = await fetch(`https://api.github.com/users/${usuario}/repos`).then(Response => Response.json())
    inserirDados(dados, repos);
  }

  //Inseri os dados do usuário
  function inserirDados(dados, repos){
    document.getElementById('lb-usuario').innerHTML = dados.login;
    document.getElementById('lb-usuario').style.visibility = "visible";
    document.getElementById('img-perfil').src = dados.avatar_url;
    document.getElementById('img-perfil').style.visibility = "visible";
    criarListaRepos(repos);
  }

  function criarListaRepos(repos){

    //Remove repositórios da pesquisa antigua da lista
    let removerLista = document.querySelectorAll('.li-repo');
    for (let index = 0; index < removerLista.length; index++) {
      document.getElementById('ul-repos').removeChild(removerLista[index]); 
    }

    //adiciona os repositórios do usuário na lista
    for (let index = 0; index < repos.length; index++) {
      let li = document.createElement('li');
      li.innerHTML = "<a href=" + repos[index].html_url + " target='_blank'>" + repos[index].name + "</a>";
      li.className = "li-repo";

      document.getElementById('ul-repos').appendChild(li);
    }
  }

  return (
    <>
      <div className='box-maior'>

        <div className='box-input'>
          <input type="text" placeholder=' Insira o usuário' value={usuario} onChange={e => setUsuario(e.target.value)}/>
          <button onClick={handleBuscar} id='btn-buscar'>Pesquisar</button>
        </div>

        <div className='box-perfil'>
          <img src="" alt="img-perfil" id='img-perfil'/>
          <label htmlFor="" id='lb-usuario'>Login</label>
        </div>

        <div className='box-repos'>
          <fieldset>
            <legend>Repositórios</legend>
            <ul id='ul-repos'>
            </ul>
          </fieldset>
        </div>

      </div>
    </>
  )
}

export default App

// `https://api.github.com/users/${usuario}/repos`
//nome, foto, repositorios