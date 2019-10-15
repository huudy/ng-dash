//Check Service Worker active
self.addEventListener('activate', async () => {
  // This will be called only once when the service worker is activated.
  console.log('service worker active')
})

self.addEventListener('push', function(event) {
    const payload = JSON.parse(event.data.text());
    const options = {
      body: payload.message,
      icon: 'https://ompp.internal.unicreditgroup.eu/sonar/img/static/SONAR_favicon_196x196.png', // './img/static/SONAR_favicon_196x196.png',
      data: {
        url: payload.link
      }
    };

    const notificationPromise = self.registration.showNotification(payload.title, options);
    event.waitUntil(notificationPromise);

  });

//On-Click Event
self.addEventListener('notificationclick', function(event) {
  // close the notification
  event.notification.close();

  // see if the current is open and if it is focus it
  // otherwise open new tab
  event.waitUntil(

    self.clients.matchAll().then(function(clientList) {

      if (clientList.length > 0) {
        return clientList[0].focus();
      }

      return self.clients.openWindow(event.notification.data.url);
    })
  );
});
  