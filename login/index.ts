const URL = 'https://play.pokemonshowdown.com/';
const CAPTCHA = 'Pikachu';
const CONTENT_TYPE = 'application/x-www-form-urlencoded; encoding=UTF-8';

/** Details required when logging in. */
export interface LoginDetails {
  username: string;
  challstr: string;
  password?: string;
  serverid?: string;
  url?: string;
}

/** Details required when registering. */
export interface RegistrationDetails extends LoginDetails {
  password: string;
  cpassword?: string;
  captcha?: string;
}

/** Information requested to make a request and handle the response. */
export interface Action {
  method: 'GET' | 'POST';
  headers: {[key: string]: string | number};
  url: string;
  data: string;
  responseType: 'text';
  onResponse: (data: string) => string | undefined;
}

interface Response {
  assertion?: string;
  curuser?: {
    username: string;
    loggedin: boolean;
  };
  error?: string;
  actionerror?: string;
}

type ID = (string & {__brand: 'ID'}) | (string & {__isID: true}) | '';

/** Register with the server. */
export function register(details: RegistrationDetails): Action {
  return {
    ...action('register', details, querystring({
      serverid: details.serverid,
      username: details.username,
      password: details.password,
      cpassword: details.cpassword ?? details.password,
      captcha: details.captcha ?? CAPTCHA,
      challstr: details.challstr,
    })),
    onResponse: (data?: string) => {
      const response = safeJSON(data) as Response;
      if (response.curuser?.loggedin) {
        return next(details, response.assertion!);
      } else {
        return error(details, response);
      }
    },
  };
}

/** Log in to the server (or rename if no password is provided). */
export function login(details: LoginDetails): Action {
  if (!details.password) return rename(details);
  return {
    ...action('login', details, querystring({
      serverid: details.serverid,
      name: details.username,
      pass: details.password,
      challstr: details.challstr,
    })),
    onResponse: (data?: string) => {
      const response = safeJSON(data) as Response;
      if (response.curuser?.loggedin) {
        return next(details, response.assertion!);
      } else {
        return error(details, response);
      }
    },
  };
}

/** Attempts to upkeep an existing session with the server (requires cookies). */
export function upkeep(details: LoginDetails): Action {
  return {
    ...action('upkeep', details, querystring({
      serverid: details.serverid,
      challstr: details.challstr,
    })),
    onResponse: (data?: string) => {
      const response = safeJSON(data) as {username?: string; assertion: string};
      if (!response.username) return undefined;
      return next({...details, username: response.username}, response.assertion);
    },
  };
}

/** Change the name of the connected user (or login if a password is provided). */
export function rename(details: LoginDetails): Action {
  if (details.password) return login(details);
  return {
    ...action('getassertion', details, querystring({
      serverid: details.serverid,
      userid: toID(details.username),
      challstr: details.challstr,
    })),
    onResponse: (assertion: string) => next(details, assertion),
  };
}

/** Log out from the server (but remain connected as a guest). */
export function logout(details: Omit<LoginDetails, 'challstr'>): Action {
  return {
    ...action('logout', details, querystring({
      serverid: details.serverid,
      userid: toID(details.username),
    })),
    onResponse: () => '|/logout',
  };
}

function action(
  api: 'register' | 'login' | 'upkeep' | 'getassertion' | 'logout',
  details: {url?: string},
  data: string
): Omit<Action, 'onResponse'> {
  return {
    method: 'POST',
    url: `${(details?.url || URL)}api/${api}`,
    headers: {
      'Content-Type': CONTENT_TYPE,
      'Content-Length': data.length,
    },
    data,
    responseType: 'text',
  };
}

function querystring(data: {[key: string]: string | undefined}) {
  // This naive approach is only safe because it is only intended for use for a very narrow range
  // of values we need to deal with when dealing with the Pokémon Showdown login server.
  const buf = [];
  for (const key in data) {
    if (data[key] === undefined) continue;
    buf.push(`${key}=${encodeURIComponent(data[key]!)}`);
  }
  return buf.join('&');
}

function safeJSON(data?: string) {
  if (!data || data.length < 1) throw new Error('No data received');
  if (data[0] === ']') data = data.substr(1);
  return JSON.parse(data);
}

function toID(text: any): ID {
  if (text?.id) text = text.id;
  if (typeof text !== 'string' && typeof text !== 'number') return '';
  return ('' + text).toLowerCase().replace(/[^a-z0-9]+/g, '') as ID;
}

function next(details: LoginDetails, assertion: string) {
  return `|/trn ${details.username},0,${process(details, assertion)}`;
}

function error(details: {username: string}, response: Response): never {
  const err = response.error || response.actionerror;
  if (err) throw new Error(err);
  void process(details, response.assertion || '');
  throw new Error(`Received unexpected response: ']${JSON.stringify(response)}'`);
}

function process(details: {username: string}, assertion: string) {
  if (assertion.slice(0, 14).toLowerCase() === '<!doctype html') {
    // some sort of MitM proxy - ignore it
    const endIndex = assertion.indexOf('>');
    if (endIndex > 0) assertion = assertion.slice(endIndex + 1);
  }

  if (assertion.startsWith('\r')) assertion = assertion.slice(1);
  if (assertion.startsWith('\n')) assertion = assertion.slice(1);
  if (assertion.includes('<')) {
    throw new Error('Something appears to be interfering with the connection');
  } else if (assertion === ';') {
    throw new Error(`Authentication required for '${details.username}'`);
  } else if (assertion === ';;@gmail') {
    throw new Error(`Authentication from Google required for '${details.username}'`);
  } else if (assertion.startsWith(';;')) {
    throw new Error(`Invalid name: ${assertion.substr(2)}`);
  } else if (assertion.includes('\n') || !assertion) {
    throw new Error('Something appears to be interfering with the connection');
  }

  return assertion;
}

/** Collection of tools for interacting with Pokémon Showdown's login server. */
export const Actions = {register, login, upkeep, rename, logout};
