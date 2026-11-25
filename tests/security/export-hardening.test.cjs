// node --test tests/security/export-hardening.test.cjs
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..', '..');
const sequence = (name) => fs.readFileSync(path.join(root, '_c8oProject/sequences', `${name}.yaml`), 'utf8');
const exportSequence = sequence('ExportDataToSheet');
const writeStep = (() => {
  const block = exportSequence.match(/\n↓write_xlsx \[steps\.SimpleStep-\d+\]: \n  expression: \|\n([\s\S]*?)\n↓/)[1];
  return block.split('\n').map((line) => line.slice(4)).join('\n').trim().replace(/^'/, '').replace(/'$/, '').replace(/''/g, "'");
})();

function exportRows(rows, { internal = false, maxCells = '', header } = {}) {
  class File {
    constructor(parent, name) {
      const base = parent instanceof File ? parent.path : String(parent);
      this.path = name === undefined ? base : `${base}/${name}`;
    }
    getCanonicalPath() { return this.path; }
    static get separator() { return '/'; }
  }
  const written = [];
  const sheets = [];
  const context = {
    include() {}, log: { warn() {} },
    XLSX: { utils: { json_to_sheet: (...args) => sheets.push(args) && {}, book_new: () => ({}), book_append_sheet() {} }, write: () => 'AAAA' },
    book_types: { xlsx: { extension: '.xlsx' } }, book_type: 'xlsx', file_name: 'export.xlsx', sheet_name: 'Sheet',
    data_error: '', jsonVar: rows, header,
    java: { io: { File }, util: { UUID: { randomUUID: () => ({ toString: () => 'uuid' }) } } },
    com: { twinsoft: { convertigo: { engine: {
      util: { Base64: { decode: () => [] } },
      Engine: { theApp: { databaseObjectsManager: { getCompiledValue: (text) => {
        assert.equal(text, '${lib_MicrosoftExcel.maxExportCells=2000000}');
        return maxCells === '' ? '2000000' : maxCells;
      } } } },
    } } } },
    org: { apache: { commons: { io: { FileUtils: { writeByteArrayToFile: (file) => written.push(file.path) } } } } },
    context: {
      getProjectDirectory: () => '/workspace/projects/lib_MicrosoftExcel',
      getConvertigoUrl: () => 'https://server/convertigo/', getProjectName: () => 'lib_MicrosoftExcel',
      addFileToDeleteAtEndOfSession() {},
      requestedObject: { getRequester: () => ({ isInternal: () => internal }) },
    },
  };
  vm.runInNewContext(writeStep, context);
  return { success: context.is_success, error: context.error_msg, localPath: context.local_path_value, written, sheets };
}

test('an HTTP client gets the URL of the export, never its path on the server', () => {
  const external = exportRows([{ a: 1 }]);
  assert.equal(external.success, true);
  assert.equal(external.localPath, null);
  const internal = exportRows([{ a: 1 }], { internal: true });
  assert.equal(internal.localPath, '/workspace/projects/lib_MicrosoftExcel/outputs/uuid-export.xlsx');
  assert.match(exportSequence, /↓local_path \[steps\.JsonFieldStep-\d+\]: \n[\s\S]*?- ↑mode: JS\n\s+- →→: local_path_value\n/);
});

test('the size of an export is bounded by lib_MicrosoftExcel.maxExportCells', () => {
  assert.equal(exportRows([{ a: 1, b: 2 }, { a: 3, b: 4 }], { maxCells: '4' }).success, true);
  const refused = exportRows([{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }], { maxCells: '4' });
  assert.equal(refused.success, false);
  assert.match(refused.error, /Too much data to export: 5 cells, at most 4/);
  assert.deepEqual(refused.written, []);
  assert.equal(exportRows([{ a: 1 }], { maxCells: 'not a number' }).success, true, 'an invalid symbol keeps the default');
});

test('the cleanup of old exports cannot be called over HTTP', () => {
  assert.match(sequence('autoRemoveFolder'), /^accessibility: Private\nautoStart: true\n/);
  assert.match(sequence('clean_outputs'), /^accessibility: Private\n/);
});

test('the header gives the order of the columns of the sheet, a name made of digits included', () => {
  const rows = [{ 2024: 5, Pratique: 'A', 2025: 7 }];
  const ordered = exportRows(rows, { header: JSON.stringify(['Pratique', '2024', 2025]) });
  assert.equal(ordered.success, true);
  // (objects of the script context, compared as JSON)
  const sheets = (result) => JSON.parse(JSON.stringify(result.sheets));
  assert.deepEqual(sheets(ordered), [[rows, { header: ['Pratique', '2024', '2025'] }]]);
  assert.deepEqual(sheets(exportRows(rows)), [[rows]], 'without header, as before');
  assert.deepEqual(sheets(exportRows(rows, { header: '' })), [[rows]]);
  for (const header of ['not json', '{"a":1}', '[["a"]]', '[null]', JSON.stringify(new Array(16385).fill('a'))]) {
    const refused = exportRows(rows, { header });
    assert.equal(refused.success, false, header.slice(0, 20));
    assert.equal(refused.error, 'Invalid header');
    assert.equal(refused.written.length, 0);
  }
  // the names of the header count as cells
  assert.equal(exportRows([{ a: 1, b: 2 }], { maxCells: '4', header: '["a","b"]' }).success, true);
  assert.equal(exportRows([{ a: 1, b: 2 }], { maxCells: '3', header: '["a","b"]' }).success, false);
  assert.match(exportSequence, /\n↓header \[variables\.RequestableVariable-\d+\]: \n  comment: Optional\./);
});
