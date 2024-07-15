<div align="center">
    <img src="./client/public/android-chrome-192x192.png">
    <h1>Playlistify 🎶</h1>
    <img src="https://img.shields.io/badge/license-Apache 2.0-red" alt="license MIT">
</div>

<b>Playlistify</b> is a web-based project that seeks to seamlessly convert playlists from one streaming service to another. It aims to:

- Automate the process of creating playlists
- Provide simple and easy-to-use UI
- Quickly authenticate with Spotify/YouTube

See Features for more information!

Features
--------

- Convert playlists from your YouTube profile to Spotify
- Convert playlists from your Spotify profile to YouTube
- List tracks from converted playlist
- Live update of your libraries

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
Navigate into cloned directory and install required dependencies:
```bash
npm install
```
Run the application:
```bash
npm start
```
After this you should see that the application started on <b>localhost:5173</b>. Open your browser and navigate to 
<b>localhost:5173</b>. Happy converting!

Terraform, Docker, Kubernetes, and Jenkins
-------------
This repository contains terraform file for infrastructure deployment of servers, autoscaling, security groups and load balancers on AWS, files for dockerization and kubernetes deployment as well as Jenkins CI/CD pipeline with SonarCloud, Snyk, Playwright and OWASP ZAP testing.

Pull Requests
-------------
Any PR's are more than welcome. 