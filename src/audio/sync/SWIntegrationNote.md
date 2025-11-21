Service Worker integration:
- Use registration.sync.register('audio-sync')
- Trigger BackgroundSyncAudioWorker.run() on event
- Use 'sync' event listener inside service-worker.js