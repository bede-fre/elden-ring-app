import styled from 'styled-components';
import { spaces } from '../services/styles/spaces';

export function CardList({ cards }) {

    const CardsContainer = styled.div`
        display: flex;
        flex-direction: column;
        gap: ${spaces.m};
    `;

    const CardContainer = styled.div`
        display: flex;
        align-items: center;
    `;

    const CardTextContainer = styled.div`
        display: flex;
        flex-direction: column;
    `;

    const CardSubTextContainer = styled.div`
        display: flex;
        flex-direction: column;
    `;

    const ImageContainer = styled.img`
        width: 200px;
        height: 200px;
    `;

    return (
        <CardsContainer>
            {cards.length >= 1 ? cards.map((card) => (
            <CardContainer>
                {/* <h2>{card.count}</h2> */}
                <ImageContainer src={card.image} alt={card.name}></ImageContainer>

                <CardTextContainer>
                    <CardSubTextContainer>
                        <div>Name</div>
                        {card.name}
                    </CardSubTextContainer>
                    <CardSubTextContainer>
                        <div>Description</div>
                        {card.description}
                    </CardSubTextContainer>
                    {
                        card.affinity ? <CardSubTextContainer>
                            <div>Affinity</div>
                            {card.affinity}
                        </CardSubTextContainer> : null
                    }
                </CardTextContainer>
            </CardContainer>
            )) : null}
        </CardsContainer>
    );
}