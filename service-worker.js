importScripts("/js/vendor/workbox.js")

workbox.precaching.precacheAndRoute([
	// manifest
	'/manifest.json',
	// pages and components
	'/',
	'/components/nav.html',
	'/components/footer.html',
	'/index.html',
	'/pages/home.html',
	'/pages/teams.html',
	'/pages/favorites.html',
	// css
	'/css/materialize.min.css',
	'/css/material-icons.css',
	'/css/fonts.css',
	'/css/main.css',
	// js
	'/js/materialize.min.js',
	'/js/loader.js',
	'/js/api/base_fetch.js',
	'/js/api/home.js',
	'/js/api/teams.js',
	'/js/api/favorite.js',
	'/js/vendor/idb.js',
	'/js/vendor/workbox.js',
	// icons
	'/iconfont/MaterialIcons-Regular.eot',
	'/iconfont/MaterialIcons-Regular.ttf',
	'/iconfont/MaterialIcons-Regular.woff',
	'/iconfont/MaterialIcons-Regular.woff2',
	// fonts
	'/fonts/alegreya-v13-latin-regular.eot',
	'/fonts/alegreya-v13-latin-regular.svg',
	'/fonts/alegreya-v13-latin-regular.ttf',
	'/fonts/alegreya-v13-latin-regular.woff',
	'/fonts/alegreya-v13-latin-regular.woff2',
	// images
	'/images/logo_soccer.png',
	'/images/logo_soccer_192.png'
]);

workbox.routing.registerRoute(
	/\.(?:png|jpg|jpeg|svg|ico|js|html|css|eot|ttf|woff|woff2|json)$/,
	workbox.strategies.staleWhileRevalidate(),
)

workbox.routing.registerRoute(
	/https:\/\/api.football-data.org\/v2\//,
	workbox.strategies.staleWhileRevalidate(),
)

workbox.routing.registerRoute(
	/pages/,
	workbox.strategies.staleWhileRevalidate(),
)

workbox.routing.registerRoute(
	/components/,
	workbox.strategies.staleWhileRevalidate(),
)

workbox.routing.registerRoute(
	/images/,
	workbox.strategies.staleWhileRevalidate(),
)

workbox.routing.registerRoute(
	/js/,
	workbox.strategies.staleWhileRevalidate(),
)

workbox.routing.registerRoute(
	/css/,
	workbox.strategies.staleWhileRevalidate(),
)

workbox.routing.registerRoute(
	/fonts/,
	workbox.strategies.staleWhileRevalidate(),
)

workbox.routing.registerRoute(
	/iconfont/,
	workbox.strategies.staleWhileRevalidate(),
)

self.addEventListener('push', function(event) {
	console.log("any push event", event);
	var body;
	if (event.data) {
	  body = event.data.text();
	} else {
	  body = 'Push message no payload';
	}
	console.log("Received push body:", body);
	var options = {
	  body: body,
	  icon: '/images/logo_soccer_192.png',
	  vibrate: [100, 50, 100],
	  data: {
		dateOfArrival: Date.now(),
		primaryKey: 1
	  }
	};
	self.registration.showNotification('Push Notification', options)
});