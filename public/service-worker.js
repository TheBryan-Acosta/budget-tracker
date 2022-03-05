const APP_PREFIX = "budget-pwa";
const VERSION = "v1";
const CACHE_NAME = APP_PREFIX + VERSION;

//caching all of the files in '/public', as well as '/' and '/api/transaction' to allow all relevant information to display when the application is offline
const FILES_TO_CACHE = [
	"/",
	"./index.html",
	"./js/index.js",
	"./js/idb.js",
	"./css/styles.css",
	"./icons/icon-72x72.png",
	"./icons/icon-96x96.png",
	"./icons/icon-128x128.png",
	"./icons/icon-144x144.png",
	"./icons/icon-152x152.png",
	"./icons/icon-192x192.png",
	"./icons/icon-384x384.png",
	"./icons/icon-512x512.png",
	"/api/transaction",
];

// Respond with cached resources

self.addEventListener("fetch", function (e) {
	console.log("fetch request : " + e.request.url);
	e.respondWith(
		caches.match(e.request).then(function (request) {
			if (request) {
				// if cache is available, respond with cache
				console.log("responding with cache : " + e.request.url);
				return request;
			} else {
				// if there are no cache, try fetching request
				console.log("file is not cached, fetching : " + e.request.url);
				return fetch(e.request);
			}
		})
	);
});

// Cache resources
self.addEventListener("install", function (e) {
	e.waitUntil(
		caches.open(CACHE_NAME).then(function (cache) {
			console.log("installing cache : " + CACHE_NAME);
			return cache.addAll(FILES_TO_CACHE);
		})
	);
});

// Delete outdated caches
self.addEventListener("activate", function (e) {
	e.waitUntil(
		caches.keys().then(function (keyList) {
			let cacheKeeplist = keyList.filter(function (key) {
				return key.indexOf(APP_PREFIX);
			});
			cacheKeeplist.push(CACHE_NAME);

			return Promise.all(
				keyList.map(function (key, i) {
					if (cacheKeeplist.indexOf(key) === -1) {
						console.log("deleting cache : " + keyList[i]);
						return caches.delete(keyList[i]);
					}
				})
			);
		})
	);
});
self.addEventListener("fetch", function (e) {
	console.log("fetch request : " + e.request.url);
	e.respondWith(
		caches.match(e.request).then(function (request) {
			if (request) {
				console.log("responding with cache: " + e.request.url);
				return request;
			} else {
				console.log("file is not cached, fetching: " + e.request.url);
				return fetch(e.request);
			}
		})
	);
});
