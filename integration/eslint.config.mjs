import pkmn from "@pkmn/eslint-config";

export default [...pkmn, {
  rules: {
    "@typescript-eslint/no-shadow": "off",
    "@typescript-eslint/parameter-properties": "off"
  }
}];
