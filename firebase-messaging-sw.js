// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
	apiKey: 'AIzaSyBhsHC1JzJze8r3tib365xC-jDf44MFcR4',
	authDomain: 'multishop-358ac.firebaseapp.com',
	projectId: 'multishop-358ac',
	storageBucket: 'multishop-358ac.firebasestorage.app',
	messagingSenderId: '883603692715',
	appId: '1:883603692715:web:6142e8d62ade3652eaabee',
	measurementId: 'G-5VS33ZMQ25',
});
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
	console.log('[firebase-messaging-sw.js] Received background message ', payload);
	const notificationTitle   = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
		icon: '/logo-transparent.webp',
	};

	self.registration.showNotification(notificationTitle, notificationOptions);

	self.clients.matchAll().then((clients) => {
		clients.forEach((client) => {
			client.postMessage({
				type: 'NEW_NOTIFICATION',
				data: payload,
			});
		});
	});
});

messaging.onMessage((payload) => {
	console.log('[firebase-messaging-sw.js] Received foreground message ', payload);
	const notificationTitle   = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
		icon: '/logo-transparent.webp',
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});
