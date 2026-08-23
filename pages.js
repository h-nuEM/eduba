/* ═══════════════════════════════════════════════════════
   pages.js — la liste. Un seul endroit à modifier.

   Chaque texte :
     slug     nom du fichier dans textes/ (sans .md)
     title    titre affiché
     tag      'hayes' ou 'recherche'
     source   'Hayes', 'CDLI', 'Louvre'
     cdli     numéro P… si le texte est au catalogue, sinon null
     date     date de rédaction (AAAA-MM-JJ)
     edition  référence publiée si elle existe (RIME…), sinon null
     ready    false tant que le .md n'est pas écrit ; ces textes
              n'apparaissent pas sur le site. Sert de liste de
              migration : passer à true au fur et à mesure.
════════════════════════════════════════════════════════ */

const SITE = {
  title:   'Eduba',
  tagline: 'Textes sumériens',
  glyphes: '𒂍𒁾𒁀',
  /* La phrase d'accueil accepte du HTML, pour pouvoir y mettre un lien. */
  phrase:  '<a href="https://fr.wikipedia.org/wiki/Eduba" target="_blank" '
         + 'rel="noopener">La maison des tablettes</a>. '
         + 'Tout ce sur quoi je travaille en sumérien.'
};

const textes = [

  /* ── Hayes ─────────────────────────────────────────── */
  { slug:'texte-0',          title:'Texte 0',                           tag:'hayes',      source:'Hayes',                   cdli:null,       date:'2025-08-30', edition:null, ready:true },
  { slug:'hayes-02',         title:'Hayes 2',                           tag:'hayes',      source:'Hayes',                   cdli:'P226650',  date:'2025-08-31', edition:null, ready:true },
  { slug:'hayes-01',         title:'Hayes 1',                           tag:'hayes',      source:'Hayes',                   cdli:'P226639',  date:'2025-08-31', edition:null, ready:true },
  { slug:'hayes-03',         title:'Hayes 3',                           tag:'hayes',      source:'Hayes',                   cdli:'P226198',  date:'2025-09-08', edition:null, ready:true },
  { slug:'hayes-03a',        title:'Hayes 3a',                          tag:'hayes',      source:'Hayes',                   cdli:'P226636',  date:'2025-09-11', edition:null, ready:true },
  { slug:'hayes-04',         title:'Hayes 4',                           tag:'hayes',      source:'Hayes',                   cdli:'P226150',  date:'2025-09-12', edition:null, ready:true },
  { slug:'hayes-05',         title:'Hayes 5',                           tag:'hayes',      source:'Hayes',                   cdli:'P226844',  date:'2025-11-30', edition:null, ready:true },
  { slug:'hayes-06',         title:'Hayes 6',                           tag:'hayes',      source:'Hayes',                   cdli:'P226921',  date:'2025-12-27', edition:null, ready:true },
  { slug:'hayes-06b',        title:'Hayes 6b',                          tag:'hayes',      source:'Hayes',                   cdli:'P226641',  date:'2026-03-07', edition:null, ready:true },
  { slug:'hayes-07',         title:'Hayes 7',                           tag:'hayes',      source:'Hayes',                   cdli:'P226571',  date:'2026-03-07', edition:null, ready:true },
  { slug:'hayes-08',         title:'Hayes 8',                           tag:'hayes',      source:'Hayes',                   cdli:'P226635',  date:'2026-03-21', edition:null, ready:true },
  { slug:'hayes-09',         title:'Hayes 9',                           tag:'hayes',      source:'Hayes',                   cdli:'P226821',  date:'2026-08-03', edition:null, ready:true },
  { slug:'hayes-09a',        title:'Hayes 9a',                          tag:'hayes',      source:'Hayes',                   cdli:'P226524',  date:'2026-08-05', edition:null, ready:true },
  { slug:'hayes-10',         title:'Hayes 10',                          tag:'hayes',      source:'Hayes',                   cdli:'P226717',  date:'2026-08-07', edition:null, ready:true },
  { slug:'hayes-11',         title:'Hayes 11',                          tag:'hayes',      source:'Hayes',                   cdli:'P432157',  date:'2026-08-10', edition:null, ready:true },

  /* ── Recherche ─────────────────────────────────────── */
  { slug:'carte-postale',    title:'Carte Postale',                     tag:'recherche',  source:'Composition personnelle', cdli:null,       date:'2025-09-02', edition:null, ready:true },
  { slug:'ao3024-louvre',    title:'AO 3024 - Le Louvre / IN PROGRESS', tag:'recherche',  source:'Louvre',                  cdli:'P345345',  date:'2025-09-07', edition:null, ready:true },
  { slug:'gudea-louvre',     title:'Le Louvre - Gudea',                 tag:'recherche',  source:'Louvre',                  cdli:'P232483',  date:'2025-11-21', edition:null, ready:true },
  { slug:'shulgi-louvre',    title:'Le Louvre - Shulgi',                tag:'recherche',  source:'Louvre',                  cdli:'P227047',  date:'2025-11-24', edition:null, ready:true },
  { slug:'poids-canard',     title:'Poids Canard',                      tag:'recherche',  source:'CDLI',                    cdli:'P226235',  date:'2025-12-20', edition:null, ready:true },
  { slug:'entemena-louvre',  title:'Entemena - Le Louvre',              tag:'recherche',  source:'Louvre',                  cdli:'P222512',  date:'2025-12-31', edition:null, ready:true },
  { slug:'en-cours',         title:'Work in Progress',                  tag:'recherche',  source:null,                      cdli:null,       date:'2026-01-10', edition:null, ready:true },
  { slug:'recu-cuivre',      title:'Receipt for Copper',                tag:'recherche',  source:'CDLI',                    cdli:'P391102',  date:'2026-02-01', edition:null, ready:true },
  { slug:'recu-vetement',    title:'Receipt for Garment',               tag:'recherche',  source:'CDLI',                    cdli:'P391105',  date:'2026-02-04', edition:null, ready:true },
  { slug:'p315432',          title:'Unknown - P315432',                 tag:'recherche',  source:'CDLI',                    cdli:'P315432',  date:'2026-02-07', edition:null, ready:true },
  { slug:'p391103',          title:'P391103',                           tag:'recherche',  source:'CDLI',                    cdli:'P391103',  date:'2026-02-11', edition:null, ready:true },
  { slug:'p391104',          title:'P391104',                           tag:'recherche',  source:'CDLI',                    cdli:'P391104',  date:'2026-02-14', edition:null, ready:true },
  { slug:'p507781',          title:'P507781',                           tag:'recherche',  source:'CDLI',                    cdli:'P507781',  date:'2026-08-21', edition:null, ready:true },

];

