import React, {useEffect, useState} from 'react';
import { VirtualList } from '../views/VirtualList';
import { CardList } from '../components/CardList';
import SearchBar from '../components/SearchBar';
import styled from 'styled-components';
import { colors } from '../services/styles/colors';
import { spaces } from '../services/styles/spaces';
import { colorsVar } from '../services/styles/variables';

export default function Ashes() {
    
    const ViewContainer = styled.div`
        padding: ${spaces.m};
        padding-top: 76px;
    `;

    const TextAndSearchContainer = styled.div`
        width: 100%;
        position: fixed;
        background-color: ${colorsVar.backgroundColor};
    `;
    
    const AshesContainer = styled.div`
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
    const [ashes, setAshes] = useState([]);
    const [ashesBase, setAshesBase] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        fetch('http://localhost:4000/ashes')
            .then(res => res.json())
            .then(data => {
                setAshes(data);
                setIsLoaded(true);
                setAshesBase(data);
            })
            .catch(err => console.log('Error', err));
    }, []);

    const onSearch = (value) => {
        if (value.length > 2) {
            let filteredAshes = ashes
                .filter(ashe => ashe.name.indexOf(value) || ashe.bonus.indexOf(value) !== -1)
            setAshes(filteredAshes);
        } else {
            setAshes(ashesBase);
        }
    }

    return(
        <ViewContainer>
            <TextAndSearchContainer>
                <div>Ashes  { isLoaded ? '(' +  ashes.length + ')' : ''}</div>

                <SearchBar onSearch={onSearch} />
            </TextAndSearchContainer>

            <AshesContainer>
                { isLoaded ?
                    <CardList cards={ashes} />
                    : <p>Loading...</p>
                }
            </AshesContainer>
        </ViewContainer>
    )
}