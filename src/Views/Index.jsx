import { Container, Row, Col, InputGroup, InputGroupText, Input, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import PokemonBox from "../Components/PokemonBox";
import "../styles/customStyles.css";

function Index() {
    // Se define la variable pokemon, que almacena los Pokemon que se mostrarán en la página.
    const [pokemon, setPokemon] = useState([]);
    // Se definen las variables offset y limit, definiendo un limite de 20 Pokemon por página.
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(24);
    // Se define la variable allPokemon, que almacena todos los Pokemon.
    const [allPokemon, setAllPokemon] = useState([]);
    // Se define la variable listado, que almacena los Pokemon que se mostrarán en la página.
    const [listado, setListado] = useState([]);
    // Se define la variable filtro, que guarda el filtro de búsqueda.
    const [filtro, setFiltro] = useState('');
    // Se define un total de Pokemon por consulta.
    const [total, setTotal] = useState(0);

    // Se llama a la función getPokemon cada que se carga la página.
    useEffect(() => {
        getPokemon(offset);
        getAllPokemon();
    }, []);

    // Se llama a la funcion getPokemon cada que se cambia el offset.
    useEffect(() => {
        getPokemon(offset);
      }, [offset]);

    // Se define getPokemon, que obtiene los Pokemon que se mostrarán en la página.
    // Recibe como parametro el offset.
    const getPokemon = async (o) => {
        const fuente = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
        // Se obtiene la respuesta de la API.
        axios.get(fuente).then( async (response) => {
            const respuesta = response.data;
            // Se almacena la respuesta en la variable pokemon.
            setPokemon(respuesta.results);
            // Se almacena la respuesta en la variable listado.
            setListado(respuesta.results);
            // Se almacena el total de Pokemon en la variable total.
            setTotal(respuesta.count);
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
    // Recibe como parametro el evento que se ejecuta en la barra de busqueda (en este caso, e.keyCode= 13 es Enter).
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
                setListado(pokemon);
            }, 100);
        }
        }

        // Se define goPage, que cambia la página cuando hay más Pokemon que mostrar que el limite establecido por página.
        // Recibe como parametro la página a la que se quiere ir.
        const goPage = (page) => {
            setListado([]);
            const newOffset = (page - 1) * limit;
            setOffset(newOffset);
            console.log('goPage - offset:', newOffset);
          };
        
          const totalPages = Math.ceil(total / limit);
          const currentPage = Math.floor(offset / limit) + 1;

          // Calcular las páginas a mostrar
          const getPageNumbers = () => {
            const maxPagesToShow = 10;
            const pages = [];
            const half = Math.floor(maxPagesToShow / 2);
            let start = Math.max(currentPage - half, 1);
            let end = Math.min(start + maxPagesToShow - 1, totalPages);
        
            if (end - start < maxPagesToShow - 1) {
              start = Math.max(end - maxPagesToShow + 1, 1);
            }
        
            for (let i = start; i <= end; i++) {
              pages.push(i);
            }
            return pages;
          };
        
          return (
            <Container className="mt-3">
              <Row>
                <Col className="custom-col pixel-font">
                  <h1>POKEBROWSER</h1>
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputGroup className="mt-3 mb-3 shadow">
                    <InputGroupText><i className="fa-solid fa-search"></i></InputGroupText>
                    <Input value={filtro} onChange={(e) => { setFiltro(e.target.value) }} onKeyUpCapture={buscarPokemon} placeholder="Search Pokémon" className="pixel-font"></Input>
                  </InputGroup>
                </Col>
              </Row>
              <Row className="mt-3">
                {listado.map((p, i) => (
                  <PokemonBox name={p.name} key={i} />
                ))}
              </Row>
              <Row>
                <Pagination aria-label="Page navigation">
                  <PaginationItem disabled={currentPage <= 1}>
                    <PaginationLink first onClick={() => goPage(1)} />
                  </PaginationItem>
                  <PaginationItem disabled={currentPage <= 1}>
                    <PaginationLink previous onClick={() => goPage(currentPage - 1)} />
                  </PaginationItem>
                  {getPageNumbers().map((page, i) => (
                    <PaginationItem active={page === currentPage} key={i}>
                      <PaginationLink onClick={() => goPage(page)}>
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem disabled={currentPage >= totalPages}>
                    <PaginationLink next onClick={() => goPage(currentPage + 1)} />
                  </PaginationItem>
                  <PaginationItem disabled={currentPage >= totalPages}>
                    <PaginationLink last onClick={() => goPage(totalPages)} />
                  </PaginationItem>
                </Pagination>
              </Row>
            </Container>
          );
        }
        
        export default Index;