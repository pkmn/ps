import pkmn from "@pkmn/eslint-config";

export default [...pkmn, {
  files: [
    "src/gen1jpn/*.ts",
    "src/gen1stadium/*.ts",
    "src/gen2stadium2/*.ts",
    "src/gen4pt/*.ts",
    "src/gen5bw1/*.ts",
    "src/gen6xy/*.ts",
    "src/gen7letsgo/*.ts",
    "src/gen7sm/*.ts",
    "src/gen8bdsp/*.ts",
    "src/gen8dlc1/*.ts",
    "src/gen9predlc/*.ts",
    "src/gen9dlc1/*.ts"
  ],
  rules: {
    "@stylistic/indent": ["error", "tab", {flatTernaryExpressions: true}],
    "@stylistic/no-mixed-spaces-and-tabs": "off",
    "@stylistic/operator-linebreak": "off",
    "@stylistic/quotes": "off",
    "@typescript-eslint/no-base-to-string": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/prefer-optional-chain": "off",
    "max-len": "off",
  }
}];
