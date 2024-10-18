
import * as fs from 'fs';
import * as path from 'path';

import {Action, Actions} from './index';

describe('Actions', () => {
  it('register', () => {
    let register = Actions.register({username: 'User', password: 'password', challstr: '4|foo'});
    expect(register.url).toBe('https://play.pokemonshowdown.com/api/register');
    expectAction(register, 'username=User&password=password&' +
      'cpassword=password&captcha=Pikachu&challstr=4%7Cfoo');
    expectOnRegisterResponse(register, 'User', '|/trn User,0,token');

    register = Actions.register({
      username: 'Foo',
      password: 'BAR',
      cpassword: 'bar',
      captcha: 'Sandshrew',
      challstr: '4|baz',
      url: 'https://play.pkmn.cc/',
      serverid: 'pocketmon',
    });
    expect(register.url).toBe('https://play.pkmn.cc/api/register');
    expectAction(register, 'serverid=pocketmon&username=Foo&password=BAR&' +
        'cpassword=bar&captcha=Sandshrew&challstr=4%7Cbaz');
    expectOnRegisterResponse(register, 'Foo', '|/trn Foo,0,token');
  });

  it('login', () => {
    const rename = Actions.login({username: 'User', challstr: '3|foo'});
    expect(rename.url).toBe('https://play.pokemonshowdown.com/api/getassertion');
    expectAction(rename, 'userid=user&challstr=3%7Cfoo');

    let login = Actions.login({username: 'User', password: 'password', challstr: '4|foo'});
    expect(login.url).toBe('https://play.pokemonshowdown.com/api/login');
    expectAction(login, 'name=User&pass=password&challstr=4%7Cfoo');
    expectOnLoginResponse(login, 'User', '|/trn User,0,token');

    login = Actions.login({
      username: 'Foo',
      password: 'BAR',
      challstr: '4|baz',
      url: 'https://play.pkmn.cc/',
      serverid: 'pocketmon',
    });
    expect(login.url).toBe('https://play.pkmn.cc/api/login');
    expectAction(login, 'serverid=pocketmon&name=Foo&pass=BAR&challstr=4%7Cbaz');

    expectOnLoginResponse(login, 'Foo', '|/trn Foo,0,token');
  });

  it('upkeep', () => {
    let upkeep = Actions.upkeep({username: 'User', challstr: '4|foo'});
    expect(upkeep.url).toBe('https://play.pokemonshowdown.com/api/upkeep');
    expectAction(upkeep, 'challstr=4%7Cfoo');
    expectOnUpkeepResponse(upkeep, 'USER');

    upkeep = Actions.upkeep({
      username: 'Foo',
      password: 'BAR',
      challstr: '4|baz',
      url: 'https://play.pkmn.cc/',
      serverid: 'pocketmon',
    });
    expect(upkeep.url).toBe('https://play.pkmn.cc/api/upkeep');
    expectAction(upkeep, 'serverid=pocketmon&challstr=4%7Cbaz');

    expectOnUpkeepResponse(upkeep, 'foo');
  });

  it('rename', () => {
    const login = Actions.rename({username: 'User', password: 'pass', challstr: '3|foo'});
    expect(login.url).toBe('https://play.pokemonshowdown.com/api/login');
    expectAction(login, 'name=User&pass=pass&challstr=3%7Cfoo');

    let rename = Actions.rename({username: 'User', challstr: '4|foo'});
    expect(rename.url).toBe('https://play.pokemonshowdown.com/api/getassertion');
    expectAction(rename, 'userid=user&challstr=4%7Cfoo');
    expectOnRenameResponse(rename, 'User');

    rename = Actions.rename({
      username: 'Foo',
      challstr: '4|baz',
      url: 'https://play.pkmn.cc/',
      serverid: 'pocketmon',
    });
    expect(rename.url).toBe('https://play.pkmn.cc/api/getassertion');
    expectAction(rename, 'serverid=pocketmon&userid=foo&challstr=4%7Cbaz');
    expectOnRenameResponse(rename, 'Foo');
  });

  it('logout', () => {
    let logout = Actions.logout({username: 'User Name'});
    expect(logout.url).toBe('https://play.pokemonshowdown.com/api/logout');
    expectAction(logout, 'userid=username');
    expect(logout.onResponse('foo')).toBe('|/logout');

    logout = Actions.logout({
      username: 'User Name',
      url: 'https://play.pkmn.cc/',
      serverid: 'pocketmon',
    });
    expect(logout.url).toBe('https://play.pkmn.cc/api/logout');
    expectAction(logout, 'serverid=pocketmon&userid=username');
    expect(logout.onResponse('bar')).toBe('|/logout');
  });
});

