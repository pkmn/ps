import {Actions, Action} from './index';

import * as fs from 'fs';
import * as path from 'path';

describe('Actions', () => {
  it('register', () => {
    let register = Actions.register({username: 'User', password: 'password', challstr: '4|foo'});
    expectAction(register, 'act=register&username=User&password=password&' +
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
    expectAction(register, 'act=register&username=Foo&password=BAR&' +
        'cpassword=bar&captcha=Sandshrew&challstr=4%7Cbaz', false);
    expect(register.url).toEqual('https://play.pkmn.cc/~~pocketmon/action.php');
    expectOnRegisterResponse(register, 'Foo', '|/trn Foo,0,token');
  });

  it('login', () => {
    const rename = Actions.login({username: 'User', challstr: '3|foo'});
    expectAction(rename, 'act=getassertion&userid=user&challstr=3%7Cfoo');

    let login = Actions.login({username: 'User', password: 'password', challstr: '4|foo'});
    expectAction(login, 'act=login&name=User&pass=password&challstr=4%7Cfoo');
    expectOnLoginResponse(login, 'User', '|/trn User,0,token');

    login = Actions.login({
      username: 'Foo',
      password: 'BAR',
      challstr: '4|baz',
      url: 'https://play.pkmn.cc/',
      serverid: 'pocketmon',
    });
    expectAction(login, 'act=login&name=Foo&pass=BAR&challstr=4%7Cbaz', false);
    expect(login.url).toEqual('https://play.pkmn.cc/~~pocketmon/action.php');
    expectOnLoginResponse(login, 'Foo', '|/trn Foo,0,token');
  });

  it('upkeep', () => {
    let upkeep = Actions.upkeep({username: 'User', challstr: '4|foo'});
    expectAction(upkeep, 'act=upkeep&challstr=4%7Cfoo');
    expectOnUpkeepResponse(upkeep, 'USER');

    upkeep = Actions.upkeep({
      username: 'Foo',
      password: 'BAR',
      challstr: '4|baz',
      url: 'https://play.pkmn.cc/',
      serverid: 'pocketmon',
    });
    expectAction(upkeep, 'act=upkeep&challstr=4%7Cbaz', false);
    expect(upkeep.url).toEqual('https://play.pkmn.cc/~~pocketmon/action.php');
    expectOnUpkeepResponse(upkeep, 'foo');
  });

  it('rename', () => {
    const login = Actions.rename({username: 'User', password: 'pass', challstr: '3|foo'});
    expectAction(login, 'act=login&name=User&pass=pass&challstr=3%7Cfoo');

    let rename = Actions.rename({username: 'User', challstr: '4|foo'});
    expectAction(rename, 'act=getassertion&userid=user&challstr=4%7Cfoo');
    expectOnRenameResponse(rename, 'User');

    rename = Actions.rename({
      username: 'Foo',
      challstr: '4|baz',
      url: 'https://play.pkmn.cc/',
      serverid: 'pocketmon',
    });
    expectAction(rename, 'act=getassertion&userid=foo&challstr=4%7Cbaz', false);
    expect(rename.url).toEqual('https://play.pkmn.cc/~~pocketmon/action.php');
    expectOnRenameResponse(rename, 'Foo');
  });

  it('logout', () => {
    let logout = Actions.logout({username: 'User Name'});
    expectAction(logout, 'act=logout&userid=username');
    expect(logout.onResponse('foo')).toEqual('|/logout');

    logout = Actions.logout({
      username: 'User Name',
      url: 'https://play.pkmn.cc/',
      serverid: 'pocketmon',
    });
    expectAction(logout, 'act=logout&userid=username', false);
    expect(logout.url).toEqual('https://play.pkmn.cc/~~pocketmon/action.php');
    expect(logout.onResponse('bar')).toEqual('|/logout');
  });
});

function expectAction(action: Action, data: string, url = true) {
  expect(action.data).toEqual(data);
  expect(action.method).toBe('POST');
  expect(action.headers['Content-Type'])
    .toEqual('application/x-www-form-urlencoded; encoding=UTF-8');
  expect(action.headers['Content-Length']).toEqual(data.length);
  expect(action.responseType).toBe('text');
  if (url) expect(action.url).toEqual('https://play.pokemonshowdown.com/~~showdown/action.php');
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
  expect(upkeep.onResponse(response)).toEqual(`|/trn ${username},0,token`);
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

  expect(rename.onResponse('<!DOCTYPE html foo bar>token')).toEqual(`|/trn ${username},0,token`);
}

describe('Bundle', () => {
  // eslint-disable-next-line jest/expect-expect
  it('usage', () => {
    {
      const window = {} as {LoginTools: typeof Actions};
      // eslint-disable-next-line no-eval
      eval(fs.readFileSync(path.resolve(__dirname, './build/production.min.js'), 'utf8'));

      const login =
        window.LoginTools.login({username: 'User', password: 'password', challstr: '4|foo'});
      expectAction(login, 'act=login&name=User&pass=password&challstr=4%7Cfoo');
      expectOnLoginResponse(login, 'User', '|/trn User,0,token');
    }
  });
});
