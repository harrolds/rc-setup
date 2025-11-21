export class ConflictResolverV2 {
  resolve(localEntry, serverEntry){
    if(!serverEntry) return localEntry;
    if(!localEntry) return serverEntry;

    if(serverEntry.timestamp > localEntry.timestamp){
      return serverEntry;
    }
    return localEntry;
  }
}