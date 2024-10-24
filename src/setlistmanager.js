document.addEventListener('DOMContentLoaded', function () {
    loadSongs();
});

// Load songs from the database
async function loadSongs() {
    try {
        //const activeSongsResponse = await fetch('http://localhost:7071/api/get_songs?active=true'); // Azure function endpoint for active songs            
        const activeSongsResponse = await fetch('https://setlistaccess.azurewebsites.net/api/get_songs?code=F41koAeIxKb2LHORHlumzuQxdU8RiIKjbV87FVGbd_ccAzFu3S5Nfw%3D%3D&active=true'); // Azure function endpoint for active songs
        //const inactiveSongsResponse = await fetch('http://localhost:7071/api/get_songs?active=false'); // Azure function endpoint for inactive songs
        const inactiveSongsResponse = await fetch('https://setlistaccess.azurewebsites.net/api/get_songs?code=F41koAeIxKb2LHORHlumzuQxdU8RiIKjbV87FVGbd_ccAzFu3S5Nfw%3D%3D&active=false'); // Azure function endpoint for active songs

        const activeSongs = await activeSongsResponse.json();
        const inactiveSongs = await inactiveSongsResponse.json();

        renderSongs('activeSongsList', activeSongs, true);
        renderSongs('inactiveSongsList', inactiveSongs, false);
    } catch (error) {
        console.error('Error fetching songs:', error);
    }
}

// Render songs to the page
function renderSongs(containerId, songs, isActive) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content

    songs.forEach(song => {
        const songTile = document.createElement('div');
        songTile.classList.add('song-tile');
        songTile.innerHTML = `
            <span>${song.song_name} by ${song.artist} (${song.length})</span>
            <button class="toggle-status-button">${isActive ? 'Mark Inactive' : 'Mark Active'}</button>
        `;

        songTile.querySelector('.toggle-status-button').addEventListener('click', function () {
            toggleSongStatus(song.id, isActive);
        });

        container.appendChild(songTile);
    });
}

// Toggle song between active and inactive
async function toggleSongStatus(songId, isActive) {
    try {
        
        //const response = await fetch(`http://localhost:7071/api/toggleSongStatus`, {
        const response = await fetch(`https://setlistaccess.azurewebsites.net/api/toggleSongStatus?code=E_ExPxKmrlEs9UyOV6a9OhqqpzTYvjHmT_fAWy31iexnAzFurebEOA%3D%3D`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ songId, isActive })
        });

        if (response.ok) {
            loadSongs(); // Reload songs after successful toggle
        } else {
            console.error('Failed to toggle song status');
        }
    } catch (error) {
        console.error('Error toggling song status:', error);
    }
}

// Search Spotify API for new songs
document.getElementById('searchSpotifyButton').addEventListener('click', async function () {
    const searchQuery = document.getElementById('searchSong').value;
    if (!searchQuery) return;

    try {
        //const response = await fetch(`http://localhost:7071/api/searchSpotify?song=${searchQuery}`); // Azure function to search Spotify API
        //const response = await fetch(`http://localhost:7071/api/spotifyintegrationjson?query=${encodeURIComponent(searchQuery)}`);
        const response = await fetch(`https://spotifyintegrationmach2.azurewebsites.net/api/spotifyintegrationjson?code=8ki0tzc-U8KWcsh6UHeWkbxK8wCtfmfHO4OCqi13dEPsAzFuwrqKGg%3D%3D&query=${encodeURIComponent(searchQuery)}`);            
        const searchResults = await response.json();

        displaySpotifySearchResults(searchResults);
    } catch (error) {
        console.error('Error searching Spotify:', error);
    }
});

// Display Spotify search results
function displaySpotifySearchResults(results) {
    const resultsContainer = document.getElementById('spotifySearchResults');
    resultsContainer.innerHTML = ''; // Clear previous results

    results.forEach(song => {
        const songTile = document.createElement('div');
        songTile.classList.add('song-tile');
        songTile.innerHTML = `
            <span>${song.song_name} by ${song.artist} released ${song.release_year} length:(${formatDuration(song.length)})</span>
            <button class="add-song-button">Add Song</button>
        `;

        songTile.querySelector('.add-song-button').addEventListener('click', function () {
            addSongToDatabase(song);
        });

        resultsContainer.appendChild(songTile);
    });
}

// Add selected song to the database
async function addSongToDatabase(song) {
    try {
        //const response = await fetch(`http://localhost:7071/api/addSong`, {
        const response = await fetch(`https://setlistaccess.azurewebsites.net/api/addSong?code=YN14BtxCJdU--IQ2PBNj6FYWPulzH84NynE7BkHeeTb_AzFuFnyXkg%3D%3D`, {            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                song_name: song.song_name,
                artist: song.artist,
                length: formatDuration(song.length),
                release_year: new Date(song.release_year).getFullYear()
            })
        });

        if (response.ok) {
            loadSongs(); // Reload songs after adding
        } else {
            console.error('Failed to add song to the database');
        }
    } catch (error) {
        console.error('Error adding song to database:', error);
    }
}

// Format song duration (from s to mm:ss)
function formatDuration(duration) {
    durationMs = (duration*1000)
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}
