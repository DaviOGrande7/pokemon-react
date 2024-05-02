import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import PokemonDetail from './PokemonDetail';
import MainPage from './MainPage';
import home from './images/home.png';

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
      <Link to={`/`}>
        <button className="fixed size-10 top-1 left-1 invert rounded-full">
          <img alt="home_button" src={home}></img>
        </button>
      </Link>
      <Routes>
        <Route path="/" element={<MainPage pokemons={pokemons} />} />
        {pokemons.map(pokemon => (
          <Route key={pokemon.id} path={`/pokemon/${pokemon.id}`} element={<PokemonDetail id={pokemon.id} />} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
