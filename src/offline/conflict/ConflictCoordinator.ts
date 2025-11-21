import { ConflictResolverV2 } from './ConflictResolverV2';
import { ConflictPolicy } from './ConflictPolicy';

export class ConflictCoordinator {
  private resolver=new ConflictResolverV2();
  private policy=new ConflictPolicy('timestamp');

  apply(localEntry, serverEntry){
    const selected=this.policy.choose(localEntry,serverEntry);
    return this.resolver.resolve(localEntry, serverEntry);
  }
}