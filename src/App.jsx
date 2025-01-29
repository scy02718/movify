import React, { useState, useEffect } from 'react'
import { useDebounce } from 'react-use';
import Search from './components/Search'
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import { use } from 'react';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  // 이걸 여기다가 define 하는 이유: Search 컴포넌트에서 바꿀 수 있고, 그 결과값을 Movies 컴포넌트에서 사용할 수 있음
  // Search component 에다가는 searchTerm 과 setSearchTerm 을 넘겨주고, Movies component 에서는 searchTerm 을 받아서 사용
  // 이렇게 setter 을 전달해주면 컴포넌트끼리 데이터를 주고 받을 수 있음... 근데 그걸 여러 컴포넌트에 많이 전달해주려면
  // useState 보단 useContext 를 사용하는게 더 효율적일 수 있음
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [movies, setMovies] = useState([]);

  // Debounce the search term. This will only be updated when the user stops typing for 500ms
  // Then this is handled by the fetchMovies function, in which the underlying useEffect will depend on debouncedSearchTerm
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  // This is very common to have a loading state when fetching data
  const [isLoading, setIsLoading] = useState(false);

  // You put the parameter of the function in the parenthesis
  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage(null);

    // When you're fetching something, it is good practice to wrap it in a try catch block
    // encodeURIComponent is used to encode special characters in the URL
    try {
      const endpoint = query 
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if(!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();
      
      if (data.Response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovies([]);

        return;
      } else {
        setMovies(data.results || []);
      }


    } catch (e) {
      setErrorMessage("Something went wrong. Please try again later.")
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }

  // This is runs whenever the searchTerm changes
  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <main>
      <div className='pattern'/>
      <div className='wrapper'>
        <header>
          <img src='/hero.png' alt='Hero Banner'/>
          <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className='all-movies'>
          <h2 className='mt-[40px]'>All Movies</h2>
          { isLoading ? (
              <Spinner />
          ) : ( errorMessage ? (
              <p className='text-red-500'>{errorMessage}</p>
            ) : (
              <ul>
                {/* Ul is an unordered list. It has capability of responsively rendering a list */}
                {/* This is a common example of mapping over an array and rendering a list */}
                {/* You can use (movie) => { return ()}, but if you're only returning something, you can use (movie) => () */}
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>
            )
          )
          }
        </section>

      </div>
    </main>
  )
}

export default App