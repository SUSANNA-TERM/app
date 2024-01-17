# SUSANNA - Frontend App

This repository contains the frontend code for the user-side SUSANNA app.

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Configuration](#configuration)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [License](#license)

## Introduction

This app is part of a comprehensive system that allows consumers to interact with the water management system. Users can register, log in, view their water consumption, bills, and access general statistics about the locations where the water management system is applied.

## Prerequisites

To use the SUSANNA app, you need:

- Node.js and npm installed
- A running instance of the SUSANNA API
- A template of a ricardian contract, see [this](https://github.com/SUSANNA-TERM/ricardian-contracts) repo

<!-- mention specific versions  -->

## Configuration

Before starting the app, create a config.json file in the root directory with the following structure:

```
{
    "server": {
        "domain": "localhost",
        "port": "3000"
    },
    "template": {
        "location": "<location-of-the-ricardian-contract-template>"
    }
}
```

This configuration file includes settings for the server and the ricardian dontract.

## Installation

1. Clone the repository with `git clone https://github.com/SUSANNA-TERM/app.git`
2. Navigate to the project directory.
3. Install dependencies with `npm install`

## Usage

1. Start the app with `npm start` or with `npm run serve` to watch for file changes 
2. Access the app in your browser at http://localhost:3000 or the specified port.

## Features

**User Registration**

Users can register in the water management system by signing a contract.

**User Login**

Registered users can log in using the signed contract in order to access personalized information.

**View Consumption and Bills**

Users can view their water consumption details and bills after logging in.

**General Statistics**

Users have access to general statistics about the locations where the water management system is applied.

## License

This project is licensed under the ...
