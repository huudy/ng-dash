import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { DialogService } from './dialog.service';
import { UserService } from './user.service';

declare var window: any;

@Injectable()
export class PushNotifications {

  constructor(
    private BackendService: BackendService,
    private DialogService: DialogService
  ) { }

  private applicationServerPublicKey = 'BG_KcuHuEFAhVJnN5GZGJQrDhX0NiJ61tj8HFOM3KuQ2DJYSLwx9-aLS_RX8_UnkRXvVNkpvmhtTaRmTnrlgomo';

  private checkWebPushSupport() {
    if (!('serviceWorker' in navigator)) {
      throw new Error('No Service Worker support!')
    }
    if (!('PushManager' in window)) {
      throw new Error('No Push API Support!')
    }
  }

  public requestNotificationPermission = async () => {
    const permission = await window.Notification.requestPermission();
    // value of permission can be 'granted', 'default', 'denied'
    // granted: user has accepted the request
    // default: user has dismissed the notification permission popup by clicking on x
    // denied: user has denied the request.
    if (permission !== 'granted') {
      throw new Error('Permission not granted for Notification');
    }
    return permission;
  }

  // check if user endpoint is already in our database
  private checkUserIsSubscribed() {
    return this.BackendService.communicateWithBackend('data/hasPushSubscription', {}, { noCache: true })
  }

  // helper function for converting private & public keys
  private urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  // register service worker in browser
  private registerServiceWorker = async () => {
    return await navigator.serviceWorker.register('assets/scripts/webPushServiceWorker.js').then(function (registration) {
      return registration.update();
    });
  }

  // calls the Mozilla server to retrieve the subscription endpoint etc.
  private getSubscription(serviceWorker) {
    const subscribeOptions = {
      userVisibleOnly: true,
      applicationServerKey: this.urlB64ToUint8Array(this.applicationServerPublicKey)
    };
    const subscription = serviceWorker.pushManager.subscribe(subscribeOptions);
    return subscription;
  }

  // display a notification
  private showLocalNotification(title, body, swRegistration) {
    const options = {
      body: body,
      icon: 'assets//img/static/SONAR_favicon_196x196.png',
    };
    swRegistration.showNotification(title, options);
  }

  // writes the received subscription details into our database
  private registerSubscriptionInDatabase(subscription, serviceWorker, confirmRegistration) {

    var endpoint = subscription.endpoint;
    var subJSObject = JSON.parse(JSON.stringify(subscription));
    var auth = subJSObject.keys.auth;
    var p256dh = subJSObject.keys.p256dh;

    var requestBody = JSON.stringify({ endpoint: endpoint, auth: auth, p256dh: p256dh });
    this.BackendService.communicateWithBackend('data/registerSubscription', { method: 'POST' }, { body: requestBody }).subscribe(
      (response) => {
        if (confirmRegistration) {
          this.showLocalNotification(
            'You will now receive push notifications from SONAR',
            'Thank you for your registration',
            serviceWorker
          );
        }
      },
      (error) => {
        // this.DialogService.changeMessage({ kind: 'alert-danger', body: 'unable to register push notification subscription' })
        console.log('unable to register subscription in backend');
      }
    )
  }

  // wrapper to check an register service worker for push notifications
  public startWebPushService = async () => {
    try {
      this.checkWebPushSupport();
      var permission = window.Notification.permission;

      if (permission === 'default') {
        permission = await this.requestNotificationPermission();
        // breaks by throwing an error when Notifications are not granted
      }

      // otherwise register service worker and show welcome message
      if (permission === 'granted') {
        // force re-registering at this time in case of updates with later releases
        this.checkUserIsSubscribed().subscribe(
          async (response) => {
            // user is not registered in backend
            var serviceWorker = await this.registerServiceWorker();
            // serviceWorker = await serviceWorker.update();
            const subscription = await this.getSubscription(serviceWorker);

            const userIsSubscribed = (response['hasPushSubscription'].length > 0);
            if (userIsSubscribed) {
              if (subscription.endpoint == response['hasPushSubscription'][0]['endpointUrl']) {
                console.log('web push endpoint already registered');
                return;
              }
            }

            this.registerSubscriptionInDatabase(subscription, serviceWorker, !userIsSubscribed);
          },
          (error) => {
            throw new Error('unable to confirm user subscription status')
          })
      }
    }
    catch (err) {
      // this.DialogService.changeMessage({ kind: 'alert-danger', body: err })
      console.log(err);
    }
  }

}