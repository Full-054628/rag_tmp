// @ts-check

/** @type {import('prettier').Config} */
const prettierConfig = {
    printWidth: 120,
    tabWidth: 2,
    endOfLine: 'lf',
    bracketSpacing: true,
    singleQuote: true,
    semi: true,
    plugins: ['prettier-plugin-sql'],
};

/** @type {import('prettier-plugin-sql').SqlBaseOptions} */
const prettierPluginSqlConfig = {
    language: 'bigquery',
    keywordCase: 'upper',
    dataTypeCase: 'upper',
    functionCase: 'upper',
};

export default {
    ...prettierConfig,
    ...prettierPluginSqlConfig,
}