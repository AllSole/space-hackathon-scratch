import fs from 'node:fs';
import vm from 'node:vm';

class ClassList {
  constructor(init=[]){ this.s=new Set(init); }
  add(x){ this.s.add(x); }
  remove(x){ this.s.delete(x); }
  contains(x){ return this.s.has(x); }
}
class El {
  constructor(id='', dataset={}){ this.id=id; this.dataset=dataset; this.textContent=''; this.handlers={}; this.classList=new ClassList(); }
  addEventListener(type, fn){ this.handlers[type]=fn; }
  click(){ this.handlers.click?.({}); }
}
const ids=['sheet','sheetBackdrop','chooser','hero','activeCard','activateButton','sheetTitle','sheetBenefit','sheetCopy','activeIcon','activeTitle','activeBenefit','activeValue','cancelButton','resetButton','switchCount'];
const map=Object.fromEntries(ids.map(id=>[id,new El(id)]));
for (const id of ['sheet','sheetBackdrop','activeCard']) map[id].classList.add('hidden');
const modeCards=[new El('',{mode:'study'}),new El('',{mode:'go'}),new El('',{mode:'share'})];
const storage=new Map();
const document={
  getElementById:(id)=>map[id],
  querySelectorAll:(sel)=> sel==='.mode-card' ? modeCards : [],
  addEventListener:()=>{}
};
const localStorage={getItem:k=>storage.get(k)??null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)};
const context={document,localStorage,console};
vm.createContext(context);
vm.runInContext(fs.readFileSync('./app.js','utf8'),context);
modeCards[0].click();
if(map.sheet.classList.contains('hidden')) throw new Error('sheet did not open');
if(map.sheetTitle.textContent!=='Study') throw new Error('wrong mode content');
map.activateButton.click();
if(!map.chooser.classList.contains('hidden')) throw new Error('chooser did not hide');
if(map.activeCard.classList.contains('hidden')) throw new Error('active card did not show');
if(map.activeTitle.textContent!=='Study Mode') throw new Error('wrong active state');
if(storage.get('switchweek-active')!=='study') throw new Error('state did not persist');
map.resetButton.click();
if(map.chooser.classList.contains('hidden')) throw new Error('reset failed');
if(storage.has('switchweek-active')) throw new Error('reset did not clear storage');
console.log('interaction_state_machine: PASS');
