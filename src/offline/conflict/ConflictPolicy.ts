export type ConflictStrategy = 'preferLocal' | 'preferServer' | 'timestamp';

export class ConflictPolicy {
  constructor(private strategy:ConflictStrategy='timestamp'){}

  choose(localEntry, serverEntry){
    switch(this.strategy){
      case 'preferLocal': return localEntry || serverEntry;
      case 'preferServer': return serverEntry || localEntry;
      case 'timestamp':
      default:
        if(!localEntry) return serverEntry;
        if(!serverEntry) return localEntry;
        return serverEntry.timestamp > localEntry.timestamp ? serverEntry : localEntry;
    }
  }
}