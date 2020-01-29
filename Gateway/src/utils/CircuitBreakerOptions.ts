import { Options } from 'opossum';

const options: Options = {
	errorThresholdPercentage: 5, // Percentage of failed requests to go to open state
	resetTimeout: 30000, // Go to half-opened state after resetTimeout ms
	timeout: 5000, // Request timeout - if it doesn't respond in timeout ms - consider request as failure
	volumeThreshold: 50, // Minimal number of requests
};

export default options;
