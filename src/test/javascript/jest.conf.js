const tsconfig = require('../../../tsconfig.json');

module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/src/test/javascript/jest.ts'],
    cacheDirectory: '<rootDir>/target/jest-cache',
    coverageDirectory: '<rootDir>/target/test-results/',
    globals: {
        'ts-jest': {
            stringifyContentPathRegex: '\\.html$',
            tsConfig: '<rootDir>/tsconfig.json',
            astTransformers: [require.resolve('jest-preset-angular/InlineHtmlStripStylesTransformer')]
        }
    },
    coveragePathIgnorePatterns: [
        '<rootDir>/src/test/javascript'
    ],
    moduleNameMapper: mapTypescriptAliasToJestAlias(),
    reporters: [
        'default',
        [ 'jest-junit', { outputDirectory: './target/test-results/', outputName: 'TESTS-results-jest.xml' } ]
    ],
    testResultsProcessor: 'jest-sonar-reporter',
    transformIgnorePatterns: ['node_modules/'],
    testMatch: ['<rootDir>/src/test/javascript/spec/**/@(*.)@(spec.ts)'],
    rootDir: '../../../',
    testURL: 'http://localhost/'
};

function mapTypescriptAliasToJestAlias(alias = {}) {
    const jestAliases = { ...alias };
    if (!tsconfig.compilerOptions.paths) {
      return jestAliases;
    }
    Object.entries(tsconfig.compilerOptions.paths)
      .filter(([key, value]) => {
        // use Typescript alias in Jest only if this has value
        if (value.length) {
          return true;
        }
        return false;
      })
      .map(([key, value]) => {
        // if Typescript alias ends with /* then in Jest:
        // - alias pairKey must end with /(.*)
        // - alias value must end with /$1
        const regexToReplace = /(.*)\/\*$/;
        const aliasKey = key.replace(regexToReplace, '$1/(.*)');
        const aliasValue = value[0].replace(regexToReplace, '$1/$$1');
        return [aliasKey, `<rootDir>/${aliasValue}`];
      })
      .reduce((aliases, [key, value]) => {
        aliases[key] = value;
        return aliases;
      }, jestAliases);
    return jestAliases;
  }
