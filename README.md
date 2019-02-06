# plasma-js-lib
[![Coverage Status](https://coveralls.io/repos/github/plasma-group/plasma-js-lib/badge.svg?branch=master)](https://coveralls.io/github/plasma-group/plasma-js-lib?branch=master) [![Build Status](https://travis-ci.org/plasma-group/plasma-js-lib.svg?branch=master)](https://travis-ci.org/plasma-group/plasma-js-lib)

`plasma-js-lib` is a JavaScript client library for interacting with PG Plasma clients.
`plasma-js-lib` effectively wraps the JSON-RPC interface that our plasma clients expose and provides a nice API for app developers to work with.

## Installation
There are several easy ways to start using `plasma-js-lib`! 

### Node.js Apps
If you're developing a `Node.js` application, you can simply install `plasma-js-lib` via `npm`:

```
$ npm install --save plasma-js-lib
```

### Browser Apps
If you're developing a browser application, we provide a compressed and minified version of `plasma-js-lib` that you can include in a `<script>` tag.

```
<script src="https://raw.githubusercontent.com/plasma-group/plasma-js-lib/master/dist/plasma-js-lib.min.js" type="text/javascript"></script>
```

## Documentation
`plasma-js-lib` API documentation is available [here](https://plasma-js-lib.readthedocs.io/en/latest/).

## Contributing
Welcome! If you're looking to contribute to `plasma-js-lib`, you're in the right place.

### Contributing Guide and CoC
Plasma Group follows a [Contributing Guide and Code of Conduct](https://github.com/plasma-group/plasma-js-lib/blob/master/.github/CONTRIBUTING.md) adapted slightly from the [Contributor Covenant](https://www.contributor-covenant.org/version/1/4/code-of-conduct.html).
All contributors are expected to read through this guide.
We're here to cultivate a welcoming and inclusive contributing environment, and every new contributor needs to do their part to uphold our community standards.

### Requirements and Setup
#### Cloning the Repo
Before you start working on `plasma-js-lib`, you'll need to clone our GitHub repository:

```
git clone git@github.com:plasma-group/plasma-js-lib.git
```

Now, enter the repository.

```
cd plasma-js-lib
```

#### Node.js
`plasma-js-lib` is tested and built with [`Node.js`](https://nodejs.org/en/).
Although you **do not need `Node.js` to use this library in your application**, you'll need to install `Node.js` (and its corresponding package manager, `npm`) for your system before **contributing**.

We've provided a [detailed explanation of now to install `Node.js`](https://plasma-core.readthedocs.io/en/latest/reference.html#installing-node-js) on Windows, Mac, and Linux.

`plasma-js-lib` has been tested on the following versions of Node:

- v8
- v9
- v10

If you're having trouble getting a component of `plasma-js-lib` running, please try installing one of the above versions of `Node.js` and try again.
It's pretty easy to switch `Node.js` versions using `n`.
First, install `n` globally.

```
npm install -g n
```

Next, install your desired verson of `Node.js`, say `v10`:

```
n 10
```

#### Packages
`plasma-js-lib` makes use of several `npm` packages.

Install all required packages with:

```
$ npm install
```

### Running Tests
`plasma-js-lib` makes use of a combination of [`Mocha`](https://mochajs.org/) (a testing framework) and [`Chai`](https://www.chaijs.com/) (an assertion library) for testing.

Run all tests with:

```
$ npm test
```

### Building
We're using `gulp` to provide a process to build `plasma-js-lib` for in-browser usage.

If you'd like to build `plasma-js-lib` yourself, simply run:

```
$ npm run build
```
