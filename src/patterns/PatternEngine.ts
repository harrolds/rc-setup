export class PatternEngine {
  detect(dreams){
    if(!dreams || dreams.length===0) return [];

    const tags = {};
    const moods = {};
    const categories = {};

    dreams.forEach(d=>{
      (d.tags||[]).forEach(t=> tags[t]=(tags[t]||0)+1 );
      const m=d.mood||"unknown";
      moods[m]=(moods[m]||0)+1;
      const c=d.category||"misc";
      categories[c]=(categories[c]||0)+1;
    });

    const patterns=[];

    Object.entries(tags).forEach(([t,v])=>{
      if(v>=3) patterns.push(`Frequent theme: ${t}`);
    });

    Object.entries(moods).forEach(([m,v])=>{
      if(v>=3) patterns.push(`Recurring mood: ${m}`);
    });

    Object.entries(categories).forEach(([c,v])=>{
      if(v>=3) patterns.push(`Dominant category: ${c}`);
    });

    return patterns;
  }
}