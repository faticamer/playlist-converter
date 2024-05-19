<div align="center">
    <img src="./client/public/android-chrome-192x192.png">
    <h1>Playlistify 🎶</h1>
    <img src="https://img.shields.io/badge/license-Apache 2.0-red" alt="license MIT">
</div>

<b>Playlistify</b> is a web-based project that seeks to seamlessly convert playlists from one streaming service to another. It aims to:

- Provide simple and easy-to-use UI
- Quickly authenticate with Spotify/YouTube
- Automate the process of transferring songs across streaming services
- Enable additional configuration

See Features for more information!

Features
--------

- Convert YouTube public playlists to Spotify
- Convert Spotify playlists to YouTube
- Clone other user's playlist into your own library
- List tracks from converted playlist

Prerequisites
-------------

- [Node.js](https://nodejs.org/en) (Preferably LTS)
- Terminal (Command Prompt, Power Shell, Bash etc.)

Install
-------

Clone this repository to any location on your PC:
```bash
git clone https://github.com/faticamer/playlist-converter.git
```
NOTE: It would be best to use two terminal windows, because you'll have two local ports opened and running. 
One terminal window should be opened for the client (frontend) and one for the server (backend). 

Navigate to the <b>'client'</b> in the first, and to the <b>'server'</b> in the second terminal, and run the following command:
```bash
npm install
```
This will install all required dependencies. 

Finally, start your application using. Note that you have to start both the client and the server: 
```bash
npm run dev
```
After this you should see that the application started on <b>localhost:5173</b>. Open your browser and navigate to 
<b>localhost:5173</b>. Happy converting!

Pull Requests
-------------
Any PR's are more than welcome. 