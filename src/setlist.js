// Fetch songs from the Azure Function
async function fetchSongs() {
    //alert('fetching songs');
    const response = await fetch('https://setlistaccess.azurewebsites.net/api/setlistaccess?code=F41koAeIxKb2LHORHlumzuQxdU8RiIKjbV87FVGbd_ccAzFu3S5Nfw%3D%3D');
    //const response = await fetch('http://localhost:7071/api/setlistaccess'); 
    const songs = await response.json();
    //alert('fetching songs' + songs);
    displaySongs(songs);
}

// Display the songs in a list that supports drag-and-drop reordering
function displaySongs(songs) {
    // Generate song tiles
    const tileContainer = document.getElementById('tileContainer');
    songs.forEach((song, index) => {
        const songTile = document.createElement('div');
        songTile.classList.add('song-tile');
        songTile.dataset.index = index;
        songTile.textContent = `${song.song_name} - ${song.artist} (${song.length} min, ${song.release_year})`;
        tileContainer.appendChild(songTile);
    });

    // Make the song tiles sortable using Sortable.js
    const sortable = new Sortable(tileContainer, {
        animation: 150,
        onEnd: function () {
            console.log("Order has been changed");
        }
    });
}

// Initialize the song fetching when the page loads
window.onload = fetchSongs;
