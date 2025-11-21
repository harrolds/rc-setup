import { supabase } from '../../server/supabaseClient';

export async function uploadChunk(chunk){
  const blob=new Blob([new Float32Array(chunk.data)],{type:'application/octet-stream'});
  const { data, error } = await supabase.storage.from('audio').upload(
    `chunks/${chunk.id}_${chunk.index}.bin`,
    blob,
    { upsert:false }
  );
  if(error) throw error;
  return data;
}