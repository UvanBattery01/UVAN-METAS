self.addEventListener("push", event => {

  let data = {};

  try {
    data = event.data ? event.data.json() : {};
  } catch(e) {}

  const title = data.title || "UVAN METAS 🔋";

  const options = {
    body: data.body || "Nueva venta registrada",
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    vibrate: [200, 100, 200],
    data: {
      url: "/index.html"
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );

});


self.addEventListener("notificationclick", event => {

  event.notification.close();

  event.waitUntil(
    clients.matchAll({
      type: "window",
      includeUncontrolled: true
    }).then(clientList => {

      for(const client of clientList){

        if("focus" in client){

          client.focus();

          return;
        }

      }

      if(clients.openWindow){

        return clients.openWindow("/index.html");

      }

    })
  );

});