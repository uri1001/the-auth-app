<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/uri1001/the-node-passport-app">
    <img src="assets/logo.png" alt="Logo" width="80" height="112">
  </a>

<h3 align="center">The Node Passport App</h3>

  <p align="center">
    Authentication & Authorization Node App Project With Passport
    <br />
    <br />
    <a href="https://github.com/uri1001/the-node-passport-app/graphs/contributors">
        <img src="https://img.shields.io/github/contributors/uri1001/the-node-passport-app.svg?colorA=21262d&colorB=161b22&style=flat" alt="Contributors">
    </a>
    <a href="https://github.com/uri1001/the-node-passport-app/forks">
        <img src="https://img.shields.io/github/forks/uri1001/the-node-passport-app.svg?colorA=21262d&colorB=161b22&style=flat" alt="Forks">
    </a>
    <a href="https://github.com/uri1001/the-node-passport-app/issues">
        <img src="https://img.shields.io/github/issues/uri1001/the-node-passport-app.svg?colorA=21262d&colorB=161b22&style=flat" alt="Issues">
    </a>
    <a href="https://github.com/uri1001/the-node-passport-app/graphs/commit-activity">
        <img src="https://img.shields.io/github/commit-activity/m/uri1001/the-node-passport-app.svg?colorA=21262d&colorB=161b22&style=flat" alt="Commits">
    </a>
    <a href="https://github.com/uri1001/the-node-passport-app/pulse">
        <img src="https://img.shields.io/github/watchers/uri1001/the-node-passport-app.svg?colorA=21262d&colorB=161b22&style=flat" alt="Watchers">
    </a>
    <br />
    <a href="https://github.com/uri1001/the-node-passport-app/issues">
        <img src="https://img.shields.io/badge/version-0.1.0-X?colorA=21262d&colorB=161b22&style=flat" alt="Version">
    </a>
    <a href="https://github.com/uri1001/the-node-passport-app/blob/master/LICENSE">
        <img src="https://img.shields.io/github/license/uri1001/the-node-passport-app.svg?colorA=21262d&colorB=161b22&style=flat" alt="License">
    </a>
    <br />
    <br />
    <a href="https://github.com/uri1001/the-node-passport-app/">
        <img src="https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=Ethereum&logoColor=white" alt="Ethereum">
    </a>
    <br />
    <br />
    <a href="https://github.com/uri1001/the-node-passport-app">
        <img src="https://img.shields.io/badge/Explore-Docs-X?colorA=21262d&colorB=161b22&style=for-the-badge" alt="Explore-Docs">
    </a>
    <br />
    <br />
    <a href="https://github.com/uri1001/the-node-passport-app/issues">
        <img src="https://img.shields.io/badge/Report-Bug-X?colorA=21262d&colorB=161b22&style=for-the-badge" alt="Report-Bug">
    </a>
    &nbsp;
    <a href="https://github.com/uri1001/the-node-passport-app/issues">
        <img src="https://img.shields.io/badge/Request-Feature-X?colorA=21262d&colorB=161b22&style=for-the-badge" alt="Request-Feature">
    </a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<br />
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
        <a href="#1-about-the-project">About The Project</a>
    </li>
    <li>
        <a href="#2-project-initialization">Project Initialization</a>
        <ol>
            <li><a href="#21-prerequisites">Prerequisites</a></li>
            <li><a href="#22-installation">Installation</a></li>
        </ol>
    </li>
    <li>
        <a href="#3-project-usage">Project Usage</a>
    </li>
    <li>
        <a href="#4-tools">Tools</a>
    </li>
    <li>
        <a href="#5-resources">Resources</a>
        <ol>
            <li><a href="#51-dependencies-documentation">Dependencies Documentation</a></li>
        </ol>
    </li>
    <li><a href="#6-contact">Contact</a></li>
    <li><a href="#7-license">License</a></li>
  </ol>
</details>
<br />

<!-- ABOUT THE PROJECT -->

## 1. About The Project

Express Node Server with Authentication & Authorization

Experimental server to test with different web service authentication methods. The protected endpoints return information about EVM networks and authenticated account information.
<br/>
<br/>
Integrates the following authentication methods:
<br/>

-   Simple username - password
-   OAuth2 with GitHub
-   Open ID Connect with Google
-   Radius Server (requires external Radius server running)
    <br/>

Development has been done with minimal dependencies use.

See the [open issues](https://github.com/uri1001/the-node-passport-app/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- PROJECT INITIALIZATION -->

## 2. Project Initialization

### 2.1. Prerequisites

Package manager installation (npm)

-   npm
    ```sh
    npm install npm@latest -g
    ```

### 2.2. Installation

1. Clone the repo
    ```sh
    git clone https://github.com/uri1001/the-node-passport-app.git
    ```
2. Proceed to set up the project
    ```sh
    npm run setup
    ```
3. Introduce to `.env` the server port number and other missing values
    ```js
    PORT = 'server-listen-port-number'
    ```

Database Encryption Keys

-   Generate 256-bit Key (32 Bytes)
    ```sh
    openssl rand -base64 32
    ```
-   Generate 128-bit IV (16 Bytes)
    ```sh
    openssl rand -base64 16
    ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- PROJECT USAGE -->

## 3. Project Usage

App initialization (npm)

-   npm

    ```sh
    npm run start
    ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- TOOLS -->

## 4. Tools

TO BE DONE

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- RESOURCES -->

## 5. Resources

### 5.1. Dependencies Documentation

-   Morgan Documentation - [Official Docs](https://github.com/expressjs/morgan#morgan)

-   Express Validator Documentation - [GitHub Repository](https://github.com/express-validator/express-validator)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## 6. Contact

Oriol Rodríguez Setó - uri1001@pm.me

Project Link: [https://github.com/uri1001/the-node-passport-app](https://github.com/uri1001/the-node-passport-app)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## 7. License

Distributed under the AGPL-3.0 License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
