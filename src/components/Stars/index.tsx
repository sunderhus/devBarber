import React from 'react';
import StarFull from '../../assets/star.svg';
import StarEmpty from '../../assets/star_empty.svg';
import StarHalf from '../../assets/star_half.svg';
import { StarArea, StarText, StarView } from './styles';

interface StarsProps {
  stars: number;
  showNumber: boolean;
}

type VotingStart = 'empty'|'full'|'half'

export default function Stars({stars, showNumber}: StarsProps) {
  let votingStars:VotingStart[] = ['empty', 'empty', 'empty', 'empty', 'empty'];
  let integers = Math.floor(stars);
  let decimals = stars - integers;

  for (var index = 0; index < integers; index++) {
    votingStars[index] = 'full';
  }

  if (decimals > 0) {
    votingStars[index] = 'half';
  }

  return (
    <StarArea>
      {votingStars.map((star, index) => (
        <StarView key={index}>
          {star === 'empty' && (<StarEmpty width="18" height="18" fill="#FF9200" />)}
          {star === 'half' && (<StarHalf width="18" height="18" fill="#FF9200" />)}
          {star === 'full' && (<StarFull width="18" height="18" fill="#FF9200" />)}
        </StarView>
      ))}
      {showNumber && <StarText>{stars}</StarText>}
    </StarArea>
  );
}
