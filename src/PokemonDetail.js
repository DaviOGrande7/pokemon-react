import React, { useState, useEffect } from 'react';
import "./App.css"
import { Card } from 'flowbite-react';

function PokemonDetail({ id }) {
  const [pokemon, setPokemon] = useState(null);

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

  return (
    <div className="pokemon-details w-full h-screen">
      <div className="flex flex-row">
        <Card className="w-96 h-96 mt-32 ml-48">
          <p>Texto</p>
        </Card>
        <div className="p">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
      </div>
    </div>
  );
}

export default PokemonDetail