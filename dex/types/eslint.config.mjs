import pkmn from "@pkmn/eslint-config";

export default [...pkmn, {
  rules: {
    "@typescript-eslint/no-empty-object-type": "off",
    "@typescript-eslint/no-unsafe-function-type": "off",
    "@typescript-eslint/no-unused-vars": "off",
  }
}];
