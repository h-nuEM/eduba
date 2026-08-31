/* ═══════════════════════════════════════════════════════
   itt5.js — le fonds ITT 5, feuilleté tablette par tablette.

   556 tablettes de Tello publiées par Genouillac en 1921,
   celles dont la translittération du catalogue CDLI se
   reconvertit en signes. La copie vient de CDLI, en ligne ;
   rien n'est copié dans le dépôt.

   Deux routes :
     #itt5            la liste, avec un champ de filtre
     #itt5/P111425    une tablette, copie à gauche, texte à droite

   Les données sont dans itt5.json, chargé à la première
   visite et gardé en mémoire ensuite.
════════════════════════════════════════════════════════ */

let ITT5 = null;          /* le tableau des 556, une fois chargé */
let ITT5_INDEX = null;    /* pid -> position, pour les flèches   */

async function chargerItt5() {
  if (ITT5) return ITT5;
  const res = await fetch('itt5.json');
  if (!res.ok) throw new Error('itt5.json ' + res.status);
  ITT5 = await res.json();
  ITT5_INDEX = new Map(ITT5.map((t, i) => [t.pid, i]));
  return ITT5;
}

/* La période du catalogue, sans les dates entre parenthèses. */
const periode = p => String(p || '').replace(/\s*\(.*$/, '');

/* ── La liste ────────────────────────────────────────── */
async function showItt5Liste() {
  setActive('itt5');
  content.innerHTML = '<div id="loading">Chargement…</div>';

  let liste;
  try { liste = await chargerItt5(); }
  catch (e) {
    content.innerHTML = `<h1>ITT 5</h1>
      <p>Le fichier <code>itt5.json</code> est introuvable.</p>`;
    return;
  }

  const r = rubriques.itt5;
  content.innerHTML = `
    <h1>${esc(r.titre)}</h1>
    <div class="cote">${liste.length} tablettes<span class="sep">·</span>${
      liste.reduce((n, t) => n + t.n_lines, 0).toLocaleString('fr')} lignes</div>
    ${r.note ? `<div class="chapeau">${r.note}</div>` : ''}
    <input id="filtre-itt5" class="app" autocomplete="off"
           placeholder="Filtrer : numéro de tablette, cote de musée, période…" />
    <div class="liste" id="liste-itt5">${liste.map(rangeeItt5).join('')}</div>`;

  const champ = document.getElementById('filtre-itt5');
  const zone  = document.getElementById('liste-itt5');
  champ.addEventListener('input', () => {
    const q = champ.value.trim().toLowerCase();
    const vus = q
      ? liste.filter(t => (t.designation + ' ' + t.museum_no + ' ' +
                           t.period + ' ' + t.pid).toLowerCase().includes(q))
      : liste;
    zone.innerHTML = vus.length
      ? vus.map(rangeeItt5).join('')
      : `<div class="vide-note">Rien trouvé.</div>`;
  });
  window.scrollTo(0, 0);
}

function rangeeItt5(t) {
  return `<a class="item" href="#" onclick="navigate('itt5/${t.pid}');return false;">
    <span class="nom-item">${esc(t.designation)}</span>
    <span class="desc">${esc(t.museum_no)} · ${esc(periode(t.period))}</span>
    <span class="meta">${t.n_lines} l.</span></a>`;
}

/* ── Une tablette ────────────────────────────────────── */
async function showItt5Tablette(pid) {
  setActive('itt5');
  content.innerHTML = '<div id="loading">Chargement…</div>';

  try { await chargerItt5(); }
  catch { content.innerHTML = `<h1>ITT 5</h1>
    <p>Le fichier <code>itt5.json</code> est introuvable.</p>`; return; }

  const i = ITT5_INDEX.get(pid);
  if (i === undefined) {
    content.innerHTML = `<h1>Tablette inconnue</h1>
      <p><code>${esc(pid)}</code> n'est pas dans ce fonds.</p>
      <a class="retour" href="#" onclick="navigate('itt5');return false;">← ITT 5</a>`;
    return;
  }

  const t    = ITT5[i];
  const prev = i > 0 ? ITT5[i - 1] : null;
  const next = i < ITT5.length - 1 ? ITT5[i + 1] : null;

  const fleche = (cible, texte, cote) => cible
    ? `<a class="fleche" href="#" onclick="navigate('itt5/${cible.pid}');return false;"
         title="${esc(cible.designation)}">${texte}</a>`
    : `<span class="fleche morte">${texte}</span>`;

  content.innerHTML = `
    <a class="retour" href="#" onclick="navigate('itt5');return false;">← ITT 5</a>

    <div class="itt5-barre app">
      ${fleche(prev, '← précédente')}
      <span class="position">${i + 1} / ${ITT5.length}</span>
      ${fleche(next, 'suivante →')}
    </div>

    <h1>${esc(t.designation)}</h1>
    <div class="cote">
      ${esc(t.museum_no)}<span class="sep">·</span>${esc(periode(t.period))}
      <span class="sep">·</span>${esc(t.provenience || '')}
      <span class="sep">·</span><a href="${t.cdli}" target="_blank" rel="noopener">${t.pid}</a>
    </div>

    <div class="itt5-planche">
      <div class="itt5-copie">
        <img src="${t.lineart}" alt="Copie de ${esc(t.designation)}"
             onerror="this.parentNode.innerHTML='<div class=\\'itt5-sans-copie\\'>Pas de copie en ligne pour ${t.pid}.</div>'" />
        <div class="itt5-credit app">Copie : CDLI</div>
      </div>
      <div class="itt5-texte">
        ${t.blocks.map(b => `
          <h3>${esc(b.surface)}</h3>
          <table class="itt5-lignes"><tbody>${b.lines.map(l => `
            <tr><td>${esc(l.no)}</td><td>${esc(l.text)}</td></tr>`).join('')}
          </tbody></table>`).join('')}
      </div>
    </div>`;

  window.scrollTo(0, 0);
}

/* ── Les flèches du clavier ──────────────────────────── */
document.addEventListener('keydown', e => {
  if (!ITT5 || e.metaKey || e.ctrlKey || e.altKey) return;
  if (/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) return;
  const m = /^#itt5\/(P\d+)$/.exec(window.location.hash);
  if (!m) return;
  const i = ITT5_INDEX.get(m[1]);
  if (i === undefined) return;
  if (e.key === 'ArrowLeft'  && i > 0)
    navigate('itt5/' + ITT5[i - 1].pid);
  if (e.key === 'ArrowRight' && i < ITT5.length - 1)
    navigate('itt5/' + ITT5[i + 1].pid);
});

/* ── Le style, injecté pour ne pas toucher index.html ── */
document.head.insertAdjacentHTML('beforeend', `<style>
#filtre-itt5{
  font-family:'IBM Plex Mono',Consolas,monospace; font-size:.75rem;
  padding:.45rem .7rem; width:100%; max-width:50rem;
  margin:2.2rem 0 .6rem;
  border:1px solid var(--bord); background:transparent; color:var(--text);
}
#filtre-itt5::placeholder{color:var(--muted)}
#filtre-itt5:focus{outline:none; border-color:var(--accent)}

.itt5-barre{
  display:flex; align-items:baseline; gap:1.4rem;
  margin:0 0 2rem; padding-bottom:.7rem;
  border-bottom:1px solid var(--bord); max-width:50rem;
}
.itt5-barre .position{color:var(--muted); margin-left:auto;
  font-variant-numeric:tabular-nums}
.fleche{text-decoration:none; color:var(--accent);
  text-transform:uppercase; letter-spacing:.1em; font-size:.68rem}
.fleche.morte{color:var(--bord); text-transform:uppercase;
  letter-spacing:.1em; font-size:.68rem}

/* La copie à gauche, le texte à droite. La copie reste en vue
   pendant qu'on descend dans un texte long. */
.itt5-planche{
  display:grid; grid-template-columns:minmax(0,18rem) minmax(0,1fr);
  gap:2.6rem; align-items:start; margin-top:2.4rem;
}
.itt5-copie{position:sticky; top:2rem}
.itt5-copie img{
  width:100%; height:auto; border:1px solid var(--bord); display:block;
  background:#fff;
}
.itt5-credit{color:var(--muted); margin-top:.5rem}
.itt5-sans-copie{
  border:1px dashed var(--bord); color:var(--muted);
  padding:2.5rem 1rem; text-align:center; font-size:.85rem;
}
.itt5-texte h3:first-child{margin-top:0}

table.itt5-lignes{border-collapse:collapse; width:100%; margin-bottom:.4rem}
table.itt5-lignes td{padding:.3rem 0; vertical-align:baseline}
table.itt5-lignes td:first-child{
  font-family:'IBM Plex Mono',Consolas,monospace; font-size:.7rem;
  color:var(--muted); text-align:right; width:3rem;
  padding-right:1rem; font-variant-numeric:tabular-nums; white-space:nowrap;
}
table.itt5-lignes td:nth-child(2){
  font-family:'IBM Plex Mono',Consolas,monospace; font-size:.8rem;
  border-left:1px solid var(--bord); padding-left:1.1rem; line-height:1.6;
}

@media (max-width:860px){
  .itt5-planche{grid-template-columns:1fr; gap:1.6rem}
  .itt5-copie{position:static; max-width:15rem}
}
</style>`);
