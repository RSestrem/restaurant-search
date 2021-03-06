//Área de Imports
import React, { useState } from "react";
import { useSelector } from "react-redux";
import TextField, { Input } from '@material/react-text-field';
import MaterialIcon from '@material/react-material-icon';
import logo from '../../assets/logo.svg';
import restaurante from '../../assets/restaurante-fake.png';
import { Card, Loader, Map, Modal, RestaurantCard, Skeleton } from '../../components';
import { Carousel, CarouselTitle, Container, Logo, ModalContent, ModalTitle, Search, Wrapper } from './styles';

const Home = () => {
    const [inputValue, setInputValue] = useState('');
    const [query, setQuery] = useState(null);
    const [placeId, setPlaceId] = useState(null);
    const [modalOpened, setModalOpened] = useState(false);
    const { restaurants, restaurantSelected } = useSelector((state) => state.restaurants);

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 750,
        slidesToShow: 4,
        slidesToScroll: 4,
        adaptiveHeight: true,
    };

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            setQuery(inputValue);
        }
    }

    function handleOpenModal (placeId) {
        setPlaceId(placeId);
        setModalOpened(true);
    }

    return (
        <Wrapper>
            <Container>
                <Search>
                    <Logo src={logo} alt='logo do App' />
                    <TextField
                        label='Pesquisar Restaurantes'
                        outlined
                        trailingIcon={<MaterialIcon role="button" icon="search"/>}
                    >
                        <Input
                            value={inputValue}
                            onKeyPress={handleKeyPress}
                            onChange={(event) => setInputValue(event.target.value)}
                        />
                    </TextField>
                    {restaurants.length > 0 ? (
                        <>
                            <CarouselTitle>Na sua Área</CarouselTitle>
                            <Carousel {...settings}>
                                {restaurants.map((restaurant) => (
                                    <Card
                                       key={restaurant.place_id}
                                       photo={restaurant.photos ? restaurant.photos[0].getUrl() : restaurante}
                                       title={restaurant.name}
                                    />
                                ))}
                            </Carousel>
                        </>
                    ) : (
                        <Loader />
                    )}
                </Search>
                {restaurants.map((restaurant) => (
                    <RestaurantCard
                        restaurant={restaurant}
                        onClick={() => handleOpenModal(restaurant.place_id)}
                    />
                ))}
            </Container>
            <Map
               query={query}
               placeId={placeId}
            />
            <Modal open={modalOpened} onClose={() => setModalOpened(!modalOpened)}>
                {restaurantSelected ? (
                    <>
                        <ModalTitle>{restaurantSelected?.name}</ModalTitle>
                        <ModalContent>{restaurantSelected?.formatted_address}</ModalContent>
                        <ModalContent>Telefone: {restaurantSelected?.formatted_phone_number}</ModalContent>
                        <ModalContent>Avaliação geral: {restaurantSelected?.rating} de 5</ModalContent>
                        <ModalContent>Número de avaliações: {restaurantSelected?.user_ratings_total}</ModalContent>
                        <ModalContent>
                            {restaurantSelected?.opening_hours?.open_now
                            ? 'Aberto agora =)'
                            : 'Fechado agora =('}
                        </ModalContent>
                    </>
                ) : (
                    <>
                        <Skeleton width='10px' height='10px' />
                        <Skeleton width='10px' height='10px' />
                        <Skeleton width='10px' height='10px' />
                        <Skeleton width='10px' height='10px' />
                        <Skeleton width='10px' height='10px' />
                        <Skeleton width='10px' height='10px' />
                    </>
                )}
            </Modal>
        </Wrapper>
    );
};

export default Home;