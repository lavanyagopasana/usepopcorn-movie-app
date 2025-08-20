import { useState ,useEffect} from "react";
import StarRating from './StarRating';
const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const KEY = process.env.REACT_APP_OMDB_KEY;

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [query,setQuery] = useState("")
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState([]);
  const [isLoading,setIsLoading]=useState(false)
  const [error,setError]=useState('')
  const [selectedId,setSelectedId] = useState("tt5295894")

  // useEffect(function() {
  //   console.log('A')
  // },[])

  // useEffect(function() {
  //   console.log('B')
  // })
  // console.log('c')

  function handleSelectMovie(id){
    setSelectedId(selectedId => id === selectedId ? null : id )
  }

  function handleCloseMovie(){
    setSelectedId(null);
  }

  function handleAddWatched(movie){
    setWatched(watched=> [...watched,movie])
  }

  function handleDeleteWatched(id){
    setWatched(watched => watched.filter(movie => movie.imdbID !== id))
  }

  
  useEffect(
    function(){
      const controller = new AbortController();
      async function fetcchMovies() {
      try{
        setIsLoading(true)
        setError('')
      const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,{signal : controller.signal})
      
      if(!res.ok) throw new Error("Something went wrong with fetching movies")
      
      const data = await res.json()
      if(data.Response === "False") throw new Error("Movie not found")
      
        setMovies(data.Search)
        setError("")
        }
        catch(err){

          if (err!=="AbortError"){
            console.log(err.message)
            setError(err.message)
          }
        }
        finally{
          setIsLoading(false);
        }
  }

  if(query.length < 3){
    setMovies([])
    setError("")
    return
  }

  handleCloseMovie()
    fetcchMovies();

    return function(){
      controller.abort();
    }
  }, [query])

  
  
  return (
    <>
    <Navbar >
    <Search query={query} setQuery={setQuery} />
    <Numresults movies={movies} />
    </Navbar>
    <Main >
    <Box  >
    {/* {isLoading ? <Loader/> : <Movielist movies={movies} />} */}
    {isLoading && <Loader/>}
    {!isLoading && !error &&  <Movielist movies={movies} onSelectMovie={handleSelectMovie} />}
    {error && <ErrorMessage message={error}/>}
    
    </Box>
    <Box>         
       { 
          selectedId ? <MovieDetails 
          selectedId={selectedId} 
          onCloseMovie={handleCloseMovie} 
          onAddWatched={handleAddWatched}
          watched={watched}
          />  :
          <>
          <WatchedSummary watched={watched} />
          <WatchedMovieList watched={watched}  onDeleteWatched={handleDeleteWatched}/>
          </>
        }
    </Box>
    </Main>
    </>
  );
}



function Loader(){
  return <p className="loader">Loading..</p>
}

function ErrorMessage({message}){
  return <p className="error">
    <span>😓</span>
    {message}
  </p>
}

function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo/>
      {children}
    </nav>
  );
}
function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search({query,setQuery}) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
function Numresults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
function Main({ children }) {
  return (
    <main className="main">
      {children}
    </main>
  );
}
function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}


function Movielist({ movies ,onSelectMovie}) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie}  KEY={movie.imdbID} onSelectMovie={onSelectMovie}/>
      ))}
    </ul>
  );
}
function Movie({ movie ,onSelectMovie}) {
  return (
    <li onClick={()=> onSelectMovie(movie.imdbID)} key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}


function  MovieDetails({selectedId, onCloseMovie, onAddWatched,watched}){

  const [movie,setMovie] = useState({})
  const [isloading, setIsLoading] = useState(false)
  const [userRating,setUserRating] = useState("")

  const iswatched = watched.map(movie=>movie.imdbID).includes(selectedId)
  const watchedUserRating = watched.find(movie => movie.imdbID === selectedId)?.userRating

  console.log(iswatched)
  const {Title:title, Year : year , Poster :poster , Runtime :runtime , imdbRating ,Plot : plot,
  Released : released, Actors : actors ,Director : director ,Genre : genre} = movie

  console.log(title,year)

  function handleAdd(){
    const newMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(' ').at(0)),
      userRating,
     }

    onAddWatched(newMovie);
    onCloseMovie();
}


useEffect(function(){
  function callback(e){
      if(e.code === 'Escape'){
        onCloseMovie()
      }
    }

    document.addEventListener('keydown',callback)

    return function(){
      document.removeEventListener('keydown',callback)
    }
  },[onCloseMovie])


  useEffect(function(){
    async function getMovieDetails(){
      setIsLoading(true);
      const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`)
    
    const data = await res.json();
    setMovie(data)
    setIsLoading(false)
    }
    getMovieDetails();
  },[selectedId])


  useEffect(function(){
    if(!title) return;
    document.title =`Movie | ${title}`

    return function(){
      document.title =" usePopcorn";
      console.log(`Clean up effect for movie ${title}`)
    }
  },[title])

  
  return <div className="details">
    {isloading ? <Loader/>  : 
    <>
    <header>
  <button className="btn-back" onClick={onCloseMovie}>
    &larr;
  </button>
  <img src={poster} alt={`poster of a ${movie} movie`}></img>
  <div className="details-overview">
    <h2>{title}
    </h2>
    <p>{released} &bull; {runtime}</p>
    <p>{genre}</p>
    <p><span>⭐</span>{imdbRating} IMDB rating</p>
  </div>
  </header>
  <section>
    <div className="rating">
    {!iswatched ?
    <>
      <StarRating  
      maxRating={10} 
      size={24} 
      onSetRating={setUserRating}
      />
      {userRating > 0 && (
      <button className="btn-add" onClick=
      {handleAdd}>
      + Add to list
      </button>
      )}{""}
    </> : 
    ( <p>You rated with movie {watchedUserRating} <span>⭐</span></p> )}
    </div>
    <p><em>{plot}</em></p>
    <p>Starring {actors}</p>
    <p>Directed by {director}</p>
  </section> 
  </>
  }
  </div>
  }


// function WatchedBox() {
//   const [watched, setWatched] = useState(tempWatchedData);
//   const [isOpen2, setIsOpen2] = useState(true);
//   return (
//     <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen2((open) => !open)}
//       >
//         {isOpen2 ? "–" : "+"}
//       </button>
//       {isOpen2 && (
//         <>
//           <WatchedSummary watched={watched} />
//           <WatchedMovieList watched={watched} />
//         </>
//       )}
//     </div>
//   );
// }
function WatchedMovieList({ watched ,onDeleteWatched}) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID}  onDeleteWatched={onDeleteWatched} />

      ))}
    </ul>
  );
}
function WatchedMovie({ movie ,onDeleteWatched}) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>

        <button className="btn-delete" onClick={() => onDeleteWatched(movie.imdbID)}>X</button>
      </div>
    </li>
  );
}
function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
