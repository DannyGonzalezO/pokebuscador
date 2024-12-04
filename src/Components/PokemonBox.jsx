import {useState, useEffect} from "react"
import axios from "axios"
import {Col, Card, CardImg, CardBody, CardFooter, Badge} from "reactstrap"
import "../styles/PokemonTypes.css";

// Se define la función PokemonBox, que con sus parametros muestra la información de un Pokemon.
const PokemonBox = (params) => {
  const [pokemon, setPokemon] = useState([]);
  const [imagen, setImagen] = useState('');
  const [cardClass, setCardClass] = useState('d-none');
  const [loadingClass, setLoadingClass] = useState('d-block');

// Se llama a la función getPokemon cada que se carga la página.
  useEffect(() => {
    getPokemon();
  }, []);

// Se define getPokemon, que obtiene la información del Pokemon que se mostrará en la página.
  const getPokemon = async () => {
    const fuente = `https://pokeapi.co/api/v2/pokemon/${params.name}`;
    axios.get(fuente).then( async (response) => {
      const respuesta = response.data;
      setPokemon(respuesta);
      // Se obtiene la imagen del Pokemon, prioridad para el artwork Dream World, si no existe, se muestra el artwork oficial.
      if (respuesta.sprites.other.dream_world.front_default != null) {
        setImagen(respuesta.sprites.other.dream_world.front_default);
      } else {
        setImagen(respuesta.sprites.other['official-artwork'].front_default);}
      setCardClass('d-block');
      setLoadingClass('d-none');
    })
  }

// Se definen los colores de los distintos tipos de Pokemon, dandole los nombres de las clases definidas en PokemonTypes.css.
  const typeColors = {
    grass: 'badge-grass',
    fire: 'badge-fire',
    water: 'badge-water',
    bug: 'badge-bug',
    normal: 'badge-normal',
    poison: 'badge-poison',
    electric: 'badge-electric',
    ground: 'badge-ground',
    fairy: 'badge-fairy',
    fighting: 'badge-fighting',
    psychic: 'badge-psychic',
    ice: 'badge-ice',
    rock: 'badge-rock',
    ghost: 'badge-ghost',
    dragon: 'badge-dragon',
    dark: 'badge-dark',
    steel: 'badge-steel',
    flying: 'badge-flying',
  };

  return (
    <Col sm="4" lg='3' className="mb-3">
      <Card className='shadow border-4 border-warning'>
        <CardImg src={imagen} height='150' className="p-2" />
        <CardBody className='text-center'>
          <Badge pill color="primary">#{pokemon.id}</Badge>
          <label className=" fs-4 text-capitalize">{pokemon.name}</label>
        </CardBody>
        <CardFooter className="text-center">
        {pokemon.types && pokemon.types.map((tipo, index) => (
          <Badge key={index} className={typeColors[tipo.type.name] + " text-capitalize"}>
          {tipo.type.name}
          </Badge>
        ))}
        </CardFooter>
      </Card>
    </Col>
  )
}

export default PokemonBox