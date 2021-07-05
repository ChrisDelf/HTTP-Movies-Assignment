import React ,{useState, useEffect} from 'react';

const MovieCard = props => {
  const { title, director, metascore, stars } = props.movie;
  const [ starsArray, setStarsArray] = useState([])

  useEffect(() => {
   setStarsArray([stars])
  }, []);

  console.log('Props in MovieCard', stars);
  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>
    <>
    {console.log("stars array", Array.isArray(stars), stars)}
        {starsArray === null ? (
          <div>No actors</div>
        ) : (
          starsArray.map(star => (
            <div key={star} className="movie-star">
              {star}
            </div>
          ))
        )}
      </>
    </div>
  );
};

export default MovieCard;
