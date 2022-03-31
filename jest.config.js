module.exports = {
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    testMatch: ['<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}'],
    transform: {
        '\\.(ts|tsx)?$': 'ts-jest',
    },
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        '\\.(css|sass|scss)$': 'identity-obj-proxy',
    },
};
