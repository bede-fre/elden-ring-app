import React, {useEffect, useState} from 'react';
import { VirtualList } from '../views/VirtualList';
import { CardList } from '../components/CardList';
import SearchBar from '../components/SearchBar';
import styled from 'styled-components';
import { colors } from '../services/styles/colors';
import { spaces } from '../services/styles/spaces';
import { colorsVar } from '../services/styles/variables';

export default function Sorceries() {
    
    const ViewContainer = styled.div`
        padding: ${spaces.m};
        padding-top: 76px;
    `;

    const TextAndSearchContainer = styled.div`
        width: 100%;
        position: fixed;
        background-color: ${colorsVar.backgroundColor};
    `;
    
    const SorceriesContainer = styled.div`
        margin-top: 60px;
        display: flex;
        flex-direction: column;
        gap: ${spaces.m};
        background-color: ${colors.darkBlue};
        padding: ${spaces.m};
        border-radius: ${spaces.m};
        border: 4px solid ${colors.lightYellow};
    `;

    const [data, setData] = useState([]);
    const [sorceries, setSorceries] = useState([]);
    const [sorceriesBase, setSorceriesBase] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentPage, setCurrentPage] = useState(0)

    // useEffect(() => {
    //     fetch(`https://eldenring.fanapis.com/api/sorceries?limit=20&page=${currentPage}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             setsorceries([...sorceries, ...data.data]);
    //             setData(data);
    //             setIsLoaded(true);

    //             if (data.total > sorceries.length) {
    //                 setCurrentPage(currentPage + 1);
    //             }
    //             console.log('DRAGON_RED', data);
    //             console.log('DRAGON_GREEN', sorceries);
    //         })
    //         .catch(err => console.log('Error', err));
    // }, [currentPage, data.total]);

    useEffect(() => {
        fetch('http://localhost:4000/sorceries')
            .then(res => res.json())
            .then(data => {
                setSorceries(data);
                setIsLoaded(true);
                setSorceriesBase(data);
            })
            .catch(err => console.log('Error', err));
    }, []);

    const onSearch = (value) => {
        console.log('*** onSearch time ***', value)

        if (value.length > 2) {
            let filteredsorceries = sorceries
                .filter(sorcerie => sorcerie.name.indexOf(value) || sorcerie.bonus.indexOf(value) !== -1)
            setSorceries(filteredsorceries);
        } else {
            setSorceries(sorceriesBase);
        }
    }

    return(
        <ViewContainer>
            <TextAndSearchContainer>
                <div>Sorceries  { isLoaded ? '(' +  sorceries.length + ')' : ''}</div>

                <SearchBar onSearch={onSearch} />
            </TextAndSearchContainer>

            <SorceriesContainer>
                { isLoaded ?
                    <CardList cards={sorceries} />
                    : <p>Loading...</p>
                }
            </SorceriesContainer>
        </ViewContainer>
    )
}