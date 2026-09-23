const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('src');

const classMapping = {
  // text
  'text-slate-50': 'text-slate-900',
  'text-slate-100': 'text-slate-900',
  'text-slate-200': 'text-slate-800',
  'text-slate-300': 'text-slate-700',
  'text-slate-400': 'text-slate-600',
  'text-white': 'text-slate-950',
  'text-black': 'text-white',
  'text-slate-950': 'text-white',
  'text-slate-900': 'text-white',
  
  // bg
  'bg-slate-950': 'bg-slate-50',
  'bg-slate-900': 'bg-white',
  'bg-slate-800': 'bg-slate-100',
  'bg-slate-700': 'bg-slate-200',
  'bg-slate-600': 'bg-slate-300',
  'bg-black': 'bg-white',
  'bg-white': 'bg-slate-950',
  
  // glass bg
  'bg-white/5': 'bg-slate-900/5',
  'bg-white/10': 'bg-slate-900/10',
  'bg-white/20': 'bg-slate-900/20',
  'bg-white/30': 'bg-slate-900/30',
  'bg-slate-900/80': 'bg-white/80',
  'bg-slate-950/80': 'bg-white/80',
  'bg-slate-950/90': 'bg-white/90',
  'bg-slate-800/80': 'bg-slate-100/80',
  'bg-slate-800/60': 'bg-slate-100/60',
  'bg-black/80': 'bg-white/80',

  // hover
  'hover:bg-slate-800': 'hover:bg-slate-100',
  'hover:bg-slate-700': 'hover:bg-slate-200',
  'hover:bg-slate-900': 'hover:bg-white',
  'hover:bg-white/10': 'hover:bg-slate-900/10',
  'hover:bg-white': 'hover:bg-slate-900',
  
  // borders
  'border-slate-800': 'border-slate-200',
  'border-slate-700': 'border-slate-300',
  'border-slate-600': 'border-slate-400',
  'border-white/10': 'border-slate-900/10',
  'border-white/20': 'border-slate-900/20',
  'border-white/30': 'border-slate-900/30',
  'border-white/50': 'border-slate-900/50',
  'border-white': 'border-slate-950',

  // selection
  'selection:bg-white': 'selection:bg-slate-900',
  'selection:text-black': 'selection:text-white',

  // gradients
  'from-slate-950': 'from-slate-50',
  'via-slate-950': 'via-slate-50',
  'to-slate-950': 'to-slate-50',
  'from-slate-900': 'from-white',
  'via-slate-900': 'via-white',
  'to-slate-900': 'to-white',
  'from-black': 'from-white',
  'via-black': 'via-white',
  'to-black': 'to-white'
};

const sortedKeys = Object.keys(classMapping).sort((a, b) => b.length - a.length);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  if (file.endsWith('index.css')) {
    content = content.replace(/rgba\(15, 23, 42, 0.75\)/g, 'rgba(255, 255, 255, 0.75)');
    content = content.replace(/rgba\(51, 65, 85, 0.5\)/g, 'rgba(226, 232, 240, 0.5)');
    content = content.replace(/rgba\(15, 23, 42, 0.65\)/g, 'rgba(255, 255, 255, 0.65)');
    content = content.replace(/rgba\(51, 65, 85, 0.4\)/g, 'rgba(226, 232, 240, 0.4)');
    content = content.replace(/background: #0f172a;/g, 'background: #f8fafc;');
    content = content.replace(/background: #334155;/g, 'background: #cbd5e1;');
    content = content.replace(/background: #475569;/g, 'background: #94a3b8;');
  }

  // Handle specific complex patterns first (buttons)
  content = content.replace(/from-white to-slate-300/g, 'TMPBTN_FROM');
  content = content.replace(/hover:from-slate-200 hover:to-slate-400/g, 'TMPBTN_HOVER');
  content = content.replace(/text-slate-950 bg-gradient-to-r/g, 'TMPBTN_TEXT');
  content = content.replace(/shadow-white\/10/g, 'TMPBTN_SHADOW');
  content = content.replace(/fill-slate-950/g, 'TMPBTN_FILL');

  // Tokenize other classes
  const tokens = [];
  sortedKeys.forEach((key, index) => {
    const token = `__TKN_${index}__`;
    tokens.push({ key, token, replacement: classMapping[key] });
    const escapedKey = key.replace(/([\/])/g, '\\$1');
    // Using string boundary check for classes inside attributes
    const regex = new RegExp(`(?<=["'\`\\s])${escapedKey}(?=["'\`\\s])`, 'g');
    content = content.replace(regex, token);
  });

  // Restore tokens
  tokens.forEach(({ token, replacement }) => {
    content = content.replace(new RegExp(token, 'g'), replacement);
  });

  // Restore buttons
  content = content.replace(/TMPBTN_FROM/g, 'from-slate-900 to-slate-700');
  content = content.replace(/TMPBTN_HOVER/g, 'hover:from-slate-800 hover:to-slate-600');
  content = content.replace(/TMPBTN_TEXT/g, 'text-white bg-gradient-to-r');
  content = content.replace(/TMPBTN_SHADOW/g, 'shadow-slate-900/20');
  content = content.replace(/TMPBTN_FILL/g, 'fill-white');

  fs.writeFileSync(file, content, 'utf8');
});

console.log('Theme inverted successfully!');
