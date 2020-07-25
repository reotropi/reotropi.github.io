var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BB-tXxOXHlXAdGn2u7uAg7zJRkFXah4eu15T_M71M1dF7SzJYcRaPMttSgd6huiphR8zB8CoBsG0kYycXG5wchk",
   "privateKey": "EW5muSqa1AAqp8-kTJPCu6zgEeSaJlmfj8GGqChpGYo"
};
 
webPush.setVapidDetails(
   'mailto:aydazayda@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/fb-P2t-JYy8:APA91bEQEKbMeNkMdpVcSpsXkKZdCbTkvaZ1hszreF532FEgXjdibIemI8l4BRujjfQoevfsys4Rw5y20jTutY_Fyn8EE5Ae_j41Hoac9fxCrf6ZT0WCbVpNM72rqZSENrA1oOwi9qFV",
   "keys": {
       "p256dh": "BOrdHFMTdcMWZyazuCoEVbxWMX91niXYVOsPe5BV0XYQ00qYKMHZaxR+KvItE/T7/P+zYhfQL+J295XPazOPkkM=",
       "auth": "hLWSczjDAJ07emUSDf2iNA=="
   }
};
var payload = 'Halo, saya mengirim notifikasi!';
 
var options = {
   gcmAPIKey: '162715161645',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);