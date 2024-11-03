import { createServer } from 'cors-anywhere';

setTimeout(() => {
	var host = process.env.HOST || '0.0.0.0';
	var port = process.env.PORT || 8080;
	var originBlacklist = parseEnvList(process.env.CORSANYWHERE_BLACKLIST);
	var originWhitelist = parseEnvList(process.env.CORSANYWHERE_WHITELIST);
	function parseEnvList(env) {
		if (!env) {
			return [];
		}
		return env.split(',');
	}

	createServer({
		originBlacklist: originBlacklist,
		originWhitelist: originWhitelist,
		requireHeader: ['origin', 'x-requested-with'],
		removeHeaders: [
			'cookie',
			'cookie2',
			'x-request-start',
			'x-request-id',
			'via',
			'connect-time',
			'total-route-time',
		],
		redirectSameOrigin: true,
		httpProxyOptions: {
			xfwd: false,
		},
	}).listen(port, host, function () {
		console.log();
		console.log('Running CORS Anywhere on ' + host + ':' + port);
	});
}, 1000);
