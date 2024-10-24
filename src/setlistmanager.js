document.addEventListener('DOMContentLoaded', function () {
    loadSongs();
});

import config from './config.js';

// Load songs from the database
async function loadSongs() {
    try {

        const activeSongUrl = config.getActiveSongUrl;
        const inactiveSongUrl = config.getInactiveSongUrl;

        const activeSongsResponse = await fetch(`${activeSongUrl}`); // Azure function endpoint for active songs        
        const inactiveSongsResponse = await fetch(`${inactiveSongUrl}`); // Azure function endpoint for active songs

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
        
        const toggleSongUrl = config.toggleSongUrl;

        const response = await fetch(`${toggleSongUrl}`, {
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

        const spotifyIntegrationJsonUrl = config.spotifyIntegrationJsonUrl;

        const response = await fetch(`${spotifyIntegrationJsonUrl}&query=${encodeURIComponent(searchQuery)}`);            
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

        const addSongUrl = config.addSongUrl;

        const response = await fetch(`${addSongUrl}`, {            
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
