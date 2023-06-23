import classNames from 'classnames';
import { useContext } from 'react';
import { CardContext } from '~/context/CardContext';
import { GlobalContext } from '~/context/GlobalContext';
import Hex from '~/icons/Hex';
import RevolutionistIcon from '~/icons/RevolutionistIcon';
import { Container } from './Card.styles';
function findLongestTitle(objArray) {
  return objArray.reduce((prev, current) => prev.title.length > current.title.length ? prev : current);
}

const Card = () => {
  const { cards } = useContext(CardContext);
  const { isMobile } = useContext(GlobalContext);
  const longestCard = cards.length > 0 ? findLongestTitle(cards) : {};

  // car ratio is gonna be 2/3
  return (
    <Container className="h-full w-full">
      <div
        className={classNames(
          'bg-green-700 mt-36 mx-auto relative',
          { 'w-[150px] h-[225px]': isMobile },
          { 'w-[200px] h-[300px] ': !isMobile }
        )}
      >
        <Hex
          size={50}
          stroke="black"
          className="absolute right-[-2px] top-[-15px]"
        >
          <RevolutionistIcon size={55} x={25} y={25} fill="black" />
        </Hex>
      </div>
      <div>PreReqs</div>
      <div>Effect</div>
      <div>Health</div>
      <div>Def Attack</div>
      <div>Title</div>
    </Container>
  );
};

export default Card;
