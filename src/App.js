import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'; // Importar Routes em vez de Router
import './App.css';
import { Card, Button } from "flowbite-react";
import PokemonDetail from './PokemonDetail';

function App() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=151")
      .then(response => response.json())
      .then(data => {
        const pokemonPromises = data.results.map(result =>
          fetch(result.url).then(response => response.json())
        );
        Promise.all(pokemonPromises)
          .then(pokemonData => {
            setPokemons(pokemonData);
          })
          .catch(error => {
            console.error("Error fetching Pokemon data:", error);
          });
      })
      .catch(error => {
        console.error("Error fetching Pokemon list:", error);
      });
  }, []);

  return (
    <Router>
      <div className="flex flex-row flex-wrap justify-center my-6">
        {pokemons.map(pokemon => (
          <div key={pokemon.name} className="m-1">
            <Card className="h-80">
              <img alt={pokemon.name} src={pokemon.sprites.front_default} className="w-40 h-auto rounded-full bg-slate-200"/>
              <h1 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </h1>
              <Link to={`/pokemon/${pokemon.id}`}>
                <Button color="light">
                  Expandir
                  <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              </Link>
            </Card>
            <PokemonDetail id={pokemon.id}/>
          </div>
        ))}
      </div>
      <Routes>
        {pokemons.map(pokemon => (
          <Route key={pokemon.id} path={`/pokemon/${pokemon.id}`} element={<PokemonDetail id={pokemon.id}/>} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
