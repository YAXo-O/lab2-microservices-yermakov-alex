const options = {
	basedir: __dirname,
	files: ['./src/routes/*.ts', './src/interfaces/*.ts'],
	swaggerDefinition: {
		info: {
			description: 'Service takes care of session CRUD operations',
			title: 'Session Service',
			version: '1.0.0',
		},
		produces: [
			'application/json',
			'application/xml',
		],
		schemes: ['http'],
	},
};

export default options;
