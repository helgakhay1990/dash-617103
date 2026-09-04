const fs=require('fs');
let html=fs.readFileSync('/Users/olgakhaidukova/dashboards/skin/index.html','utf8');
let src=html.match(/<script>([\s\S]*?)<\/script>/)[1];
src=src.replace(/^[\s\S]*?const OIL/,'const OIL');
src=src.slice(0,src.indexOf('const KIND_LABEL'));
const DAYS=new Function(src+'; return DAYS;')();
const out=DAYS.map(d=>({
  d:d.d, wd:d.wd, n:d.n, t:d.t, kind:d.kind,
  dev:d.dev||null, min:d.min||0, boost:!!d.boost, air:!!d.air, last:!!d.last,
  ant:d.ant, act:d.act, note:d.note||null,
  steps:d.s.map(x=>({k:x.k,v:x.v}))
}));
fs.writeFileSync('/Users/olgakhaidukova/dashboards/skin/schedule.json', JSON.stringify({generated:new Date().toISOString().slice(0,10), days:out},null,1));
console.log('дней выгружено:', out.length);
