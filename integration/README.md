# Integration

Integration testing for the various packages housed in this repository.

- `npm run start` will run the simulator and client in the browser, pitting two `RandomPlayerAI`
  instances against each other using predetermined teams and displaying the parsed log output
- `npm run test` will compare the output of exhaustively running battles using
  `smogon/pokemon-showdown{,-client}` code and those from the packages in this repository.
