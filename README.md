<div align="center">
    <img src="./client/public/android-chrome-192x192.png">
    <h1>Playlistify 🎶</h1>
    <img src="https://img.shields.io/badge/license-Apache 2.0-red" alt="">
</div>

<b>Playlistify</b> is a web-based project that seeks to seamlessly convert playlists from YouTube to Spotify. It aims to:

- Automate the process of creating playlists
- Provide simple and easy-to-use UI
- Quickly authenticate with Spotify

See Features for more information!

Connecting to Spotify's API
---------------------------
Instructions on how to set this up:
1. Go to [Spotify dashboard](https://developer.spotify.com/dashboard)
1. Click `Create an app`
    - You can now see your `Client ID` and `Client Secret`
1. Now click `Edit Settings`
1. Add `http://localhost:5555/auth/spotify/callback` to the Redirect URI
1. Scroll down and click `Save`
1. You are now ready to authenticate with Spotify!
1. Go back into your project's directory
1. Navigate into `server`
1. Locate `.env.sample` file
1. Using Client ID and Client Secret from your Spotify application, fill `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET`
1. You have completed the Spotify part. Now you have to create YouTube API key.

Creating YouTube API key
------------------------
1. Go to [Google Cloud Console](https://console.cloud.google.com)
1. Go to APIs & Services
1. Navigate to Credentials
1. Click to `Create Credentials` and select API key
1. After few seconds, Google will generate your API key. Copy it and paste it to `YOUTUBE_API_KEY` in `.env.sample` file
1. For `MY_SECRET_KEY` you can go to any password generator web application and generate a random sequence of characters and numbers. It can be any length you want. Make sure to paste it in `.env.sample`.
1. The `PORT` should be set to 5555.
1. Now rename `.env.sample` to `.env` and you're all set!


Features
--------

- Convert playlists from your YouTube profile to Spotify
- List tracks from converted playlist
- Live update of your libraries

Prerequisites
-------------

- [Node.js](https://nodejs.org/en) (Preferably LTS)

Install
-------

Open your Terminal window (Command Prompt, PowerShell, bash, zsh, etc.)

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
Please open a Pull Requst for any code modifications. Pull requests may include bug fixes as well as some new features.

Issues, Suggestions, Feedbacks
------------------------------
If you face with any difficulties or inconveniences while using the application, please open a new issue in the Issue tab. You can also contact me via e-mail at `faticamer17@gmail.com`. Additionally, if you have any new suggestions for improvement, collaboration, etc. feel free to drop a message.

## FAQ

### What to do If I don't want to set up Spotify and YouTube details?

You would have to require all API keys, client IDs, and client secrets that I use for my local environment. Due to security concerns, this option is not available. Many open-source projects follow the same practice that will instruct you on how to setup everything, rather than provide these details per user request.

### Why is this application not hosted?

Spotify keeps all developer apps in *Development Mode*, in which only a limited number of users can issue necessary API calls to Spotify's API. In order to have unlimited number of users that can use the application, Spotify requires you to fill out the form for the app you've developed. Due to the sheer simplicity of the application, as well as the fact that this is merely a hobby project, I decided to skip the whole verification part. GitHub, Cloudflare, and some other providers have the free hosting plan, but this may introduce some complications when you request verification from Spotify for your app.