/* ── Les rubriques ─────────────────────────────────────
   Titre et chapeau des pages de liste. Changer un texte
   d'introduction, c'est changer une ligne ici, jamais
   index.html. `note` accepte du HTML, comme SITE.phrase.
──────────────────────────────────────────────────────── */

const rubriques = {
  lecons: {
    titre:'Leçons',
    note:'Notes de travail sur <a href="https://digitalhammurabi.com/books" '
       + 'target="_blank" rel="noopener">Learn to Read Ancient Sumerian</a>, '
       + 'de Joshua Bowen et Megan Lewis.'
  },
  hayes: {
    titre:'Hayes',
    note:'Les exercices du manuel, lus et annotés.'
  },
  recherche: {
    titre:'Recherche',
    note:'Les tablettes choisies. Musées, CDLI.'
  },
  tous: {
    titre:'Tous les textes'
  },
};

/* ── Les leçons, reprises de LearnSumerian ─────────────
   Le cours d'après Bowen. Une leçon n'a ni cote CDLI ni
   tag hayes/recherche : c'est une liste à part.
     slug   nom du fichier dans lecons/ (sans .md)
     title  titre court, celui de la colonne
     sujet  ce que la leçon traite
──────────────────────────────────────────────────────── */

const lecons = [
  { slug:'lecon-1', title:'Leçon 1', sujet:'Noms et adjectifs' },
  { slug:'lecon-2', title:'Leçon 2', sujet:'Verbes et génitif' },
  { slug:'lecon-3', title:'Leçon 3', sujet:'Les cas' },
  { slug:'lecon-4', title:'Leçon 4', sujet:'Les cas verbaux' },
  { slug:'lecon-5', title:'Leçon 5', sujet:'Inflexion verbale' },
  { slug:'lecon-6', title:'Leçon 6', sujet:'Pronoms possessifs, verbes intransitifs' },
  { slug:'lecon-7', title:'Leçon 7', sujet:'Verbes transitifs : hamtu' },
  { slug:'lecon-8', title:'Leçon 8', sujet:'Verbes transitifs : marû' },
];

/* ── Les rangées de la page d'accueil ──────────────────
   Ajouter un projet, c'est ajouter une ligne.
   route  : une page d'ici       ('hayes', 'recherche', 'tous')
   url    : un site extérieur
   ni l'un ni l'autre : la rangée est grisée, pas cliquable.
──────────────────────────────────────────────────────── */

const projets = [
  { label:'LearnSumerian', route:'lecons',
    note:'Le cours de sumérien en français. Bowen.', meta:'8 leçons' },
  { label:'Hayes', route:'hayes',
    note:'Les exercices du manuel, lus et annotés.' },
  { label:'Recherche', route:'recherche',
    note:'Les tablettes choisies. Musées, CDLI.' },
  { label:'Cuneilab',
    note:'Reconnaissance de signes.', meta:'à venir' },
  { label:'Python',
    note:'Analyse du corpus, apprentissage automatique.', meta:'à venir' },
];

const references = [
  { label:'Glossaire', route:'reference/glossaire',
    note:'Le vocabulaire des leçons.' },
  { label:'Tables',    route:'reference/tables',
    note:'Cas, pronoms, aspects. Les tableaux du cours.' },
  { label:'CDLI',  url:'https://cdli.earth/',
    note:'Catalogue, photographies, et mes soumissions.', meta:'↗' },
  { label:'ePSD2', url:'https://oracc.museum.upenn.edu/epsd2/',
    note:'Dictionnaire.', meta:'↗' },
];

/* Les listes de signes, celles que je consulte en lisant. */
const signes = [
  { label:'Šašková',   url:'https://home.zcu.cz/~ksaskova/Sign_List.html',
    note:'Liste de signes, par forme.', meta:'↗' },
  { label:'Wikipedia', url:'https://en.wikipedia.org/wiki/List_of_cuneiform_signs',
    note:'Liste de signes, par nom.', meta:'↗' },
  { label:'Mottay', route:'reference/signes-frequents',
    note:'Liste de signes, par fréquence.', meta:'150' },
  { label:'Bowen',  route:'reference/signes',
    note:'Liste de signes, celle du cours.' },
];
