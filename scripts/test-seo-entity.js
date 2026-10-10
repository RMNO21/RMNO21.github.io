const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;
const failureDetails = [];

function check(title, condition, detail = '') {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`  ✓ PASS: ${title}`);
  } else {
    failedChecks++;
    console.error(`  ✗ FAIL: ${title} -> ${detail}`);
    failureDetails.push({ title, detail });
  }
}

console.log('===============================================================');
console.log('   STRICT SEO & GOOGLE KNOWLEDGE PANEL VERIFICATION SUITE      ');
console.log('===============================================================\n');

// 1. ALL PAGES REGISTRY
const enPages = [
  'index.html',
  'resume.html',
  'projects/ai-virtual-mouse.html',
  'projects/dimoled.html',
  'projects/drawsiness-detection.html',
  'projects/esp32-deauth.html',
  'projects/rmn-player.html',
  'projects/ruview.html',
  'projects/sepotify.html',
  'projects/sess-shirazu-autologin.html'
];

const faPages = [
  'fa/index.html',
  'fa/resume.html',
  'fa/projects/ai-virtual-mouse.html',
  'fa/projects/dimoled.html',
  'fa/projects/drawsiness-detection.html',
  'fa/projects/esp32-deauth.html',
  'fa/projects/rmn-player.html',
  'fa/projects/ruview.html',
  'fa/projects/sepotify.html',
  'fa/projects/sess-shirazu-autologin.html'
];

const farsiRegex = /[\u0600-\u06FF]/;

// ==========================================
// SECTION 1: LINGUISTIC ISOLATION (ZERO PERSIAN ON ENGLISH SEARCH RESULTS)
// ==========================================
console.log('--- SECTION 1: Linguistic Isolation & Search Snippet Cleanliness ---');

enPages.forEach(p => {
  const fullPath = path.join(rootDir, p);
  check(`File exists: ${p}`, fs.existsSync(fullPath));
  if (!fs.existsSync(fullPath)) return;

  const content = fs.readFileSync(fullPath, 'utf-8');

  // Title tag check
  const titleMatch = content.match(/<title[^>]*>([^<]+)<\/title>/i);
  check(`${p} has <title>`, !!titleMatch);
  if (titleMatch) {
    const titleText = titleMatch[1].trim();
    check(`${p} title has ZERO Persian characters (English search purity)`, !farsiRegex.test(titleText), `Found: "${titleText}"`);
    check(`${p} title length between 25 and 75 chars (${titleText.length})`, titleText.length >= 25 && titleText.length <= 75);
  }

  // Meta description check
  const metaDescMatch = content.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  check(`${p} has <meta name="description">`, !!metaDescMatch);
  if (metaDescMatch) {
    const descText = metaDescMatch[1].trim();
    check(`${p} meta description has ZERO Persian characters`, !farsiRegex.test(descText), `Found: "${descText}"`);
    check(`${p} meta description length between 80 and 180 chars (${descText.length})`, descText.length >= 80 && descText.length <= 180);
  }

  // OG Title & Description
  const ogTitleMatch = content.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i);
  if (ogTitleMatch) {
    check(`${p} og:title has ZERO Persian characters`, !farsiRegex.test(ogTitleMatch[1]));
  }

  const ogDescMatch = content.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i);
  if (ogDescMatch) {
    check(`${p} og:description has ZERO Persian characters`, !farsiRegex.test(ogDescMatch[1]));
  }
});

// Special check for English resume body
const resumeEnContent = fs.readFileSync(path.join(rootDir, 'resume.html'), 'utf-8');
const resumeEnBodyStart = resumeEnContent.indexOf('<main');
const resumeEnBody = resumeEnContent.substring(resumeEnBodyStart);
check('resume.html visible content has ZERO Persian characters', !farsiRegex.test(resumeEnBody), 'Found Persian characters inside English resume body!');

