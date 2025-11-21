// C-13.3 Conflict Resolver v3 – Vector Clock + Merge Strategy

export class ConflictResolverV3 {
  constructor() {}

  resolve(local, remote) {
    if (!local) return remote;
    if (!remote) return local;

    if (local.vclock > remote.vclock) return local;
    if (remote.vclock > local.vclock) return remote;

    if (local.updated_at > remote.updated_at) return local;
    if (remote.updated_at > local.updated_at) return remote;

    return local;
  }

  mergeFields(local, remote) {
    return {
      ...local,
      ...remote,
      transcript: remote.transcript || local.transcript,
      summary: remote.summary || local.summary,
      visual_url: remote.visual_url || local.visual_url,
      tags: remote.tags?.length ? remote.tags : local.tags
    };
  }
}
