🍿 usePopcorn – Movie Search Application

usePopcorn is a React-based movie search application that allows users to search movies using the OMDb API
, view details, and maintain a personal watched movie list with custom ratings.

🚀 Features

🔍 Search Movies – Search for movies by title using the OMDb API.

🎬 Movie Details – View detailed information such as IMDb rating, runtime, actors, director, and plot.

⭐ Star Rating – Rate movies with a custom star rating component.

📂 Watched List – Add movies to a watched list and track IMDb ratings, user ratings, and runtime.

🗑 Delete Movies – Remove movies from the watched list anytime.

⌨️ Keyboard Shortcuts – Close movie details using the Escape key.

⚡ Loading & Error States – Smooth loading indicators and error messages.

📂 Project Structure
usepopcorn/
│── src/
│   ├── App.js               # Main application component
│   ├── StarRating.js        # Star rating reusable component
│   ├── index.js             # React entry point
│   ├── index.css            # Styling
│   └── ...other components
│
│── public/
│   ├── index.html
│   └── favicon.ico
│
│── package.json
│── README.md

🛠 Installation & Setup

Clone the Repository

git clone https://github.com/yourusername/usepopcorn.git
cd usepopcorn


Install Dependencies

npm install


Get OMDb API Key

Go to OMDb API

Generate your free API key

Replace the KEY in App.js with your API key:

const KEY = "your_api_key_here";


Run the Application

npm start


Build for Production

npm run build

📸 Screenshots
🔍 Search Movies

Users can search movies by title.

🎬 Movie Details

Clicking a movie shows details like rating, runtime, actors, and plot.

⭐ Add to Watched List

Movies can be added to a watched list with user ratings.

🔑 Key Components

App.js – Root component handling search, fetch, and state.

Navbar.js – Header with search bar and results count.

Movielist.js – Displays searched movies.

MovieDetails.js – Fetches and displays selected movie details.

WatchedMovieList.js – Displays the watched movies list.

StarRating.js – Custom rating component.

⚠️ Known Issues

Searching requires at least 3 characters.

Free OMDb API key has request limits (1,000/day).

🛡 License

This project is licensed under the MIT License.