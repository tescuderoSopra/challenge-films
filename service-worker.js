const CACHE_NAME = 'cache-challenge';
self.addEventListener('install', (event) => {
    // Perform install steps
    const urlsToCache = [
        '/',
        '/detail'
    ];
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

const isImage = (fetchRequest) => {
  return fetchRequest.method === "GET" 
         && fetchRequest.destination === "image";
}

self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          if (response) {
            return response;
          }
          var fetchRequest = event.request.clone();
  
          return fetch(fetchRequest).then(
            function(response) {
              if(!response || response.status !== 200
                || (response.type !== 'basic' && !isImage(event.request))
              ) {
                return response;
              }
              var responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
  
              return response;
            }
          );
        })
      );
  });