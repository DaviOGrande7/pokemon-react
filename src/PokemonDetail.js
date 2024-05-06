import React, { useState, useEffect } from 'react';
import "./App.css"
import { Card, Button  } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { HiOutlineArrowRight, HiOutlineArrowLeft } from "react-icons/hi";

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

  const types = pokemon.types.map(type => type.type.name);
  const typeHtml = types.map(type => `<div class="type-${type.toLowerCase()} inline-block px-20 py-1 rounded-md mr-1 text-white font-bold text-lg">${type}</div>`).join('');

  const previousId = id > 1 ? id - 1 : null;
  const nextId = id < 151 ? id + 1 : null;

  return (
    <div className="pokemon-details w-screen h-screen flex flex-row">
      <div>
        <Card className="w-4/5 h-3/6 mt-32 ml-48 bg-slate-500">
          <div>
            <div className="flex flex-row justify-between">
              <h2 className="text-white text-lg font-bold">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
              <h2 className="text-white text-lg font-bold">#{pokemon.id}</h2>
            </div>  
            <hr className="my-4 border-white" />
            <div className="grid grid-cols-2 gap-y-2 text-white">
              <div>
                <p><span className="font-bold">Height:</span> {pokemon.height / 10} m</p>
                <p><span className="font-bold">Weight:</span> {pokemon.weight / 10} kg</p>
                <p><span className="font-bold">Abilities:</span> {pokemon.abilities.map(ability => ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)).join(', ')}</p>
                <p><span className="font-bold">Possible genders:</span> {pokemon.gender_rate === -1 ? 'Genderless' : ` Male, Female`}</p>
              </div>
            </div>
            <hr className="my-4 border-white" />
            <div className="text-center">
              <p className="font-bold text-white mb-3">Types:</p>
              <div className="mx-auto" dangerouslySetInnerHTML={{ __html: typeHtml }}></div>
            </div>
          </div>
          <button
            className="rounded-lg text-white w-44 h-10 font-bold mx-auto mt-4"
            style={{
              background: 'linear-gradient(to right, #FF8C00, #FFD700, #32CD32, #1E90FF, #8A2BE2)'
            }}
            onClick={toggleShiny}
          >
            {isShiny ? 'Switch to Default' : 'Switch to Shiny'}
          </button>
        </Card>
      </div>
      <div className="fixed top-32 right-96">
        <img 
          src={isShiny ? pokemon.sprites.other['official-artwork'].front_shiny : pokemon.sprites.other['official-artwork'].front_default} 
          alt={pokemon.name} 
          className="size-auto"/>
      </div>
      <div className="fixed bottom-0 mb-8 flex flex-row justify-center left-0 right-0">
        <Link to={previousId ? `/pokemon/${previousId}` : '#'} className={`mr-2 ${previousId ? '' : 'pointer-events-none'}`}>
          <Button pill className="bg-slate-500 px-4 py-2" disabled={!previousId}>
            <HiOutlineArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <Link to={nextId ? `/pokemon/${nextId}` : '#'} className={nextId ? '' : 'pointer-events-none'}>
          <Button pill className="bg-slate-500 px-4 py-2" disabled={!nextId}>
            <HiOutlineArrowRight className="h-6 w-6" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default PokemonDetail