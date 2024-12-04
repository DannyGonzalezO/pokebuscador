import { Container, Row, Col, InputGroup, InputGroupText, Input } from "reactstrap"
import axios from "axios"
import { useState, useEffect } from "react";
import PokemonBox from "../Components/PokemonBox";    


function Index() {
    // Se define la variable pokemon, que almacena los Pokemon que se mostrarán en la página.
    const [pokemon, setPokemon] = useState([]);
    // Se definen las variables offset y limit, definiendo un limite de 20 Pokemon por página.
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(20);

    // Se llama a la función getPokemon cada que se carga la página.
    useEffect(() => {
        getPokemon(offset);
    }, []);

    // Se define getPokemon, que obtiene los Pokemon que se mostrarán en la página.
    const getPokemon = async (o) => {
        const fuente = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
        // Se obtiene la respuesta de la API.
        axios.get(fuente).then( async (response) => {
            const respuesta = response.data;
            // Se almacena la respuesta en la variable pokemon.
            setPokemon(respuesta.results);
    })
}
  return (
    <Container className="shadow bg-danger mt-3">
      <Row>
        <Col>
          <h1>PokéBuscador</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <InputGroup className="mt-3 mb-3 shadow">
            <InputGroupText><i className="fa-solid fa-search"></i></InputGroupText>
            <Input placeholder="Buscar Pokémon"></Input>
          </InputGroup>
        </Col>
      </Row>
      <Row classname="mt-3">
        {pokemon.map((p,i) => (
          <Col key={p.name}>
            <PokemonBox name={p.name} key={i} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Index