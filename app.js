const modes = {
  study: {
    title: 'Study', activeTitle: 'Study Mode', icon: '⌁', benefit: '+10 GB hotspot', activeBenefit: '+10 GB hotspot for laptop work', value: '~12 zł value', copy: 'Turn your phone into a reliable laptop connection for classes, projects and library days.'
  },
  go: {
    title: 'Go', activeTitle: 'Go Mode', icon: '↗', benefit: '+5 GB roaming', activeBenefit: '+5 GB roaming for this week', value: '~25 zł value', copy: 'A spontaneous city break should not require hunting through roaming menus or buying a new bundle.'
  },
  share: {
    title: 'Share', activeTitle: 'Share Mode', icon: '∞', benefit: 'Send 10 GB', activeBenefit: '10 GB ready to send to a friend', value: '~10 zł value', copy: 'Use this week’s plan value socially: send a useful data boost to someone who needs it now.'
  }
};

const sheet = document.getElementById('sheet');
const backdrop = document.getElementById('sheetBackdrop');
const chooser = document.getElementById('chooser');
const hero = document.getElementById('hero');
const activeCard = document.getElementById('activeCard');
const activateButton = document.getElementById('activateButton');
let selected = null;

function openSheet(key){
  selected = key;
  const m = modes[key];
  document.getElementById('sheetTitle').textContent = m.title;
  document.getElementById('sheetBenefit').textContent = m.benefit;
  document.getElementById('sheetCopy').textContent = m.copy;
  sheet.classList.remove('hidden'); backdrop.classList.remove('hidden');
}
function closeSheet(){sheet.classList.add('hidden');backdrop.classList.add('hidden');}
function activate(){
  const m = modes[selected];
  closeSheet();
  chooser.classList.add('hidden');
  hero.classList.add('hidden');
  activeCard.classList.remove('hidden');
  document.getElementById('activeIcon').textContent = m.icon;
  document.getElementById('activeTitle').textContent = m.activeTitle;
  document.getElementById('activeBenefit').textContent = m.activeBenefit;
  document.getElementById('activeValue').textContent = m.value;
  localStorage.setItem('switchweek-active', selected);
}
function reset(){
  localStorage.removeItem('switchweek-active'); selected = null;
  activeCard.classList.add('hidden'); chooser.classList.remove('hidden'); hero.classList.remove('hidden'); closeSheet();
}

document.querySelectorAll('.mode-card').forEach(el => el.addEventListener('click', () => openSheet(el.dataset.mode)));
document.getElementById('cancelButton').addEventListener('click', closeSheet);
backdrop.addEventListener('click', closeSheet);
activateButton.addEventListener('click', activate);
document.getElementById('resetButton').addEventListener('click', reset);
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeSheet(); });

const saved = localStorage.getItem('switchweek-active');
if(saved && modes[saved]){ selected = saved; activate(); }
