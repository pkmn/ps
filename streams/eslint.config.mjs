import pkmn from "@pkmn/eslint-config";

export default [...pkmn, {
  rules: {
    "@stylistic/indent": ["error", "tab", {flatTernaryExpressions: true}],
    "@stylistic/member-delimiter-style": "off",
    "@stylistic/quotes": "off",
    "@typescript-eslint/no-floating-promises": ["error", {ignoreVoid: true}],
    "@typescript-eslint/no-unnecessary-type-assertion": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/return-await": "off",
    "@typescript-eslint/unbound-method": "off",
    "max-len": "off"
  }
}];
