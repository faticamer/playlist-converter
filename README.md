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

Important Note for Local Usage (Development)
--------------------------------------------

If you're running this application locally, the core functionality will not work, but you will still be able to view the front-end. Reason for this is the absence of **client_id** and **client_secret** that are the part of Spotify API. This data is intentionally hidden through the use of environment variables in the development environment. Therefore, you will not be able to do conversion without these two pieces of information. Since this application is relatively simple in terms of its functionality, I've decided to drop the option of users having to manually create Spotify applications through Spotify API dashboard, and instead simply request an access to these values privately. This scenario is less likely to happen for end-users, since the application will be hosted.

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
Please open a Pull Requst for any code modifications. It is strongly advised that you consider the instructions provided in the first (Development) section of this document.

Issues
------
If you face with any difficulties or inconveniences while using the application, please open a new issue in the Issue tab.

## Happy Converting!