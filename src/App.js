import React, {useState, useEffect} from "react";
import api from "./services/api"

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
        setRepositories(response.data)
      })
  }, [])

  async function handleAddRepository() {

    const response = await api.post('repositories', {
      title: `Novo Repositório ${Date.now()}`,
      url: "http://github.com/brunochj",
      techs: ["ReactJS", "NodeJS", "JavaScript"]
    })

    const repository = response.data
    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    
    await api.delete(`repositories/${id}`).then(() => {
      const del = repositories.filter(repository => id !== repository.id)
      setRepositories(del)
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repository => <li>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
              </li>
            )}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
