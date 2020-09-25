# `@pkmn/login`

![Test Status](https://github.com/pkmn/ps/workflows/Tests/badge.svg)
[![npm version](https://img.shields.io/npm/v/@pkmn/login.svg)](https://www.npmjs.com/package/@pkmn/login)

Logic for authenticating with Pokémon Showdown.

## Installation

```sh
$ npm install @pkmn/login
```

Alternatively, as [detailed below](#browser), if you are using `@pkmn/login` in the browser and want
a convenient way to get started, simply depend on a transpiled and minified version via
[unpkg](https://unpkg.com/):

```html
<script src="https://unpkg.com/@pkmn/login"></script>
```

## Usage

In order to authenticate with Pokémon Showdown, a client must be able to make HTTP(S) requests to
Pokémon Showdown's "login server" and to be able to communicate with its "sim server" via a
WebSocket connection. A wide variety of libraries for simplifying these networking tasks exist, and
as such, **`@pkmn/login` was designed to be completely agnostic to the client's choice of network
layer**. `@pkmn` recommends [`fetch`](https://github.com/node-fetch/node-fetch) and
[`ws`](https://github.com/websockets/ws), but `@pkmn/login` will work equally well with any native
or third-party network library.

`@pkmn/login` provides helpers for several authentication "actions", though Pokémon Showdown expects
a particular login flow and attempting actions in an unexpected order will result in confusing
error messages:

Any user of Pokémon Showdown begins as a "guest" user. Pokémon Showdown's client will then attempt
an **upkeep** action during initial load to extend any existing credentials for a registered user.
This requires the `sid` cookie to be sent along with the request to identify which credentials are
being prolonged. If there are no credentials to upkeep, the user remains as a guest until a
**rename** is attempted. The rename may be unsuccessful because the name attempted requires
authentication, at which point a **login** action is required. If the password is incorrect during
login the server will respond with an obtuse error message about attempting to rename yourself as
`guest`, this is just a 'fun' Pokémon Showdown gotcha. If a name is unregistered you may
**register** the name with a password. Finally, you may **logout** of a name to terminate a session.

### Examples

The following examples demonstrate how to use `@pkmn/login` with various `HTTP` APIs (which tend
to be less homogenous than WebSocket APIs), but a WebSocket is also required to authenticate with
Pokémon Showdown. For example purposes, assume a WebSocket named `ws` has been set up as below:

```ts
import * as WebSocket from 'websocket'
import {Protocol} from '@pkmn/protocol';

const server = 'sim.smogon.com';
const serverport = 8000;
const ws = new WebSocket(`ws://${server}:${serverport}/showdown/websocket`);

ws.on('open', ...);
ws.on('close', ...);
ws.on('error', ...);
ws.on('message', message => {
  for (const {args} of Protocol.parse(message)) {
    switch (args[0]) {
      case 'challstr': {
        const challstr = args[1];
        onChallstr(challstr);
        break;
      }
      case 'updateuser': {
        ...
      }
      ...
    }
  }
  });
```

To see a complete worked example, please see the [`login`](login) CLI which trivially logs in and
out of Pokémon Showdown by leveraging `@pkmn/login` (though note that the majority of the complexity
comes from setup). [`index.html`](index.html) provides a similar example for the browser.

#### `http`/`https`

Node.js's standard [`https`](https://nodejs.org/api/https.html) library is somewhat verbose but
perfectly functional for use with `@pkmn/login`:

```ts
import * as https from 'https';

import {Action, Actions} from '@pkmn/login';

function fetch(action: Action) {
  return new Promise((resolve, reject) => {
    let buf = '';
    const req = https.request(action.url, {
      method: action.method,
      headers: action.headers
    }, res => {
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
      res.on('data', d => {
        buf += d;
      });
      res.on('end', () => resolve(buf));
    });
    req.on('error', reject);
    req.write(action.data);
    req.end();
  });
}

async function onChallstr() {
  const action = Actions.login({username: 'User Name', password: 'password', challstr});
  const cmd = action.onResponse(await fetch(action));
  if (cmd) ws.send(cmd);
}
```

#### `XMLHttpRequest`

Similarly, the legacy
[`XMLHttpRequest`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) API can be used
within browsers along with `@pkmn/login` to authenticate:

```html
<script src="https://unpkg.com/@pkmn/login"></script>
<script>
  ...

  async function onChallstr() {
    const action = LoginTools.login({username: 'User Name', password: 'password', challstr});
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.addEventListener('load', () => {
        const cmd = action.onResponse(request.responseText);
        if (cmd) ws.send(cmd);
        resolve();
      });
      request.addEventListener('error', reject);
      for (const header in action.headers) {
        request.setRequestHeader(header, action.headers[header]);
      }
      request.open(action.method, action.url);
      request.send(action.data);
    });
  }
</script>
```

#### `fetch`

[`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) is the new browser API for
HTTP requests (`node-fetch` provides an isomorphic API for use åon with Node.js):

```ts
import fetch from 'node-fetch';

import {Actions} from '@pkmn/login';

async function onChallstr() {
  const action = Actions.login({username: 'User Name', password: 'password', challstr});
  const response = await (await fetch(action.url, {
    method: action.method,
    headers: action.headers,
    body: action.data,
  })).text();
  const cmd = action.onResponse(response);
  if (cmd) ws.send(cmd);
}
```

#### `axios`

[`axios`](https://github.com/axios/axios) is a very popular HTTP library which can be configured
to work in the browser or on Node.js:

```ts
import axios from 'axios';

import {Actions} from '@pkmn/login';

async function onChallstr() {
  const action = Actions.login({username: 'User Name', password: 'password', challstr});
  const response = await axios({
    url: action.url,
    method: action.method,
    headers: action.headers,
    data: action.data,
    responseType: action.responseType,
  });
  const cmd = action.onResponse(response);
  if (cmd) ws.send(cmd);
}
```

#### jQuery

[`jQuery`](https://jquery.com/) is still commonly used in the browser to provide cleaner APIs:

```html
<script src="https://code.jquery.com/jquery.min.js"></script>
<script src="https://unpkg.com/@pkmn/login"></script>
<script>
  ...

  async function onChallstr() {
    const action = LoginTools.login({username: 'User Name', password: 'password', challstr});
    $.ajax(action.url, {
      method: action.method,
      headers: action.headers,
      data: action.data,
      success: data => {
        const cmd = action.onResponse(data);
        if (cmd) ws.send(cmd);
      },
      dataType: action.responseType,
    });
  }
</script>
```

### Browser

The recommended way of using `@pkmn/login` in a web browser is to **configure your bundler**
([Webpack](https://webpack.js.org/), [Rollup](https://rollupjs.org/),
[Parcel](https://parceljs.org/), etc) to minimize it and package it with the rest of your
application. If you do not use a bundler, a convenience `production.min.js` is included in the
package. You simply need to depend on `./node_modules/@pkmn/login/build/production.min.js` in a
`script` tag (which is what the unpkg shortcut above is doing), after which **`LoginTools` will be
accessible as a global.**

## License

This package is distributed under the terms of the [MIT License](LICENSE).
