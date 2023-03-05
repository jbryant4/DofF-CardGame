module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        "prettier"
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        tsconfigRootDir: __dirname,
        project:"./tsconfig.json"
    },
    plugins: ['@typescript-eslint','react', 'react-hooks', 'jsx-a11y', 'import','prettier'],
    root: true,
    rules: {
        "arrow-body-style": "warn",
        "class-methods-use-this": "off",
        "global-require": "off",
        "import/extensions": [
            "error",
            "always",
            {
                "js": "never",
                "jsx": "never",
                "ts": "never",
                "tsx": "never"
            }
        ],
        "import/order": [
            "error",
            {
                "alphabetize": {
                    "order": "asc",
                    "caseInsensitive": true
                },
                "groups": ["builtin", "external", "object", "internal", "sibling", "parent", "index"],
                "pathGroups": [
                    {
                        "pattern": "~/**",
                        "group": "internal"
                    },
                    {
                        "pattern": "@/**",
                        "group": "object"
                    }
                ]
            }
        ],
        "linebreak-style": "off",
        "max-classes-per-file": ["error", 2],
        "no-async-promise-executor": "off",
        "no-console": "error",
        "no-nested-ternary": "warn",
        "no-param-reassign": "off",
        "no-unused-expressions": "warn",
        "no-unused-vars": "off",
        "padding-line-between-statements": [
            "error",
            { "blankLine": "always", "prev": "*", "next": "return" }
        ],
        "@typescript-eslint/no-unused-vars": [
            "error",
            { "argsIgnorePattern": "^_", "varsIgnorePattern": "[iI]gnored" }
        ],
        "import/no-extraneous-dependencies": "warn",
        "react/jsx-filename-extension": [
            "warn",
            { "extensions": [".js", ".jsx", ".tsx"] }
        ],
        "react/destructuring-assignment": "off",
        "react/jsx-key": ["error", { "checkFragmentShorthand": true }],
        "react/jsx-no-target-blank": ["error", { "allowReferrer": true }],
        "react/jsx-props-no-spreading": "off",
        "react/prop-types": "off",
        "react/react-in-jsx-scope": "off",
        "react/require-default-props": "off",
        "react/state-in-constructor": "off",
        "react/static-property-placement": "off",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "error",
        "@typescript-eslint/comma-dangle": "off"
    },
    settings: {
        "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
        "import/resolver": {
            "typescript": {}
        }
    }
};
