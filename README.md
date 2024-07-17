<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/uri1001/the-auth-app">
    <img src="assets/logo.png" alt="Logo" width="80" height="112">
  </a>

<h3 align="center">The Authentication App</h3>

  <p align="center">
    Authentication & Authorization Node Server App Project
    <br />
    <br />
    <a href="https://github.com/uri1001/the-auth-app/graphs/contributors">
        <img src="https://img.shields.io/github/contributors/uri1001/the-auth-app.svg?colorA=21262d&colorB=161b22&style=flat" alt="Contributors">
    </a>
    <a href="https://github.com/uri1001/the-auth-app/forks">
        <img src="https://img.shields.io/github/forks/uri1001/the-auth-app.svg?colorA=21262d&colorB=161b22&style=flat" alt="Forks">
    </a>
    <a href="https://github.com/uri1001/the-auth-app/issues">
        <img src="https://img.shields.io/github/issues/uri1001/the-auth-app.svg?colorA=21262d&colorB=161b22&style=flat" alt="Issues">
    </a>
    <a href="https://github.com/uri1001/the-auth-app/graphs/commit-activity">
        <img src="https://img.shields.io/github/commit-activity/m/uri1001/the-auth-app.svg?colorA=21262d&colorB=161b22&style=flat" alt="Commits">
    </a>
    <a href="https://github.com/uri1001/the-auth-app/pulse">
        <img src="https://img.shields.io/github/watchers/uri1001/the-auth-app.svg?colorA=21262d&colorB=161b22&style=flat" alt="Watchers">
    </a>
    <br />
    <a href="https://github.com/uri1001/the-auth-app/issues">
        <img src="https://img.shields.io/badge/version-0.1.0-X?colorA=21262d&colorB=161b22&style=flat" alt="Version">
    </a>
    <a href="https://github.com/uri1001/the-auth-app/blob/master/LICENSE">
        <img src="https://img.shields.io/github/license/uri1001/the-auth-app.svg?colorA=21262d&colorB=161b22&style=flat" alt="License">
    </a>
    <br />
    <br />
    <a href="https://github.com/uri1001/the-auth-app/">
        <img src="https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=Ethereum&logoColor=white" alt="Ethereum">
    </a>
    <br />
    <br />
    <a href="https://github.com/uri1001/the-auth-app">
        <img src="https://img.shields.io/badge/Explore-Docs-X?colorA=21262d&colorB=161b22&style=for-the-badge" alt="Explore-Docs">
    </a>
    <br />
    <br />
    <a href="https://github.com/uri1001/the-auth-app/issues">
        <img src="https://img.shields.io/badge/Report-Bug-X?colorA=21262d&colorB=161b22&style=for-the-badge" alt="Report-Bug">
    </a>
    &nbsp;
    <a href="https://github.com/uri1001/the-auth-app/issues">
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
        <a href="#4-resources-&-tools">Resources & Tools</a>
    </li>
    <li><a href="#5-contact">Contact</a></li>
    <li><a href="#6-license">License</a></li>
  </ol>
</details>
<br />

<!-- ABOUT THE PROJECT -->

## 1. About The Project

Express Node Server with Authentication & Authorization

Experimental server to test with different web service authentication methods. The private-protected endpoints return information from the database and from the authenticated user.
<br/>
<br/>
Integrates the following authentication strategies:
<br/>

-   Simple username - password
-   OAuth2 with GitHub
-   Open ID Connect with Google
-   Radius Server (requires external Radius server running)
-   Verifiable Credentials with Werify (requires external server)
    <br/>

The system cointaines 2 types of JSON databases:

1. Users authentication database - encrypted with symmetric key encryption

2. Blockchain database - accounts, contracts, networks & wallets - not encrypted
   <br/>

Development has been done with minimal dependencies use.

See the [open issues](https://github.com/uri1001/the-auth-app/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- PROJECT INITIALIZATION -->

## 2. Project Initialization

### 2.1. Prerequisites

<b>Package Manager Installation - Node Package Manager (npm)</b>

-   npm global installation

    ```sh
    npm install npm@latest -g
    ```

<b>JSON Web Token (JWT) Public-Private Key Pair (AES-256) Generation with OpenSSL</b>

-   generate private key

    ```sh
    openssl genpkey -algorithm rsa -out private-key.pem -aes256
    ```

-   generate public key

    ```sh
    openssl rsa -pubout -in private-key.pem -out public-key.pem
    ```

-   extract private key

    ```sh
    cat private-key.pem
    ```

-   extract public key

    ```sh
    cat public-key.pem
    ```

<b>Database Encryption Key (AES-256) Generation with OpenSSL</b>

-   generate 256-bit key (32 Bytes)

    ```sh
    openssl rand -base64 32
    ```

-   generate 128-bit iv (16 bytes)

    ```sh
    openssl rand -base64 16
    ```

### 2.2. Installation

1. <b>Clone the Repository</b>

    ```sh
    git clone https://github.com/uri1001/the-auth-app.git
    ```

2. <b>Proceed to Set Up the Project (bash & powershell supported)</b>

    ```sh
    npm run setup or npm run setup:pwsh
    ```

3. <b>Introduce to `.env` the Enviroment Variables & Generated Keys</b>

    ```js
    PORT=<server-port-number>
    .
    .
    .
    ```

    note that default values are provided for a quick set up

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- PROJECT USAGE -->

## 3. Project Usage

<b>App Initialization</b>

-   system os - bash command

    ```sh
    npm run server
    ```

-   system os - powershell command

    ```sh
    npm run server:pwsh
    ```

-   docker instance - command

    ```sh
    npm run server:docker
    ```

<br />

<b>Pre-Loaded Authenticated Users</b>

-   alice user

    ```sh
    username: alice
    password: alice
    ```

-   bob user

    ```sh
    username: bob
    password: bob
    ```

    note that it requires using the default database encryption key

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- RESOURCES & TOOLS -->

## 4. Resources & Tools

localtunnel - share web service on your local development machine - [website](https://theboroer.github.io/localtunnel-www/)

jwt.io - decode, verify, & generate JWT - [website](https://jwt.io/)

web toolkit online - useful online tools for developers - [website](https://www.webtoolkitonline.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## 5. Contact

Oriol Rodríguez Setó - uri1001@pm.me

Project Link: [https://github.com/uri1001/the-auth-app](https://github.com/uri1001/the-auth-app)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## 6. License

Distributed under the AGPL-3.0 License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
