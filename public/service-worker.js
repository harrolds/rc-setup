self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  event.respondWith(fetch(req).catch(() => caches.match(req)));
});

self.addEventListener('sync', (event) => {
  if (event.tag === 'dreamdrop-sync') {
    event.waitUntil(handleBackgroundSync());
  }
});

async function handleBackgroundSync() {
  const clientsList = await clients.matchAll();
  for (const client of clientsList) {
    client.postMessage({ type: 'background-sync-trigger' });
  }
}

// C6.2 Background Queue
self.addEventListener('sync', (event) => {
  if (event.tag === 'dreamdrop-bg-queue') {
    event.waitUntil(processQueue());
  }
});

async function processQueue() {
  const clientsList = await clients.matchAll();
  for (const client of clientsList) {
    client.postMessage({ type: 'bg-sync-queue' });
  }
}


// C-6.3 Chunk Fetch Route
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (url.pathname.startsWith('/__chunks/')) {
    const id = url.pathname.split('/__chunks/')[1];
    event.respondWith(handleChunkRequest(id));
  }
});

async function handleChunkRequest(id) {
  const db = await openDB('dreamdrop-audio',1);
  const tx = db.transaction('chunks','readonly');
  const chunk = await tx.store.get(id);

  if (!chunk) return new Response('Not found',{status:404});

  return new Response(chunk.data, {
    headers:{
      'Content-Type': chunk.mime || 'audio/webm'
    }
  });
}

// IndexedDB open helper
async function openDB(name,version,opts){
  return await new Promise((resolve,reject)=>{
    const req = indexedDB.open(name,version);
    req.onupgradeneeded = ()=> opts.upgrade(req.result);
    req.onerror = ()=> reject(req.error);
    req.onsuccess = ()=> resolve(req.result);
  });
}


// C-6.6 SW -> Runtime Messaging Bridge
self.addEventListener('message', (event) => {
  const { type, payload } = event.data || {};
  // Echo route for debugging / pipeline triggers
  if (type === 'ping') {
    event.source.postMessage({ type:'pong', payload:{ ok:true } });
  }
});


self.addEventListener('push', event => {
  let data = {};
  try { data = event.data.json(); } catch(e){}
  event.waitUntil(
    self.registration.showNotification(data.title || 'Dreamdrop', {
      body: data.body || '',
      icon: data.icon || '/icons/icon-192.png',
      data
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.openWindow('/'));
});


self.addEventListener('sync', event => {
  if(event.tag==='dreamdrop-sync'){
    event.waitUntil((async()=>{
      console.log('[sync] running background sync for images');
    })());
  }
});


self.addEventListener('fetch', event => {
  event.respondWith((async()=>{
    try{
      return await fetch(event.request);
    } catch(e){
      return new Response('Offline mode active', { status: 200 });
    }
  })());
});


self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});
