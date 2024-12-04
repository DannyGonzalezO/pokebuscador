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
    // Se define la variable allPokemon, que almacena todos los Pokemon.
    const [allPokemon, setAllPokemon] = useState([]);
    // Se define la variable listado, que almacena los Pokemon que se mostrarán en la página.
    const [listado, setListado] = useState([]);
    // Se define la variable filtro, que guarda el filtro de búsqueda.
    const [filtro, setFiltro] = useState('');

    // Se llama a la función getPokemon cada que se carga la página.
    useEffect(() => {
        getPokemon(offset);
        getAllPokemon();
    }, []);

    // Se define getPokemon, que obtiene los Pokemon que se mostrarán en la página.
    const getPokemon = async (o) => {
        const fuente = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
        // Se obtiene la respuesta de la API.
        axios.get(fuente).then( async (response) => {
            const respuesta = response.data;
            // Se almacena la respuesta en la variable pokemon.
            setPokemon(respuesta.results);
            // Se almacena la respuesta en la variable listado.
            setListado(respuesta.results);
        })
    }

    // Se define getAllPokemon, que obtiene todos los Pokemon.
    const getAllPokemon = async () => {
        const fuente = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=100000`;
        // Se obtiene la respuesta de la API.
        axios.get(fuente).then( async (response) => {
            const respuesta = response.data;
            // Se almacena la respuesta en la variable pokemon.
            setAllPokemon(respuesta.results);
        })
    }

    //se define buscarPokemon, que filtra los Pokemon que se mostrarán en la página.
    const buscarPokemon = (e) => {
        if (e.keyCode == 13) {
            if(filtro.trim() != ''){
                setListado([]);
                setTimeout(() => {
                    setListado(allPokemon.filter(p => p.name.includes(filtro)));
                }, 100)
            }
        } else if(filtro.trim() == '') {
            setListado([]);
            setTimeout(() => {
                setListado(allPokemon);
            }, 100);
        }
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
            <Input value={filtro} onChange={(e) => {setFiltro(e.target.value)}} onKeyUpCapture={buscarPokemon} placeholder="Buscar Pokémon"></Input>
          </InputGroup>
        </Col>
      </Row>
      <Row className="mt-3">
        {listado.map((p,i) => (
        <PokemonBox name={p.name} key={i} />
        ))}
      </Row>
    </Container>
  )
}

export default Index