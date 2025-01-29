import React from 'react'

// : 를 사용해서 prop 를 한번 더 destructure 할 수 있음
// This is called presentational component, meaning it only takes props and renders UI, not handling any logic
const MovieCard = ({ movie: 
    { title, vote_average, poster_path, release_date, original_language }
}) => {
    return (
        <div className='movie-card'>
            <img src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : 'no-movie.png'} alt={title} />
        

            <div className='mt-4'>
                <h3>{title}</h3>
                <div className='content'>
                    <div className='rating'>
                        <img src='/star.svg' alt='Star Icon' />
                        <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                    </div>

                    {/* Span can be used to print special characters, a dot that represents separation */}
                    <span>•</span>
                    <p className='lang'>
                        {original_language}
                    </p>
                    <span>•</span>

                    <p className='year'>
                        {release_date ? release_date.split('-')[0] : 'N/A'}
                    </p>
                </div>
            </div>
        </div>

    )
}

export default MovieCard