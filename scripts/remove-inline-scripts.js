const { resolve } = require('path');
const { createHash } = require('crypto');
const { readFileSync, writeFileSync } = require('fs');
const { globSync } = require('glob');

// pretend we are in a production build
process.env.NODE_ENV = 'production';

const DIST_DIR = 'dist';
const BASE_PATH = '/';
const MAGIC_STRING = '__this_is_a_placeholder_for_the_inline_scripts__';

console.log('grab all the html files');
const baseDir = resolve(DIST_DIR.replace(/^\//, ''));
const htmlFiles = globSync(`${baseDir}/**/*.html`);
htmlFiles.forEach((file) => {
  // grab inline scripts from each html file
  const contents = readFileSync(file).toString();
  const scripts = [];
  const newFile = contents.replace(/<script>(.+?)<\/script>/g, (_, data) => {
    const addMagicString = scripts.length === 0;
    scripts.push(`${data}${data.endsWith(';') ? '' : ';'}`);
    return addMagicString ? MAGIC_STRING : '';
  });

  // early exit if we have no inline scripts
  if (!scripts.length) {
    return;
  }
  console.log(`processing ${file}`);

  // combine all the inline scripts, add a hash, and reference the new file
  console.log('\trewriting');
  const chunk = scripts.join('');
  const hash = createHash('md5').update(chunk).digest('hex');
  writeFileSync(`${baseDir}/assets/chunk.${hash}.js`, chunk);
  writeFileSync(
    file,
    newFile.replace(
      MAGIC_STRING,
      `<script src="${BASE_PATH}${BASE_PATH.endsWith('/') ? '' : '/'}assets/chunk.${hash}.js" crossorigin=""></script>`
    )
  );
  console.log('\tfinished');
});
