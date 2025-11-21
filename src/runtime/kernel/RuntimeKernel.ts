// C-8.0 RuntimeKernel Cloud Binding Layer
import { CloudAuth } from '../cloud/CloudAuth';
import { CloudDB } from '../cloud/CloudDB';
import { CloudFunctions } from '../cloud/CloudFunctions';

export class RuntimeKernel {
  constructor(config) {
    this.config = config;
    this.cloud = {
      auth: new CloudAuth(config.supabaseUrl, config.supabaseKey),
      db: new CloudDB(config.supabaseUrl, config.supabaseKey),
      fn: new CloudFunctions(config.supabaseUrl, config.supabaseKey)
    };
    this.subscribers = new Map();
  }

  on(event, cb) {
    if (!this.subscribers.has(event)) this.subscribers.set(event, []);
    this.subscribers.get(event).push(cb);
  }

  emit(event, payload) {
    const subs = this.subscribers.get(event) || [];
    subs.forEach(cb => cb(payload));
  }

  async boot() {
    const session = await this.cloud.auth.getSession();
    if (session) this.emit("session-restored", session);
    this.cloud.auth.onAuthStateChange(session => this.emit("auth-change", session));
    this.emit("kernel-ready", {});
  }
}
