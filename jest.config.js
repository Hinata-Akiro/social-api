/**@types {import ('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset:"ts-jest",
    testEnvironment:"node",
    testMatch:['**/**/*.test.ts'],
    verbose:true,
    forceExit:true,
    clearMocks:true,
    setupFilesAfterEnv: ['jest-extended/all']
}