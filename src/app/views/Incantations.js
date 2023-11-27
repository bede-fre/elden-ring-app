import React, {useEffect, useState} from 'react';
import { VirtualList } from '../views/VirtualList';
import { CardList } from '../components/CardList';
import SearchBar from '../components/SearchBar';
import styled from 'styled-components';
import { colors } from '../services/styles/colors';
import { spaces } from '../services/styles/spaces';
import { colorsVar } from '../services/styles/variables';

export default function Incantations() {
    
    const ViewContainer = styled.div`
        padding: ${spaces.m};
        padding-top: 76px;
    `;

    const TextAndSearchContainer = styled.div`
        width: 100%;
        position: fixed;
        background-color: ${colorsVar.backgroundColor};
    `;
    
    const IncantationsContainer = styled.div`
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
    const [incantations, setIncantations] = useState([]);
    const [incantationsBase, setIncantationsBase] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentPage, setCurrentPage] = useState(0)

    // useEffect(() => {
    //     fetch(`https://eldenring.fanapis.com/api/incantations?limit=20&page=${currentPage}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             setIncantations([...incantations, ...data.data]);
    //             setData(data);
    //             setIsLoaded(true);

    //             if (data.total > incantations.length) {
    //                 setCurrentPage(currentPage + 1);
    //             }
    //             console.log('DRAGON_RED', data);
    //             console.log('DRAGON_GREEN', incantations);
    //         })
    //         .catch(err => console.log('Error', err));
    // }, [currentPage, data.total]);

    useEffect(() => {
        fetch('http://localhost:4000/incantations')
            .then(res => res.json())
            .then(data => {
                setIncantations(data);
                setIsLoaded(true);
                setIncantationsBase(data);
            })
            .catch(err => console.log('Error', err));
    }, []);

    const onSearch = (value) => {
        if (value.length > 2) {
            let filteredIncantations = incantations
                .filter(incantation => incantation.name.indexOf(value) || incantation.bonus.indexOf(value) !== -1)
            setIncantations(filteredIncantations);
        } else {
            setIncantations(incantationsBase);
        }
    }

    return(
        <ViewContainer>
            <TextAndSearchContainer>
                <div>Incantations  { isLoaded ? '(' +  incantations.length + ')' : ''}</div>

                <SearchBar onSearch={onSearch} />
            </TextAndSearchContainer>

            <IncantationsContainer>
                { isLoaded ?
                    <CardList cards={incantations} />
                    : <p>Loading...</p>
                }
            </IncantationsContainer>
        </ViewContainer>
    )
}