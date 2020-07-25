
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/service-worker.js')
      .then(function(reg) {
        console.log('Success to register service worker');
        let serviceWorker;
        if (reg.installing) {
            serviceWorker = reg.installing;
        } else if (reg.waiting) {
            serviceWorker = reg.waiting;
        } else if (reg.active) {
            serviceWorker = reg.active;
        }
        if (serviceWorker) {
            if (serviceWorker.state == "activated") {
              if ("Notification" in window) {
                requestPermission();
              } else {
                console.error("Browser tidak mendukung notifikasi.");
              }
            }
            serviceWorker.addEventListener("statechange", function(e) {
                if (e.target.state == "activated") {
                    if ("Notification" in window) {
                      requestPermission();
                    } else {
                      console.error("Browser tidak mendukung notifikasi.");
                    }
                }
            });
        }
        
      })
      .catch(function(){
        console.log('Failed to register service worker');
      });
    })
  } else {
    console.log("Service worker is not supported in this browser")
}

function requestPermission() {
  Notification.requestPermission().then(function (result) {
    if (result === "denied") {
      console.log("Fitur notifikasi tidak diijinkan.");
      return;
    } else if (result === "default") {
      console.error("Pengguna menutup kotak dialog permintaan ijin.");
      return;
    }
    console.log("Fitur notifikasi diijinkan.");
    if (('PushManager' in window)) {
      navigator.serviceWorker.getRegistration().then(function(registration) {
          registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array("BB-tXxOXHlXAdGn2u7uAg7zJRkFXah4eu15T_M71M1dF7SzJYcRaPMttSgd6huiphR8zB8CoBsG0kYycXG5wchk")
          }).then(function(subscribe) {
              console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
              console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                  null, new Uint8Array(subscribe.getKey('p256dh')))));
              console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                  null, new Uint8Array(subscribe.getKey('auth')))));
          }).catch(function(e) {
              console.error('Tidak dapat melakukan subscribe ', e.message);
          });
      });
    }
  });
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

