import { useEffect, useRef, useState } from 'react';
import { useRuntime } from '../../runtime/useRuntime';

export function useRecorderBindings() {
  const rt = useRuntime();
  const chunkEngine = rt.kernel.resources; // resource engine not recorder, stub replaced next
  const [status, setStatus] = useState<'idle'|'recording'|'paused'>('idle');
  const mediaStreamRef = useRef<MediaStream|null>(null);
  const mediaRecorderRef = useRef<MediaRecorder|null>(null);
  const chunksRef = useRef<Blob[]>([]);

  async function start() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaStreamRef.current = stream;

    const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = (e)=> {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };

    recorder.onstop = ()=> {
      // merge chunks
    };

    recorder.start(1000);
    setStatus('recording');
  }

  function pause() {
    mediaRecorderRef.current?.pause();
    setStatus('paused');
  }

  function resume() {
    mediaRecorderRef.current?.resume();
    setStatus('recording');
  }

  function stop() {
    mediaRecorderRef.current?.stop();
    mediaStreamRef.current?.getTracks().forEach(t=>t.stop());
    setStatus('idle');
  }

  useEffect(()=>{
    const unsub = rt.lifecycle.subscribe?.((life)=>{
      if (life.visibility==='hidden' and status==='recording') pause();
    });
    return ()=>{ if (typeof unsub==='function') unsub(); }
  },[status]);

  return { status, start, stop, pause, resume };
}
