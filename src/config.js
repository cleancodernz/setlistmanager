// config.js
const config = {
  addSongUrl:
    window.location.hostname === "localhost"
      ? "http://localhost:7071/api/addSong"  // Local Azure Function URL
      : "https://setlistaccess.azurewebsites.net/api/addSong?code=YN14BtxCJdU--IQ2PBNj6FYWPulzH84NynE7BkHeeTb_AzFuFnyXkg%3D%3D", // Production Azure Function URL
  getAllSongSongUrl:
      window.location.hostname === "localhost"
        ? "http://localhost:7071/api/setlistaccess"  // Local Azure Function URL
        : "https://setlistaccess.azurewebsites.net/api/setlistaccess?code=F41koAeIxKb2LHORHlumzuQxdU8RiIKjbV87FVGbd_ccAzFu3S5Nfw%3D%3D", // Production Azure Function URL
  spotifyIntegrationJsonUrl:
        window.location.hostname === "localhost"
          ? "http://localhost:7071/api/spotifyintegrationjson?" // Local Azure Function URL
          : "https://spotifyintegrationmach2.azurewebsites.net/api/spotifyintegrationjson?code=8ki0tzc-U8KWcsh6UHeWkbxK8wCtfmfHO4OCqi13dEPsAzFuwrqKGg%3D%3D&", // Production Azure Function URL
  toggleSongUrl:
          window.location.hostname === "localhost"
            ? "http://localhost:7071/api/toggleSongStatus" // Local Azure Function URL
            : "https://setlistaccess.azurewebsites.net/api/toggleSongStatus?code=E_ExPxKmrlEs9UyOV6a9OhqqpzTYvjHmT_fAWy31iexnAzFurebEOA%3D%3D", // Production Azure Function URL
  getActiveSongUrl:
          window.location.hostname === "localhost"
            ? "http://localhost:7071/api/get_songs?active=true" // Local Azure Function URL
            : "https://setlistaccess.azurewebsites.net/api/get_songs?code=F41koAeIxKb2LHORHlumzuQxdU8RiIKjbV87FVGbd_ccAzFu3S5Nfw%3D%3D&active=true", // Production Azure Function URL
  getInactiveSongUrl:
            window.location.hostname === "localhost"
              ? "http://localhost:7071/api/get_songs?active=false" // Local Azure Function URL
              : "https://setlistaccess.azurewebsites.net/api/get_songs?code=F41koAeIxKb2LHORHlumzuQxdU8RiIKjbV87FVGbd_ccAzFu3S5Nfw%3D%3D&active=false", // Production Azure Function URL
  uploadUrl:
            window.location.hostname === "localhost"
            ? "http://localhost:7071/api/uploadsongs" // Local Azure Function URL
            : "https://setlistaccess.azurewebsites.net/api/uploadsongs?code=F41koAeIxKb2LHORHlumzuQxdU8RiIKjbV87FVGbd_ccAzFu3S5Nfw%3D%3D", // Production Azure Function URL
  uploadBulkUrl:
            window.location.hostname === "localhost"
            ? "http://localhost:7071/api/updatesongactivebulk" // Local Azure Function URL
            : "https://setlistaccess.azurewebsites.net/api/updatesongactivebulk?code=F41koAeIxKb2LHORHlumzuQxdU8RiIKjbV87FVGbd_ccAzFu3S5Nfw%3D%3D", // Production Azure Function URL
  checkDbStatusUrl:
            window.location.hostname === "localhost"
            ? "http://localhost:7071/api/checkdbstatus" // Local Azure Function URL
            : "https://setlistaccess.azurewebsites.net/api/checkdbstatus?code=F41koAeIxKb2LHORHlumzuQxdU8RiIKjbV87FVGbd_ccAzFu3S5Nfw%3D%3D" // Production Azure Function URL              
}


export default config;