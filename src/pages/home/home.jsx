import { Link } from 'react-router-dom';
import './home.css';

function Card({ title, number, date }) {
  return (
    <Link className="card" to='/description' state={{ signNumber: number}} >
      <p className="card__title">{ title }</p>
      <img src={`/assets/images/${ number + 1 }.png`} className="card__image" />
      <p className="card__desc">{ date }</p>
    </Link>
  )
}

export default function Home({ cards }) {  

  return (
    <>
      <section className='cards-list'>
        <div className="wrapper">
          {
            cards.map((card, i) => <Card key={i} title={ card.title } number={ i } date={ card.date }/> )
          }
        </div>
      </section>
    </>
  );
};