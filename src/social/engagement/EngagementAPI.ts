import { EngagementEngine } from './EngagementEngine';
const engine=new EngagementEngine();

export function likeDream(id:string){ return engine.like(id); }
export function shareDream(id:string){ return engine.share(id); }
export function viewDream(id:string){ return engine.view(id); }
export function getEngagement(id:string){ return engine.get(id); }
