<script>
	import Select from '$lib/components/Select.svelte';
	import { toast } from '$lib/stores/toast.js';

	const formats = ['json', 'xml', 'csv', 'excel'];
	let sourceFormat = 'json';
	let targetFormat = 'csv';
	let input = '';
	let output = '';
	let outputBlob = null;
	let uploadedName = '';
	let inputFile;
	let dropActive = false;
	let currentRecords = [];

	const samples = {
		json: '[\n  { "name": "Asha", "department": "Sales", "active": true },\n  { "name": "Ravi", "department": "Engineering", "active": false }\n]',
		csv: 'name,department,active\nAsha,Sales,true\nRavi,Engineering,false',
		xml: '<employees>\n  <employee><name>Asha</name><department>Sales</department><active>true</active></employee>\n  <employee><name>Ravi</name><department>Engineering</department><active>false</active></employee>\n</employees>',
		excel: 'name\tdepartment\tactive\nAsha\tSales\ttrue\nRavi\tEngineering\tfalse'
	};

	function label(format) { return format === 'excel' ? 'Excel (.xlsx)' : format.toUpperCase(); }
	function extension(format) { return format === 'excel' ? 'xlsx' : format; }

	function escapeXml(value) {
		return String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
	}
	function safeTag(name) {
		const tag = String(name || 'value').replace(/[^A-Za-z0-9_.-]/g, '_');
		return /^[A-Za-z_]/.test(tag) ? tag : `field_${tag}`;
	}
	function scalar(value) { return value === null || value === undefined ? '' : typeof value === 'object' ? JSON.stringify(value) : String(value); }

	function csvRows(text) {
		const rows = []; let row = []; let cell = ''; let quoted = false;
		for (let i = 0; i < text.length; i++) {
			const c = text[i];
			if (c === '"') { if (quoted && text[i + 1] === '"') { cell += '"'; i++; } else quoted = !quoted; }
			else if (c === ',' && !quoted) { row.push(cell); cell = ''; }
			else if ((c === '\n' || c === '\r') && !quoted) { if (c === '\r' && text[i + 1] === '\n') i++; row.push(cell); if (row.some(v => v !== '')) rows.push(row); row = []; cell = ''; }
			else cell += c;
		}
		row.push(cell); if (row.some(v => v !== '')) rows.push(row);
		return rows;
	}
	function tsvRows(text) {
		const rows = []; let row = []; let cell = ''; let quoted = false;
		for (let i = 0; i < text.length; i++) {
			const c = text[i];
			if (c === '"') { if (quoted && text[i + 1] === '"') { cell += '"'; i++; } else quoted = !quoted; }
			else if (c === '\t' && !quoted) { row.push(cell); cell = ''; }
			else if ((c === '\n' || c === '\r') && !quoted) { if (c === '\r' && text[i + 1] === '\n') i++; row.push(cell); if (row.some(v => v !== '')) rows.push(row); row = []; cell = ''; }
			else cell += c;
		}
		row.push(cell); if (row.some(v => v !== '')) rows.push(row);
		return rows;
	}
	function toRecords(value) {
		if (Array.isArray(value)) return value.map(v => typeof v === 'object' && v !== null ? v : { value: v });
		if (value && typeof value === 'object') {
			const arrays = Object.entries(value).find(([, v]) => Array.isArray(v));
			return arrays ? toRecords(arrays[1]) : [value];
		}
		return [{ value }];
	}
	function recordsFromRows(rows) {
		if (!rows.length) return [];
		const [headers, ...values] = rows;
		return values.map(row => Object.fromEntries(headers.map((h, i) => [h || `column_${i + 1}`, row[i] ?? ''])));
	}
	function recordsFromCsv(text) { return recordsFromRows(csvRows(text)); }
	function recordsFromPastedSheet(text) { return recordsFromRows(tsvRows(text)); }
	function elementValue(el) {
		const children = Array.from(el.children);
		if (!children.length) return el.textContent?.trim() ?? '';
		const obj = {};
		for (const child of children) {
			const val = elementValue(child);
			if (obj[child.tagName] === undefined) obj[child.tagName] = val;
			else obj[child.tagName] = Array.isArray(obj[child.tagName]) ? [...obj[child.tagName], val] : [obj[child.tagName], val];
		}
		return obj;
	}
	function recordsFromXml(text) {
		const doc = new DOMParser().parseFromString(text, 'application/xml');
		if (doc.querySelector('parsererror')) throw new Error('The XML is not valid.');
		const root = doc.documentElement;
		const children = Array.from(root.children);
		return children.length && children.every(c => c.tagName === children[0].tagName)
			? children.map(elementValue).map(v => typeof v === 'object' ? v : { value: v })
			: toRecords(elementValue(root));
	}
	function recordsToCsv(records) {
		if (!records || !records.length) return '';
		const headers = [...new Set(records.flatMap(r => Object.keys(r)))];
		const quote = value => { const text = scalar(value); return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text; };
		return [headers.map(quote).join(','), ...records.map(r => headers.map(h => quote(r[h])).join(','))].join('\n');
	}
	function recordsToTsv(records) {
		if (!records || !records.length) return '';
		const headers = [...new Set(records.flatMap(r => Object.keys(r)))];
		const clean = value => {
			const text = scalar(value);
			return /[\t\n\r"]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
		};
		return [headers.map(clean).join('\t'), ...records.map(r => headers.map(h => clean(r[h])).join('\t'))].join('\n');
	}
	function recordsToHtmlTable(records) {
		if (!records || !records.length) return '';
		const headers = [...new Set(records.flatMap(r => Object.keys(r)))];
		const ths = headers.map(h => `<th>${escapeXml(h)}</th>`).join('');
		const trs = records.map(r => `<tr>${headers.map(h => `<td>${escapeXml(scalar(r[h]))}</td>`).join('')}</tr>`).join('');
		return `<table><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody></table>`;
	}
	function recordsToXml(records) {
		const item = r => `<row>${Object.entries(r).map(([key, value]) => `<${safeTag(key)}>${escapeXml(scalar(value))}</${safeTag(key)}>`).join('')}</row>`;
		return `<?xml version="1.0" encoding="UTF-8"?>\n<data>\n${records.map(item).join('\n')}\n</data>`;
	}

	// Minimal ZIP writer for a standards-compliant .xlsx workbook. XLSX files are ZIP archives.
	function crc32(bytes) { let crc = -1; for (const b of bytes) { crc ^= b; for (let i = 0; i < 8; i++) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1)); } return (crc ^ -1) >>> 0; }
	function u16(n) { return [n & 255, (n >>> 8) & 255]; }
	function u32(n) { return [n & 255, (n >>> 8) & 255, (n >>> 16) & 255, (n >>> 24) & 255]; }
	function zip(files) {
		const enc = new TextEncoder(), body = [], directory = []; let offset = 0;
		for (const [name, text] of Object.entries(files)) {
			const n = enc.encode(name), data = enc.encode(text), crc = crc32(data);
			const local = new Uint8Array([...u32(0x04034b50), ...u16(20), ...u16(0), ...u16(0), ...u16(0), ...u16(0), ...u32(crc), ...u32(data.length), ...u32(data.length), ...u16(n.length), ...u16(0), ...n, ...data]);
			body.push(local); directory.push(new Uint8Array([...u32(0x02014b50), ...u16(20), ...u16(20), ...u16(0), ...u16(0), ...u16(0), ...u16(0), ...u32(crc), ...u32(data.length), ...u32(data.length), ...u16(n.length), ...u16(0), ...u16(0), ...u16(0), ...u16(0), ...u32(0), ...u32(offset), ...n])); offset += local.length;
		}
		const size = directory.reduce((n, item) => n + item.length, 0);
		return new Blob([...body, ...directory, new Uint8Array([...u32(0x06054b50), ...u16(0), ...u16(0), ...u16(directory.length), ...u16(directory.length), ...u32(size), ...u32(offset), ...u16(0)])], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
	}
	function excelBlob(records) {
		const headers = [...new Set(records.flatMap(r => Object.keys(r)))];
		const col = i => { let s = ''; for (i++; i; i = Math.floor((i - 1) / 26)) s = String.fromCharCode(65 + ((i - 1) % 26)) + s; return s; };
		const row = (cells, index) => `<row r="${index}">${cells.map((cell, i) => `<c r="${col(i)}${index}" t="inlineStr"><is><t>${escapeXml(scalar(cell))}</t></is></c>`).join('')}</row>`;
		const sheet = `<?xml version="1.0" encoding="UTF-8"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>${row(headers, 1)}${records.map((r, i) => row(headers.map(h => r[h]), i + 2)).join('')}</sheetData></worksheet>`;
		return zip({
			'[Content_Types].xml': '<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/></Types>',
			'_rels/.rels': '<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>',
			'xl/workbook.xml': '<?xml version="1.0" encoding="UTF-8"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Data" sheetId="1" r:id="rId1"/></sheets></workbook>',
			'xl/_rels/workbook.xml.rels': '<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/></Relationships>',
			'xl/worksheets/sheet1.xml': sheet
		});
	}

	function colIndex(cellRef) {
		if (!cellRef) return -1;
		const letters = cellRef.replace(/[^A-Za-z]/g, '').toUpperCase();
		if (!letters) return -1;
		let col = 0;
		for (let i = 0; i < letters.length; i++) col = col * 26 + (letters.charCodeAt(i) - 64);
		return col - 1;
	}

	async function unzipEntries(buffer) {
		const view = new DataView(buffer), bytes = new Uint8Array(buffer), decoder = new TextDecoder(), entries = {};
		for (let p = 0; p + 30 < bytes.length; ) {
			if (view.getUint32(p, true) !== 0x04034b50) { p++; continue; }
			const method = view.getUint16(p + 8, true), compressed = view.getUint32(p + 18, true), nameLength = view.getUint16(p + 26, true), extra = view.getUint16(p + 28, true), start = p + 30 + nameLength + extra, name = decoder.decode(bytes.slice(p + 30, p + 30 + nameLength));
			const raw = bytes.slice(start, start + compressed); let data = raw;
			if (method === 8) data = new Uint8Array(await new Response(new Blob([raw]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).arrayBuffer());
			if (method !== 0 && method !== 8) throw new Error('This Excel compression format is not supported.');
			entries[name] = decoder.decode(data); p = start + compressed;
		}
		return entries;
	}
	async function recordsFromExcel(file) {
		const entries = await unzipEntries(await file.arrayBuffer());
		const sheet = entries['xl/worksheets/sheet1.xml'] || Object.entries(entries).find(([name]) => /^xl\/worksheets\/.*\.xml$/.test(name))?.[1];
		if (!sheet) throw new Error('No worksheet was found in this Excel file.');
		const stringsDoc = entries['xl/sharedStrings.xml'] ? new DOMParser().parseFromString(entries['xl/sharedStrings.xml'], 'application/xml') : null;
		const strings = stringsDoc ? Array.from(stringsDoc.querySelectorAll('si')).map(x => x.textContent || '') : [];
		const doc = new DOMParser().parseFromString(sheet, 'application/xml');
		const rowElements = Array.from(doc.querySelectorAll('sheetData > row'));
		const rows = rowElements.map(row => {
			const rowData = [];
			const cells = Array.from(row.querySelectorAll('c'));
			for (const c of cells) {
				const r = c.getAttribute('r');
				const col = colIndex(r);
				const idx = col >= 0 ? col : rowData.length;
				let val = '';
				const t = c.getAttribute('t');
				if (t === 's') {
					const v = c.querySelector('v')?.textContent;
					val = v !== undefined && strings[Number(v)] !== undefined ? strings[Number(v)] : '';
				} else if (t === 'inlineStr') {
					val = c.querySelector('is > t')?.textContent ?? c.querySelector('t')?.textContent ?? '';
				} else {
					val = c.querySelector('v')?.textContent ?? c.querySelector('t')?.textContent ?? '';
				}
				rowData[idx] = val;
			}
			for (let i = 0; i < rowData.length; i++) {
				if (rowData[i] === undefined) rowData[i] = '';
			}
			return rowData;
		});
		if (!rows.length) return [];
		const [headers, ...values] = rows;
		return values.map(row => Object.fromEntries(headers.map((h, i) => [h || `column_${i + 1}`, row[i] ?? ''])));
	}

	function parseInput(text, format) {
		if (format === 'json') return toRecords(JSON.parse(text));
		if (format === 'csv') return recordsFromCsv(text);
		if (format === 'xml') return recordsFromXml(text);
		return recordsFromPastedSheet(text);
	}
	function render(records, format) {
		if (format === 'json') return { text: JSON.stringify(records, null, 2), blob: null };
		if (format === 'csv') return { text: recordsToCsv(records), blob: null };
		if (format === 'xml') return { text: recordsToXml(records), blob: null };
		return { text: recordsToTsv(records), blob: excelBlob(records) };
	}
	async function convert() {
		try {
			if (!input.trim()) throw new Error('Paste data or upload a file first.');
			const records = parseInput(input, sourceFormat);
			currentRecords = records;
			const result = render(records, targetFormat);
			output = result.text; outputBlob = result.blob;
			toast(`Converted to ${label(targetFormat)}.`, 'success');
		} catch (e) { toast(e.message || 'Conversion failed.', 'error'); }
	}
	async function loadFile(file) {
		if (!file) return;
		const ext = file.name.split('.').pop().toLowerCase();
		try {
			if (ext === 'xlsx') {
				sourceFormat = 'excel';
				const records = await recordsFromExcel(file);
				currentRecords = records;
				input = recordsToTsv(records);
				const result = render(records, targetFormat);
				output = result.text; outputBlob = result.blob;
			} else {
				const map = { json: 'json', csv: 'csv', xml: 'xml' };
				if (!map[ext]) throw new Error('Choose a JSON, XML, CSV, or XLSX file.');
				sourceFormat = map[ext];
				input = await file.text();
				output = ''; outputBlob = null;
				currentRecords = [];
			}
			uploadedName = file.name;
		} catch (e) { toast(e.message || 'Could not read that file.', 'error'); }
	}
	async function copyOutput() {
		if (!output) return;
		try {
			if (targetFormat === 'excel' && typeof ClipboardItem !== 'undefined' && navigator.clipboard?.write) {
				const recordsToUse = currentRecords && currentRecords.length ? currentRecords : parseInput(output, 'excel');
				const htmlTable = recordsToHtmlTable(recordsToUse);
				const textBlob = new Blob([output], { type: 'text/plain' });
				const htmlBlob = new Blob([htmlTable], { type: 'text/html' });
				await navigator.clipboard.write([
					new ClipboardItem({
						'text/plain': textBlob,
						'text/html': htmlBlob
					})
				]);
				toast('Output copied.', 'success');
				return;
			}
		} catch (e) {
			// Fallback to writeText below
		}
		navigator.clipboard.writeText(output).then(() => toast('Output copied.', 'success')).catch(() => toast('Copy failed.', 'error'));
	}
	function download() {
		if (!output) return;
		const blob = outputBlob || new Blob([output], { type: targetFormat === 'json' ? 'application/json' : targetFormat === 'xml' ? 'application/xml' : targetFormat === 'excel' ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' : 'text/csv;charset=utf-8' });
		const url = URL.createObjectURL(blob), link = document.createElement('a');
		link.href = url;
		link.download = `converted-data.${extension(targetFormat)}`;
		link.click();
		URL.revokeObjectURL(url);
	}
	function useSample() {
		input = samples[sourceFormat] || samples.json;
		uploadedName = '';
		output = '';
		outputBlob = null;
		currentRecords = [];
	}
</script>

<svelte:head>
	<title>SAM Data Formatter — Convert JSON, XML, CSV & Excel</title>
</svelte:head>

<section class="hero">
	<div class="hero-copy">
		<span class="eyebrow">Browser-based conversion</span>
		<h1>Reshape your data,<br />instantly.</h1>
		<p>Paste, drop, or upload — SAM Data Formatter converts between JSON, XML, CSV and Excel entirely on your device. Nothing is sent to a server.</p>
	</div>
	<div class="hero-pipeline" aria-hidden="true">
		<div class="pipe-track">
			<span class="pipe-dot"></span>
		</div>
		<div class="pipe-chips">
			<span class="chip">JSON</span>
			<span class="chip">XML</span>
			<span class="chip">CSV</span>
			<span class="chip">XLSX</span>
		</div>
	</div>
</section>

<div class="format-bar card">
	<div class="field">
		<Select
			label="Convert From"
			bind:value={sourceFormat}
			options={formats.map(f => ({ value: f, label: label(f) })) || []}
			placeholder="Select format"
		/>
	</div>
	<div class="arrow">→</div>
	<div class="field">
		<Select
			label="Convert To"
			bind:value={targetFormat}
			placeholder="Select format"
			options={formats.map(f => ({ value: f, label: label(f) })) || []}
		/>
	</div>
	<button class="btn btn-primary convert" on:click={convert}>Convert data</button>
</div>

<div class="panes">
	<section class="pane card">
		<div class="pane-head">
			<div>
				<div class="pane-title">Input</div>
				<div class="pane-help">Paste {sourceFormat === 'excel' ? 'a tab-separated Excel selection' : label(sourceFormat) + ' data'} or upload a file.</div>
			</div>
			<div class="actions">
				<button class="text-btn" on:click={() => inputFile.click()}>Upload File</button>
				<button class="text-btn" on:click={useSample}>Use sample</button>
			</div>
		</div>
		<input bind:this={inputFile} type="file" accept=".json,.xml,.csv,.xlsx" hidden on:change={(e) => loadFile(e.target.files[0])}/>
		{#if uploadedName}
			<div class="uploaded-pill">
				<span>📄 {uploadedName}</span>
				<button type="button" class="remove-pill-btn" on:click={() => { uploadedName = ''; input = ''; currentRecords = []; output = ''; }} title="Clear file">✕</button>
			</div>
		{/if}
		<textarea
			class="data-area"
			class:drag-active={dropActive}
			bind:value={input}
			placeholder={sourceFormat === 'excel' ? 'Paste a copied Excel table here, or upload an .xlsx file.' : `Paste ${label(sourceFormat)} here…`}
			on:dragover|preventDefault={() => dropActive = true}
			on:dragleave={() => dropActive = false}
			on:drop|preventDefault={(e) => { dropActive = false; loadFile(e.dataTransfer.files[0]); }}
		></textarea>
	</section>
	<section class="pane card">
		<div class="pane-head">
			<div>
				<div class="pane-title">Output</div>
				<div class="pane-help">{output ? `Ready as ${label(targetFormat)}.` : 'Your converted data appears here.'}</div>
			</div>
			<div class="actions">
				<button class="text-btn" on:click={copyOutput} disabled={!output}>Copy</button>
				<button class="text-btn" on:click={download} disabled={!output}>Download</button>
			</div>
		</div>
		<pre class="data-area output">{output || 'Converted data will appear here.'}</pre>
	</section>
</div>

<style>
	.hero {
		display: grid;
		grid-template-columns: 1.2fr 1fr;
		gap: 32px;
		align-items: center;
		margin-bottom: 34px;
		padding-bottom: 30px;
		border-bottom: 1px solid var(--border);
	}
	.eyebrow {
		display: inline-block;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--accent-strong);
		margin-bottom: 14px;
	}
	.hero-copy h1 {
		font-family: var(--font-display);
		font-size: clamp(30px, 4.2vw, 44px);
		line-height: 1.08;
		letter-spacing: -0.01em;
		margin: 0 0 14px;
		color: var(--text);
	}
	.hero-copy p {
		color: var(--text-muted);
		font-size: 15px;
		line-height: 1.6;
		max-width: 46ch;
		margin: 0;
	}
	.hero-pipeline {
		position: relative;
		background: var(--bg-elevated);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		padding: 26px 20px 20px;
	}
	.pipe-track {
		position: relative;
		height: 2px;
		background: linear-gradient(90deg, transparent, var(--border-strong) 10%, var(--border-strong) 90%, transparent);
		margin: 0 4px 18px;
	}
	.pipe-dot {
		position: absolute;
		top: 50%;
		left: 0;
		width: 8px;
		height: 8px;
		margin-top: -4px;
		border-radius: 50%;
		background: var(--accent-strong);
		box-shadow: 0 0 12px 2px var(--accent);
		animation: travel 4.5s ease-in-out infinite;
	}
	@keyframes travel {
		0% { left: 0%; opacity: 0; }
		8% { opacity: 1; }
		48% { left: calc(100% - 8px); opacity: 1; }
		52% { opacity: 0; }
		100% { left: 0%; opacity: 0; }
	}
	.pipe-chips {
		display: flex;
		justify-content: space-between;
		gap: 8px;
	}
	.chip {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.03em;
		color: var(--text-muted);
		background: var(--bg-inset);
		border: 1px solid var(--border);
		border-radius: 999px;
		padding: 6px 10px;
	}
	@media (prefers-reduced-motion: reduce) {
		.pipe-dot { animation: none; left: 6px; opacity: 1; }
	}

	.format-bar { display:flex; align-items:end; gap:16px; margin-bottom:20px; }
	.format-bar .field { flex:1; } .arrow { color:var(--accent); font-size:26px; padding-bottom:4px; } .convert { white-space:nowrap; }
	.panes { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom: 8px; } .pane { min-width:0; padding:20px; } .pane-head { display:flex; justify-content:space-between; gap:12px; margin-bottom:14px; } .pane-title { color:var(--text); font-weight:700; font-size:16px; font-family: var(--font-display); } .pane-help { font-size:12px; color:var(--text-muted); }
	.actions { display:flex; gap:8px; align-items:center; }
	.text-btn { background:transparent; border:0; padding:3px 8px; color:var(--accent); cursor:pointer; font-weight:600; font-size:12px; border-radius:4px; transition:color 0.15s, background 0.15s; }
	.text-btn:hover:not(:disabled) { color:var(--text); background:var(--accent-soft); }
	.text-btn:disabled { opacity:.4; cursor:not-allowed; }
	.uploaded-pill { display:inline-flex; align-items:center; gap:6px; background:var(--bg-inset); border:1px solid var(--border-strong); border-radius:6px; padding:4px 8px; font-size:11.5px; color:var(--accent-strong); margin-bottom:10px; }
	.uploaded-pill span { max-width:260px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
	.remove-pill-btn { background:transparent; border:none; color:var(--text-muted); cursor:pointer; padding:0 2px; font-size:11px; }
	.remove-pill-btn:hover { color:var(--accent); }
	.data-area { width:100%; min-height:420px; resize:vertical; border:1px solid var(--border); border-radius:8px; background:var(--bg-inset); color:var(--text); padding:14px; outline:none; font:13px/1.55 var(--font-mono); transition:border-color 0.15s; }
	textarea.data-area:focus, textarea.data-area.drag-active { border-color:var(--accent); }
	.output { white-space:pre-wrap; overflow:auto; margin:0; }
	@media (max-width:800px) {
		.hero { grid-template-columns: 1fr; }
		.format-bar { align-items:stretch; flex-direction:column; } .arrow { display:none; } .panes { grid-template-columns:1fr; } .data-area { min-height:280px; }
	}
</style>
