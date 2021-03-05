const clientId = '';
const redirectUri = 'https://music-app-jam.surge.sh/' //'http://localhost:3000/' 
let accessToken;

const Spotify = {
    getAccessToken() {
        if(accessToken) {
            return accessToken;
        } 
        // Check for access token match
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if(accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            // Clear the parameters, allowing to grab a new access token when it expires
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
        }
    },

    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
        }
        ).then(response => response.json())
         .then(jsonResponse => {
            if(!jsonResponse.tracks) {
                return [];
            } 
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
                }))
            }
        )
    },

    savePlaylist(playlistName, trackURIs) {
        if(!playlistName && !trackURIs.length) {
            return;
        }
        const accessToken = Spotify.getAccessToken();
        const headers = {
                            Authorization: 'Bearer ' + accessToken,
                            'Content-Type': 'application/json'
                        };
        let userID;
        
        // Get the user's id
        return fetch('https://api.spotify.com/v1/me', {headers: headers}
        ).then(response => response.json())
         .then(responseJson => {
             userID = responseJson.id;
            // Make a POST request that creates a new playlist
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, 
            {
                method: 'POST', 
                headers: headers, 
                body: JSON.stringify({ name: playlistName })
            }).then(response => response.json()
            ).then(responseJson => {
                const playlistID = responseJson.id;
            // Save the tracks to the playlist
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, 
                {
                    method: 'POST', 
                    headers: headers, 
                    body: JSON.stringify({uris: trackURIs})
                })
            })        
        })
    }
}

export default Spotify;