function expectAction(action: Action, data: string) {
  expect(action.data).toEqual(data);
  expect(action.method).toBe('POST');
  expect(action.headers['Content-Type'])
    .toBe('application/x-www-form-urlencoded; encoding=UTF-8');
  expect(action.headers['Content-Length']).toEqual(data.length);
  expect(action.responseType).toBe('text');
}

function expectOnRegisterResponse(action: Action, username: string, next: string) {
  expect(() => action.onResponse('')).toThrow('No data received');

  expect(() => action.onResponse(']{"error": "Error"}')).toThrow('Error');
  expect(() => action.onResponse(']{"actionerror": "Action Error"}')).toThrow('Action Error');
  expect(() => action.onResponse(']{"assertion": "token"}'))
    .toThrow('Received unexpected response: \']{"assertion":"token"}\'');

  expect(() => action.onResponse(']{"assertion": "<"}'))
    .toThrow('Something appears to be interfering with the connection');
  expect(() => action.onResponse(']{"assertion": ";"}'))
    .toThrow(`Authentication required for '${username}'`);
  expect(() => action.onResponse(']{"assertion": ";;@gmail"}'))
    .toThrow(`Authentication from Google required for '${username}'`);
  expect(() => action.onResponse(`]{"assertion": ";;${username} contains a banned word"}`))
    .toThrow(`Invalid name: ${username} contains a banned word`);
  expect(() => action.onResponse(']{"assertion": ""}'))
    .toThrow('Something appears to be interfering with the connection');

  const assertion = '<!DOCTYPE html foo bar>token';
  const response =
    `]{"curuser": {"username": "${username}", "loggedin": true}, "assertion": "${assertion}"}`;
  expect(action.onResponse(response)).toEqual(next);
}

const expectOnLoginResponse = expectOnRegisterResponse;

function expectOnUpkeepResponse(upkeep: Action, username: string) {
  expect(() => upkeep.onResponse('')).toThrow('No data received');

  expect(() => upkeep.onResponse(`]{"username": "${username}", "assertion": "<"}`))
    .toThrow('Something appears to be interfering with the connection');
  expect(() => upkeep.onResponse(`]{"username": "${username}", "assertion": ";"}`))
    .toThrow(`Authentication required for '${username}'`);
  expect(() => upkeep.onResponse(`]{"username": "${username}", "assertion": ";;@gmail"}`))
    .toThrow(`Authentication from Google required for '${username}'`);
  expect(() => upkeep.onResponse(
    `]{"username": "${username}", "assertion": ";;${username} contains a banned word"}`
  ))
    .toThrow(`Invalid name: ${username} contains a banned word`);
  expect(() => upkeep.onResponse(`]{"username": "${username}", "assertion": ""}`))
    .toThrow('Something appears to be interfering with the connection');

  expect(upkeep.onResponse(']{"foo": "bar"}')).toBeUndefined();

  const response = `]{"username": "${username}", "assertion": "<!DOCTYPE html foo bar>token"}`;
  expect(upkeep.onResponse(response)).toBe(`|/trn ${username},0,token`);
}

function expectOnRenameResponse(rename: Action, username: string) {
  expect(() => rename.onResponse('<'))
    .toThrow('Something appears to be interfering with the connection');
  expect(() => rename.onResponse(';'))
    .toThrow(`Authentication required for '${username}'`);
  expect(() => rename.onResponse(';;@gmail'))
    .toThrow(`Authentication from Google required for '${username}'`);
  expect(() => rename.onResponse(';;Foo contains a banned word'))
    .toThrow('Invalid name: Foo contains a banned word');
  expect(() => rename.onResponse(''))
    .toThrow('Something appears to be interfering with the connection');

  expect(rename.onResponse('<!DOCTYPE html foo bar>token')).toBe(`|/trn ${username},0,token`);
}

describe('Bundle', () => {
  it('usage', () => {
    {
      const window = {} as {pkmn: {login: typeof Actions}};
      // eslint-disable-next-line no-eval
      eval(fs.readFileSync(path.resolve(__dirname, './build/index.min.js'), 'utf8'));

      const login =
        window.pkmn.login.login({username: 'User', password: 'password', challstr: '4|foo'});
      expect(login.url).toBe('https://play.pokemonshowdown.com/api/login');
      expectAction(login, 'name=User&pass=password&challstr=4%7Cfoo');
      expectOnLoginResponse(login, 'User', '|/trn User,0,token');
    }
  });
});
