import React, {useEffect, useState} from 'react';
import { CardList } from '../components/CardList';
import SearchBar from '../components/SearchBar';
import styled from 'styled-components';
import { colors } from '../services/styles/colors';
import { spaces } from '../services/styles/spaces';

export default function ViewList() {
    
    const ViewContainer = styled.div`
        padding: ${spaces.m};
    `;
    
    const CardsListContainer = styled.div`
        display: flex;
        flex-direction: column;
        gap: ${spaces.m};
        background-color: ${colors.darkBlue};
        padding: ${spaces.m};
        border-radius: ${spaces.m};
        border: 4px solid ${colors.lightYellow};
    `;

    const [data, setData] = useState([]);
    const [cardsDatas, setCardsDatas] = useState([]);
    const [cardsDatasBase, setcardsDatasBase] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetch('http://localhost:4000/data')
            .then(res => res.json())
            .then(data => {
                setCardsDatas(data);
                setIsLoaded(true);
                setcardsDatasBase(data);
            })
            .catch(err => console.log('Error', err));
    }, []);

    const onSearch = (value) => {
        if (value.length > 2) {
            let filteredCards = cardsDatas
                .filter(card => card.name.indexOf(value) || card.bonus.indexOf(value) !== -1)
            setCardsDatas(filteredCards);
        } else {
            setCardsDatas(cardsDatasBase);
        }
    }

    return(
        <ViewContainer>
            
            <div> Name List to Replace { isLoaded ? '(' +  cardsDatas.length + ')' : ''}</div>

            <SearchBar onSearch={onSearch} />

            <CardsListContainer>
                { isLoaded ?
                    <CardList cards={cardsDatas} />
                    : <p>Loading...</p>
                }
            </CardsListContainer>
        </ViewContainer>
    )
}