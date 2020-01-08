module.exports = {
	"roots": [
		"<rootDir>/tests"
	],
	testMatch: [
		"**/__tests__/**/*.+(ts|js)",
		"**/?(*.)+(spec|test).+(ts|js)"
	],
	"transform": {
		"^.+\\.ts?$": "ts-jest"
	},
	moduleNameMapper: {
		"@controller/(.*)": "<rootDir>/src/controllers/$1",
		"@validation/(.*)": "<rootDir>/src/validation/$1",
		"@decorators/(.*)": "<rootDir>/src/decorators/$1",
		"@entities/(.*)": "<rootDir>/src/entity/$1",
	}
};