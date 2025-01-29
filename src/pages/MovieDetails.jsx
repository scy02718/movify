import React from 'react'
import { useParams } from 'react-router-dom'

const MovieDetails = () => {
    const { movieId } = useParams();

    return (
        <div>MovieDetails</div>
    )
}

export default MovieDetails