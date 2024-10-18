import pkmn from "@pkmn/eslint-config";

export default [...pkmn, {
  rules: {
    "@stylistic/indent": ["error", "tab", {flatTernaryExpressions: true}],
    "@stylistic/member-delimiter-style": "off",
    "@stylistic/no-mixed-spaces-and-tabs": "off",
    "@stylistic/no-multiple-empty-lines": "off",
    "@stylistic/operator-linebreak": "off",
    "@stylistic/quotes": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/prefer-optional-chain": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "import/order": "off",
    "max-len": "off",
    "no-case-declarations": "off",
    "no-dupe-else-if": "off",
    "no-mixed-spaces-and-tabs": "off",
  }
}];
