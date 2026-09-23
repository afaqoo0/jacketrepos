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

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // CSS overrides
  if (file.endsWith('index.css')) {
    content = content.replace(/rgba\(15, 23, 42, 0.75\)/g, 'rgba(255, 255, 255, 0.75)');
    content = content.replace(/rgba\(51, 65, 85, 0.5\)/g, 'rgba(226, 232, 240, 0.5)');
    content = content.replace(/rgba\(15, 23, 42, 0.65\)/g, 'rgba(255, 255, 255, 0.65)');
    content = content.replace(/rgba\(51, 65, 85, 0.4\)/g, 'rgba(226, 232, 240, 0.4)');
    content = content.replace(/background: #0f172a;/g, 'background: #f8fafc;');
    content = content.replace(/background: #334155;/g, 'background: #cbd5e1;');
    content = content.replace(/background: #475569;/g, 'background: #94a3b8;');
  }

  // 1. Primary Buttons
  content = content.replace(/from-white to-slate-300/g, 'from-slate-900 to-slate-700');
  content = content.replace(/hover:from-slate-200 hover:to-slate-400/g, 'hover:from-slate-800 hover:to-slate-600');
  content = content.replace(/text-slate-950 bg-gradient-to-r/g, 'text-white bg-gradient-to-r');
  content = content.replace(/shadow-white\/10/g, 'shadow-slate-900/20');
  content = content.replace(/fill-slate-950/g, 'fill-white');

  // 2. Global Text Colors
  const temp = (str) => 'TMP_' + str;
  
  content = content.replace(/text-slate-50\b/g, temp('slate-900'));
  content = content.replace(/text-slate-100\b/g, temp('slate-900'));
  content = content.replace(/text-slate-200\b/g, temp('slate-800'));
  content = content.replace(/text-slate-300\b/g, temp('slate-700'));
  content = content.replace(/text-slate-400\b/g, temp('slate-600'));
  content = content.replace(/text-white\b/g, temp('slate-950'));
  content = content.replace(/text-black\b/g, temp('white'));
  content = content.replace(/text-slate-950\b/g, temp('white'));
  content = content.replace(/text-slate-900\b/g, temp('white'));

  // 3. Background Colors
  content = content.replace(/bg-slate-950\b/g, temp('slate-50'));
  content = content.replace(/bg-slate-900\b/g, temp('white'));
  content = content.replace(/bg-slate-800\b/g, temp('slate-100'));
  content = content.replace(/bg-slate-700\b/g, temp('slate-200'));
  content = content.replace(/bg-slate-600\b/g, temp('slate-300'));
  content = content.replace(/bg-black\b/g, temp('white'));
  content = content.replace(/bg-white\b/g, temp('slate-950'));

  // 4. Background Opacities / Glass effects
  content = content.replace(/bg-white\/5\b/g, temp('slate-900/5'));
  content = content.replace(/bg-white\/10\b/g, temp('slate-900/10'));
  content = content.replace(/bg-white\/20\b/g, temp('slate-900/20'));
  content = content.replace(/bg-white\/30\b/g, temp('slate-900/30'));
  content = content.replace(/bg-slate-900\/80\b/g, temp('white/80'));
  content = content.replace(/bg-slate-950\/80\b/g, temp('white/80'));
  content = content.replace(/bg-slate-950\/90\b/g, temp('white/90'));
  content = content.replace(/bg-slate-800\/80\b/g, temp('slate-100/80'));
  content = content.replace(/bg-slate-800\/60\b/g, temp('slate-100/60'));
  content = content.replace(/bg-black\/80\b/g, temp('white/80'));

  // 5. Borders
  content = content.replace(/border-slate-800\b/g, temp('slate-200'));
  content = content.replace(/border-slate-700\b/g, temp('slate-300'));
  content = content.replace(/border-slate-600\b/g, temp('slate-400'));
  content = content.replace(/border-white\/10\b/g, temp('slate-900/10'));
  content = content.replace(/border-white\/20\b/g, temp('slate-900/20'));
  content = content.replace(/border-white\/30\b/g, temp('slate-900/30'));
  content = content.replace(/border-white\/50\b/g, temp('slate-900/50'));
  content = content.replace(/border-white\b/g, temp('slate-950'));

  // 6. Gradients
  content = content.replace(/from-slate-950\b/g, temp('slate-50'));
  content = content.replace(/via-slate-950\b/g, temp('slate-50'));
  content = content.replace(/to-slate-950\b/g, temp('slate-50'));
  
  content = content.replace(/from-slate-900\b/g, temp('white'));
  content = content.replace(/via-slate-900\b/g, temp('white'));
  content = content.replace(/to-slate-900\b/g, temp('white'));
  
  content = content.replace(/from-black\b/g, temp('white'));
  content = content.replace(/via-black\b/g, temp('white'));
  content = content.replace(/to-black\b/g, temp('white'));

  // 7. Selection
  content = content.replace(/selection:bg-white\b/g, temp('slate-900'));
  content = content.replace(/selection:text-black\b/g, temp('white'));

  // 8. Hover states (bg)
  content = content.replace(/hover:bg-slate-800\b/g, temp('slate-100'));
  content = content.replace(/hover:bg-slate-700\b/g, temp('slate-200'));
  content = content.replace(/hover:bg-slate-900\b/g, temp('white'));
  content = content.replace(/hover:bg-white\/10\b/g, temp('slate-900/10'));
  content = content.replace(/hover:bg-white\b/g, temp('slate-900'));

  // Restore placeholders
  content = content.replace(/TMP_/g, '');

  fs.writeFileSync(file, content, 'utf8');
});

console.log('Theme inverted successfully!');
