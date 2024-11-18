import TinderCard from 'react-tinder-card'
import React from "react";


const onSwipe = (direction: string) => {
    console.log('You swiped: ' + direction)
}

const onCardLeftScreen = (myIdentifier: string) => {
    console.log(myIdentifier + ' left the screen')
}

export default function SwipeCard () {
    return (
        <TinderCard onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['right', 'left']}>
            <div>Tino Purmann</div>
        </TinderCard>
    )
}
