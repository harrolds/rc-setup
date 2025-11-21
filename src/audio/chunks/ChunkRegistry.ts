let chunks = [];

export function addChunk(blob) {
  chunks.push(blob);
}

export function flushChunks() {
  const c = [...chunks];
  chunks = [];
  return c;
}
