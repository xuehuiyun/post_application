module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "standard-with-typescript",
        "prettier"
    ],
    ignorePatterns: ["/dist/**/*"],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: [
            "./tsconfig.json",
            "./client/tsconfig.json",
            "./__test__/tsconfig.test.json"
        ]
    },
    plugins: ["react"],
    rules: {
        "brace-style": [
            "error",
            "1tbs",
            {
                allowSingleLine: true
            }
        ],
        "comma-style": ["error", "last"],
        curly: ["error", "multi-line"],
        "dot-location": ["error", "property"],
        eqeqeq: [
            "error",
            "always",
            {
                null: "ignore"
            }
        ],
        "new-parens": ["error"],
        "no-class-assign": ["error"],
        "no-const-assign": ["error"],
        "no-constant-condition": [
            "error",
            {
                checkLoops: false
            }
        ],
        "no-delete-var": ["error"],
        "no-dupe-args": ["error"],
        "no-dupe-class-members": ["error"],
        "no-dupe-keys": ["error"],
        "no-duplicate-case": ["error"],
        "no-duplicate-imports": ["error"],
        "no-eval": ["error"],
        "no-ex-assign": ["error"],
        "no-extend-native": ["error"],
        "no-global-assign": ["error"],
        "no-implied-eval": ["error"],
        "no-inner-declarations": ["error"],
        "no-invalid-regexp": ["error"],
        "no-label-var": ["error"],
        "no-labels": [
            "error",
            {
                allowLoop: false,
                allowSwitch: false
            }
        ],
        "no-lone-blocks": ["error"],
        "no-mixed-spaces-and-tabs": ["error"],
        "no-multi-str": ["error"],
        "no-new": ["error"],
        "no-new-func": ["error"],
        "no-new-object": ["error"],
        "no-new-require": ["error"],
        "no-new-symbol": ["error"],
        "no-new-wrappers": ["error"],
        "no-obj-calls": ["error"],
        "no-octal": ["error"],
        "no-octal-escape": ["error"],
        "@typescript-eslint/no-redeclare": ["warn"],
        "no-redeclare": "off",
        "no-regex-spaces": ["error"],
        "no-return-assign": ["error"],
        "no-self-assign": ["error"],
        "no-self-compare": ["error"],
        "no-sequences": ["error"],
        "no-shadow-restricted-names": ["error"],
        "no-sparse-arrays": ["error"],
        "no-template-curly-in-string": ["error"],
        "no-unmodified-loop-condition": ["error"],
        "no-unreachable": ["error"],
        "no-unsafe-finally": ["error"],
        "no-useless-call": ["error"],
        "no-useless-computed-key": ["error"],
        "no-useless-constructor": ["error"],
        "no-useless-escape": ["error"],
        "no-useless-rename": ["error"],
        "no-whitespace-before-property": ["error"],
        "semi-spacing": ["error"],
        "space-infix-ops": ["error"],
        "space-unary-ops": [
            "error",
            {
                words: true,
                nonwords: false
            }
        ],
        "use-isnan": ["error"],
        "valid-typeof": [
            "error",
            {
                requireStringLiterals: true
            }
        ],
        "wrap-iife": [
            "error",
            "any",
            {
                functionPrototypeMethods: true
            }
        ],
        "handle-callback-err": ["warn"],
        "no-debugger": ["warn"],
        "no-console": ["off"],
        "no-control-regex": ["off"],
        "@typescript-eslint/strict-boolean-expressions": "off"
    }
};
