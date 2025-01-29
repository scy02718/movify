import React from 'react'

// props 를 그대로 받아서 props.searchTerm 이런 식으로 사용해도 되지만,
// 그러면 반복적이라서 destructuring 을 사용해서 props 에서 searchTerm 만 뽑아서 사용
// Javascript 의 문법임. Object 에서 특정 key 를 뽑아서 사용할 때 사용
const Search = ({ searchTerm, setSearchTerm }) => {
    // There are two rules in React. 
    // 1. DO NOT MUTATE STATE DIRECTLY -> For example, do not do searchTerm = 'hello' Only use the setter function
    // 2. DO NOT MUTATE PROPS WITHIN CHILD COMPONENTS -> For example, do not do props.searchTerm = 'hello'. Props are read-only

    // Whenever you change the content of the input, the state in the parent state will be updated
    // Using useEffect that set dependency as searchTerm, you can fetch the movie API whenever the searchTerm changes
    // This method, however, is problematic. It will fetch the API whenever the user types a letter.
    // This overloads the API and the server, and may cause rate limiting, a bad user experience. 
    // The solution of this problem is called debouncing!!!
    // When using debouncing, you will wait for a certain amount of time before fetching the API
    // For example, if the user stops typing for 500ms, then fetch the API
    // This is possible using useDebounce hook from React 19, npm i react-use.
    return (
        <div className='search'>
            <div>
                <img src="/search.svg" alt="Search Icon" />
                {/* THis is a common example of a controlled input. The value of the input is controlled by the state */}
                {/* event.target.value is the value of the input tag, and use the setter to update the state of parent component */}
                <input
                    type="text"
                    placeholder="Search for a movie..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
    )
}

export default Search