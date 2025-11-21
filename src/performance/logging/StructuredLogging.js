
// C-26.2 — Structured Logging & Error Tracking

export const Log = {
  info:  (msg, ctx={}) => console.info(JSON.stringify({lvl:'info', msg, ...ctx})),
  warn:  (msg, ctx={}) => console.warn(JSON.stringify({lvl:'warn', msg, ...ctx})),
  error: (msg, ctx={}) => console.error(JSON.stringify({lvl:'error', msg, ...ctx}))
};

export function withErrorBoundary(fn, ctxLabel='unknown'){
  try { return fn(); }
  catch(e){
    Log.error('runtime_error', {ctx: ctxLabel, err: e.toString()});
    return null;
  }
}
