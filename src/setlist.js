// Fetch songs from the Azure Function
async function fetchSongs() {
    const response = await fetch('https://setlistaccess.azurewebsites.net/api/setlistaccess?code=F41koAeIxKb2LHORHlumzuQxdU8RiIKjbV87FVGbd_ccAzFu3S5Nfw%3D%3D');
    const songs = await response.json();
    return songs;
}

// Display the songs in a list that supports drag-and-drop reordering
// function displaySongs(songs) {
//     const setlist = document.getElementById('setlist');
//     setlist.innerHTML = ''; // Clear the list

//     songs.forEach((song, index) => {
//         const listItem = document.createElement('li');
//         listItem.className = 'song-item';
//         listItem.setAttribute('data-id', index); // Use index as unique identifier
//         listItem.textContent = `${song.song_name} - ${song.artist} (${song.length} min, ${song.release_year})`;
//         setlist.appendChild(listItem);

//         const songs = [
//             { song_name: 'Song 1', artist: 'Artist 1', length: 3, release_year: 2020 },

//     });

//     // Initialize Sortable.js to allow drag-and-drop reordering
//     Sortable.create(setlist, {
//         animation: 150, // Animation speed in ms when moving items
//         onEnd: function (/**Event*/evt) {
//             // Logic after the song order has been changed
//             console.log('New order:', getCurrentSetlistOrder());
//         }
//     });
// }

// Get the current order of the setlist based on the DOM
function getCurrentSetlistOrder() {
    const setlistItems = document.querySelectorAll('#setlist .song-item');
    const orderedSongs = Array.from(setlistItems).map((item) => item.textContent);
    return orderedSongs;
}

// Save the reordered setlist (for demonstration, logs the result)
document.getElementById('save-setlist').addEventListener('click', () => {
    const reorderedSetlist = getCurrentSetlistOrder();
    console.log('Setlist saved:', reorderedSetlist);
    // You can send this reordered setlist back to your Azure Function or save it in local storage
});

// Initialize the song fetching when the page loads
window.onload = fetchSongs;
