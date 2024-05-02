import React, { useState, useEffect } from 'react';
import "./App.css"
import { Card } from 'flowbite-react';

function PokemonDetail({ id }) {
  const [pokemon, setPokemon] = useState(null);
  const [isShiny, setIsShiny] = useState(false);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
      }
    };
    fetchPokemon();
    return () => {
      setPokemon(null);
    };
  }, [id]);
  
  if (!pokemon) return null;

  const toggleShiny = () => {
    setIsShiny(!isShiny);
  };

  return (
    <div className="pokemon-details w-screen h-screen flex flex-row">
      <div className="flex flex-row">
        <Card className="w-96 h-96 mt-32 ml-48">
          <p>Texto</p>
        </Card>
      </div>
      <div className="fixed top-32 right-96">
        <img 
          src={isShiny ? pokemon.sprites.other['official-artwork'].front_shiny : pokemon.sprites.other['official-artwork'].front_default} 
          alt={pokemon.name} 
          className="size-auto"/>
        <button 
          className="mt-4 px-4 py-2 ml-28 rounded-lg text-white w-52 h-12 font-extrabold"
          style={{
            background: 'linear-gradient(to right, #FF8C00, #FFD700, #32CD32, #1E90FF, #8A2BE2)'
          }}
          onClick={toggleShiny}
        >
          {isShiny ? 'Switch to Default' : 'Switch to Shiny'}
        </button>
      </div>
    </div>
  );
}

export default PokemonDetail