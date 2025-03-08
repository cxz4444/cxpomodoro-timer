// sw.js
self.addEventListener('push', function (event) {
    const data = event.data ? event.data.json() : {};
    const title = data.title || '晨曦番茄时钟提醒';
    const options = {
        body: data.body || '该休息一下了！',
        icon: data.icon || '/favicon.ico'
    };
    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/') // 点击通知后打开网站主页
    );
});