// Persian pages check
faPages.forEach(p => {
  const fullPath = path.join(rootDir, p);
  check(`File exists: ${p}`, fs.existsSync(fullPath));
  if (!fs.existsSync(fullPath)) return;

  const content = fs.readFileSync(fullPath, 'utf-8');
  check(`${p} has lang="fa"`, /<html[^>]*lang=["']fa["']/i.test(content));
  check(`${p} has dir="rtl"`, /<html[^>]*dir=["']rtl["']/i.test(content));

  const titleMatch = content.match(/<title[^>]*>([^<]+)<\/title>/i);
  check(`${p} title contains Persian characters`, titleMatch && farsiRegex.test(titleMatch[1]));

  const metaDescMatch = content.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  check(`${p} meta description contains Persian characters`, metaDescMatch && farsiRegex.test(metaDescMatch[1]));
});

// ==========================================
// SECTION 2: RECIPROCAL HREFLANG & CANONICAL AUDIT
// ==========================================
console.log('\n--- SECTION 2: Reciprocal Hreflang & Canonical URL Audit ---');

const allPages = [...enPages, ...faPages];
allPages.forEach(p => {
  const fullPath = path.join(rootDir, p);
  if (!fs.existsSync(fullPath)) return;
  const content = fs.readFileSync(fullPath, 'utf-8');

  // Canonical
  const canonicalMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  check(`${p} has canonical URL`, !!canonicalMatch);
  if (canonicalMatch) {
    check(`${p} canonical URL begins with https://rmno21.github.io/`, canonicalMatch[1].startsWith('https://rmno21.github.io/'));
  }

  // Reciprocal Hreflangs
  check(`${p} has hreflang="en"`, /<link\s+rel=["']alternate["']\s+hreflang=["']en["']/i.test(content));
  check(`${p} has hreflang="fa"`, /<link\s+rel=["']alternate["']\s+hreflang=["']fa["']/i.test(content));
  check(`${p} has hreflang="x-default"`, /<link\s+rel=["']alternate["']\s+hreflang=["']x-default["']/i.test(content));
});

// ==========================================
// SECTION 3: SEMANTIC HTML & ACCESSIBILITY
// ==========================================
console.log('\n--- SECTION 3: Semantic Hierarchy & Asset Alt Tags ---');

allPages.forEach(p => {
  const fullPath = path.join(rootDir, p);
  if (!fs.existsSync(fullPath)) return;
  const content = fs.readFileSync(fullPath, 'utf-8');

  // Single H1
  const h1Matches = content.match(/<h1[\s>]/gi);
  check(`${p} has exactly one <h1> heading`, h1Matches && h1Matches.length === 1, `Found ${h1Matches ? h1Matches.length : 0} h1 tags`);

  // Image Alt tags
  const imgTags = content.match(/<img[^>]+>/gi) || [];
  let allImgHaveAlt = true;
  imgTags.forEach(img => {
    if (!/alt=["'][^"']+["']/i.test(img)) allImgHaveAlt = false;
  });
  check(`${p} all images (${imgTags.length}) have non-empty alt text`, allImgHaveAlt);
});

// ==========================================
// SECTION 4: GOOGLE KNOWLEDGE PANEL (PERSON ENTITY RESOLUTION)
// ==========================================
console.log('\n--- SECTION 4: Google Knowledge Panel & Entity Schema.org Audit ---');

const indexContent = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf-8');
const jsonLdMatch = indexContent.match(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/i);
check('index.html contains JSON-LD structured data', !!jsonLdMatch);

if (jsonLdMatch) {
  let schema = null;
  try {
    schema = JSON.parse(jsonLdMatch[1]);
    check('JSON-LD syntax is valid JSON', true);
  } catch (err) {
    check('JSON-LD syntax is valid JSON', false, err.message);
  }

  if (schema) {
    const graph = schema['@graph'] || [schema];
    const person = graph.find(e => e['@type'] === 'Person') || (schema['@type'] === 'Person' ? schema : null);

    check('Person entity exists in Schema', !!person);
    if (person) {
      check('Person has @id URI https://rmno21.github.io/#person', person['@id'] === 'https://rmno21.github.io/#person');
      check('Person name is Raman Tondro', person.name === 'Raman Tondro');
      check('Person alternateName contains "رامان تندرو"', Array.isArray(person.alternateName) && person.alternateName.includes('رامان تندرو'));
      check('Person alternateName contains "RMNO21"', Array.isArray(person.alternateName) && person.alternateName.includes('RMNO21'));
      check('Person jobTitle defined', !!person.jobTitle);

      const sameAs = person.sameAs || [];
      check('sameAs contains Wikidata Q141601053', sameAs.includes('https://www.wikidata.org/wiki/Q141601053'));
      check('sameAs contains ORCID 0009-0008-3052-1874', sameAs.includes('https://orcid.org/0009-0008-3052-1874'));
      check('sameAs contains GitHub RMNO21', sameAs.includes('https://github.com/RMNO21'));
      check('sameAs contains Telegram RMNT21', sameAs.includes('https://t.me/RMNT21'));
      check('sameAs contains YouTube RMNT21', sameAs.includes('https://www.youtube.com/@RMNT21'));
      check('sameAs contains Virgool @ramantondro', sameAs.includes('https://virgool.io/@ramantondro'));

      check('alumniOf specifies Shiraz University', person.alumniOf && (person.alumniOf.name === 'Shiraz University'));
      check('alumniOf has Wikidata link to Shiraz University (Q1417030)', person.alumniOf && (person.alumniOf.sameAs === 'https://www.wikidata.org/wiki/Q1417030'));
      check('worksFor specifies Peyman Sakht Co.', !!person.worksFor && person.worksFor.name.includes('Peyman Sakht'));
      check('knowsAbout array has at least 5 technical domains', Array.isArray(person.knowsAbout) && person.knowsAbout.length >= 5);
      check('image property has high-resolution portrait URLs', Array.isArray(person.image) && person.image.length >= 2);
    }
  }
}

// ==========================================
// SECTION 5: SITEMAP & ROBOTS.TXT INTEGRITY
// ==========================================
console.log('\n--- SECTION 5: Robots.txt & Sitemap.xml Full Mesh Verification ---');

const robotsPath = path.join(rootDir, 'robots.txt');
check('robots.txt exists', fs.existsSync(robotsPath));
if (fs.existsSync(robotsPath)) {
  const robots = fs.readFileSync(robotsPath, 'utf-8');
  check('robots.txt allows root /', /Allow:\s*\//i.test(robots));
  check('robots.txt disallows /certificates/', /Disallow:\s*\/certificates\//i.test(robots));
  check('robots.txt references sitemap.xml', /Sitemap:\s*https:\/\/rmno21\.github\.io\/sitemap\.xml/i.test(robots));
  check('robots.txt references sitemap.txt', /Sitemap:\s*https:\/\/rmno21\.github\.io\/sitemap\.txt/i.test(robots));
}

const sitemapXmlPath = path.join(rootDir, 'sitemap.xml');
check('sitemap.xml exists', fs.existsSync(sitemapXmlPath));
if (fs.existsSync(sitemapXmlPath)) {
  const sitemapXml = fs.readFileSync(sitemapXmlPath, 'utf-8');
  check('sitemap.xml is valid XML structure', sitemapXml.startsWith('<?xml') && sitemapXml.endsWith('</urlset>\n') || sitemapXml.endsWith('</urlset>'));

  allPages.forEach(p => {
    const urlEn = p.startsWith('fa/') ? `https://rmno21.github.io/${p}` : (p === 'index.html' ? 'https://rmno21.github.io/' : `https://rmno21.github.io/${p}`);
    const normalizedUrl = p === 'fa/index.html' ? 'https://rmno21.github.io/fa/' : urlEn;
    check(`sitemap.xml includes ${normalizedUrl}`, sitemapXml.includes(`<loc>${normalizedUrl}</loc>`));
  });
}

// ==========================================
// SECTION 6: LOCAL ASSET & INTERNAL LINK INTEGRITY
// ==========================================
console.log('\n--- SECTION 6: Local Asset & Internal Link Resolution ---');

allPages.forEach(p => {
  const fullPath = path.join(rootDir, p);
  if (!fs.existsSync(fullPath)) return;
  const content = fs.readFileSync(fullPath, 'utf-8');
  const dir = path.dirname(fullPath);

  const refRegex = /(?:src|href)=["']([^"']+)["']/g;
  let match;
  let broken = [];
  while ((match = refRegex.exec(content)) !== null) {
    const target = match[1];
    if (target.startsWith('http') || target.startsWith('#') || target.startsWith('mailto:') || target.startsWith('tel:') || target.startsWith('data:')) continue;
    const cleanTarget = target.split('?')[0].split('#')[0];
    if (!cleanTarget) continue;
    const resolved = path.resolve(dir, cleanTarget);
    if (!fs.existsSync(resolved)) {
      broken.push(`${target} (resolved: ${resolved})`);
    }
  }
  check(`${p} has zero broken internal links/assets`, broken.length === 0, broken.join(', '));
});

// Final Summary & Score
console.log('\n===============================================================');
const score = Math.round((passedChecks / totalChecks) * 100);
console.log(`TOTAL AUDIT CHECKS: ${totalChecks}`);
console.log(`PASSED: ${passedChecks}`);
console.log(`FAILED: ${failedChecks}`);
console.log(`FINAL SCORE: ${score} / 100`);
console.log('===============================================================');

if (failedChecks > 0) {
  console.error('\nFAILURE DETAILS:');
  failureDetails.forEach((f, i) => {
    console.error(`${i + 1}. ${f.title} -> ${f.detail}`);
  });
  process.exit(1);
} else {
  console.log('\n🎉 ALL RIGOROUS TESTS PASSED WITH 100 / 100 SCORE! 🎉');
  process.exit(0);
}
