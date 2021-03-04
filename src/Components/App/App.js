import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar.js';
import { SearchResults } from '../SearchResults/SearchResults.js';
import { Playlist } from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js';
// import { Track } from '../Track/Track';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      searchResults: 
        [{name:'name1', artist: 'artist1', album: 'album1', id: 1 }, {name: 'name2', artist: 'artist2', album: 'album2', id: 2}, {name: 'name3', artist: 'artist3', album: 'album3', id: 3}], 
      playlistName: 'My Playlist',  
      playlistTracks: 
        [{name:'playlistName1', artist: 'playlistArtist1', album: 'playlistAlbum1', id: 4}, {name: 'playlistName2', artist: 'playlistArtist2', album: 'playlistAlbum2', id: 5}, {name: 'playlistName3', artist: 'playlistArtist3', album: 'playlistAlbum3', id: 6}]
      }
      this.addTrack = this.addTrack.bind(this);
      this.removeTrack = this.removeTrack.bind(this);
      this.updatePlaylistName = this.updatePlaylistName.bind(this);
      this.savePlaylist = this.savePlaylist.bind(this);
      this.search = this.search.bind(this);
  }

  addTrack(track) {
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    this.setState({playlistTracks: [...this.state.playlistTracks, track]})
  }

  removeTrack(track) {
    let newPlaylistTracks = this.state.playlistTracks.filter(prevTracks => prevTracks.id !== track.id);
    
    this.setState({playlistTracks: newPlaylistTracks});
  }

  updatePlaylistName(newName) {
    this.setState({playlistName: newName});
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.id);
  }

  search(searchTerm) {
    Spotify.search(searchTerm);
  }

  render() {
    return (
      <div>
        <h1>Ja<span className='highlight'>mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults}/>
            <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
