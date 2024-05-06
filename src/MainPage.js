import React from 'react';
import { Card, Button, Spinner } from "flowbite-react";
import { Link } from 'react-router-dom';
import "./App.css"

function MainPage({ pokemons }) {
  if (!pokemons || pokemons.length === 0) {
    return (<div className="flex flex-col justify-center items-center h-screen">
              <Spinner aria-label="Center-aligned spinner example" size="xl" />
              <div className="text-white text-4xl">Loading</div>
            </div>);
  }

  return (
<div className="flex flex-row flex-wrap justify-center my-6">
      {pokemons.map(pokemon => (
        <div key={pokemon.name} className="m-1 tablet:w-1/4">
          <Card className=" bg-cyan-300 bg-opacity-70 tablet:h-96">
            <div className='pokemon-bg'>
              <strong><p className="absolute">{pokemon.id}</p></strong>
              <img alt={pokemon.name} src={pokemon.sprites.front_default} className="w-40 h-auto rounded-full tablet:w-full"/>
            </div>
            <h1 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </h1>
            <Link to={`/pokemon/${pokemon.id}`}>
              <Button color="light" className="mx-auto">
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
        </div>
      ))}
    </div>

  );
}

export default MainPage;
