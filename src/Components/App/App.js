import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar.js';
import { SearchResults } from '../SearchResults/SearchResults.js';
import { Playlist } from '../Playlist/Playlist.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchResults: [{name:'Fly me to the moon', artist: 'Frank Sinatra', album: 'It Might As Well Be Swing', id: '1Mxqyy3pSjf8kZZL4QVxS0' }, {name: 'New York New York', aritst: 'Frank Sinatra', album: 'Duets', id: '2lolQgalUvZDfp5vvVtTYV'}, {name: 'Young at Heart', artist: 'Frank Sinatra', album: 'Sinatra\'s Sinatra', id: '3HBuwtSVm028hyFuwuTiJ5'}] }
  }

  render() {
    return (
      <div>
        <h1>Ja<span className='highlight'>mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}/>
            <Playlist />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
