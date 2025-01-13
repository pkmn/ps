import pkmn from "@pkmn/eslint-config";

export default [...pkmn, {rules: {"no-redeclare": "off", "@typescript-eslint/no-shadow": "off"}}];
