import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateFight = () => {
    const navigate = useNavigate();
    const [firstPokemonId, setFirstPokemonId] = useState('');
    const [secondPokemonId, setSecondPokemonId] = useState('');
    const [locationId, setLocationId] = useState('');
    const [pokemons, setPokemons] = useState([]);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        // Загрузка данных о покемонах и местах проведения боев
        const fetchData = async () => {
            try {
                const pokemonsResponse = await axios.get('http://backend-url.com/pokemons');
                const locationsResponse = await axios.get('http://backend-url.com/locations');
                setPokemons(pokemonsResponse.data.pokemons);
                setLocations(locationsResponse.data.locations);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://backend-url.com/fights', {
                firstPokemonId,
                secondPokemonId,
                locationId
            });
            alert(`Бой создан. ID боя: ${response.data.fightId}`);
            // Очистка формы
            setFirstPokemonId('');
            setSecondPokemonId('');
            setLocationId('');
            navigate('/main');
        } catch (error) {
            alert('Ошибка при создании боя. Пожалуйста, попробуйте снова.');
        }
    };

    return (
        <div>
            <h2>Создать бой</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Выберите первого покемона:</label>
                    <select value={firstPokemonId} onChange={(e) => setFirstPokemonId(e.target.value)}>
                        <option value="">Выберите покемона</option>
                        {pokemons.map(pokemon => (
                            <option key={pokemon.id} value={pokemon.id}>{pokemon.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Выберите второго покемона:</label>
                    <select value={secondPokemonId} onChange={(e) => setSecondPokemonId(e.target.value)}>
                        <option value="">Выберите покемона</option>
                        {pokemons.map(pokemon => (
                            <option key={pokemon.id} value={pokemon.id}>{pokemon.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Выберите место проведения:</label>
                    <select value={locationId} onChange={(e) => setLocationId(e.target.value)}>
                        <option value="">Выберите место</option>
                        {locations.map(location => (
                            <option key={location.id} value={location.id}>{location.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">Создать бой</button>
            </form>
        </div>
    );
};

export default CreateFight;