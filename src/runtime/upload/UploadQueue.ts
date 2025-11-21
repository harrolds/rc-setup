// C-8.2 Background Upload Queue
export class UploadQueue {
  constructor(uploadEngine) {
    this.uploadEngine = uploadEngine;
    this.queue = [];
    this.running = false;
  }

  enqueue(dreamId, chunk) {
    this.queue.push({ dreamId, chunk });
    this.run();
  }

  async run() {
    if (this.running) return;
    this.running = true;

    while (this.queue.length > 0) {
      const item = this.queue.shift();
      try {
        await this.uploadEngine.uploadChunk(item.dreamId, item.chunk);
      } catch (e) {
        this.queue.unshift(item);
        break;
      }
    }
    this.running = false;
  }
}
