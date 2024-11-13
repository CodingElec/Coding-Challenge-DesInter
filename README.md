<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Coding Challenge for a Bank.

-> Single Digit Calculation

Create a function, single_digit, that calculates a "single digit" for an integer n, repeated k times. Use the digit-summing method until a single digit is obtained. Inputs: a string n (large integer), integer k (repetition count).
The single digit is calculated from the sum of all digits, recursively, until the number is one digit long.

-> User Management (CRUD)

Build a CRUD system to manage user data, including name, email, and a list of calculated single digits with parameters and results.
Each user shall have an email, name and list of results calculated for them.
Each object form the result list shall contain the result and the calculation parameters.

-> Memory Cache

Implement a memory cache to store the last 10 unique single-digit calculations, avoiding recalculations for cached values.
You CANNOT use market frameworks for Cache.

-> Encryption

Encrypt user information (name, email) with asymmetric encryption size 2048, using unique public/private keys per user.

-> API 

Create endpoints for: 
 - user CRUD single-digit calculations
 - retrieving user calculations
 - an endpoint to calculate a unique digit.
 - an endpoint to calculate a unique digit and connect it to a user.
 - an endpoint to submit a user’s public key. (String containing the key).

## Project setup

```bash
$ npm install
```
This project uses MongoDB; you must create a .env file with MONGODB_URI='INSERT your connection URI here.'

For the project to run successfully, the setup will create two collections, users and unique digits, on your DB.

## Compile and run the project

```bash
Create a .env file,

# development
$ npm run start

# watch mode
$ npm run start:dev


## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


