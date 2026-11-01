<script>
	import { base } from '$app/paths';
	import Converter from '$lib/components/Converter.svelte';
	import { conversions } from '$lib/conversions.js';

	const canonicalUrl = 'https://formatter.amaraja.in/';

	const webAppSchema = {
		'@context': 'https://schema.org',
		'@type': 'WebApplication',
		'name': 'SAM Data Formatter',
		'url': canonicalUrl,
		'description': 'Free online browser-based data formatter and converter between JSON, XML, CSV, and Excel (XLSX). 100% private, client-side execution with zero server uploads.',
		'applicationCategory': 'DeveloperApplication',
		'operatingSystem': 'Any',
		'offers': {
			'@type': 'Offer',
			'price': '0',
			'priceCurrency': 'USD'
		},
		'featureList': [
			'Convert JSON to CSV, XML, Excel',
			'Convert CSV to JSON, XML, Excel',
			'Convert XML to JSON, CSV, Excel',
			'Convert Excel (XLSX) to JSON, CSV, XML',
			'Client-side execution with zero data uploaded',
			'Clipboard copy and file download'
		]
	};

	const faqSchema = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		'mainEntity': [
			{
				'@type': 'Question',
				'name': 'Is my data safe when using SAM Data Formatter?',
				'acceptedAnswer': {
					'@type': 'Answer',
					'text': 'Yes, completely. SAM Data Formatter operates 100% inside your web browser. Nothing is ever sent to or stored on remote servers, making it completely safe for sensitive and private data.'
				}
			},
			{
				'@type': 'Question',
				'name': 'Which data formats are supported?',
				'acceptedAnswer': {
					'@type': 'Answer',
					'text': 'We support bidirectional conversions between JSON, CSV, XML, and Excel (.xlsx) workbooks.'
				}
			},
			{
				'@type': 'Question',
				'name': 'Do I need to install software or register an account?',
				'acceptedAnswer': {
					'@type': 'Answer',
					'text': 'No. SAM Data Formatter is 100% free with no account creation, subscriptions, or installations required. It works directly in any modern desktop or mobile browser.'
				}
			},
			{
				'@type': 'Question',
				'name': 'Does this tool support nested JSON and complex XML hierarchies?',
				'acceptedAnswer': {
					'@type': 'Answer',
					'text': 'Yes! Our custom parsers intelligently inspect object hierarchies, infer data types (numbers, booleans, arrays), and flatten or reconstruct structures cleanly.'
				}
			}
		]
	};
</script>

<svelte:head>
	<title>SAM Data Formatter — Free Online JSON, XML, CSV & Excel Converter</title>
	<meta name="description" content="Free browser-based data converter. Instantly transform between JSON, CSV, XML, and Excel (XLSX). 100% private, client-side conversion with zero server uploads." />
	<meta name="keywords" content="data formatter, json to csv, csv to json, json to excel, excel to json, xml to json, json to xml, csv to xml, xml to csv, data converter online free" />
	<link rel="canonical" href={canonicalUrl} />

	<!-- OpenGraph Metadata -->
	<meta property="og:title" content="SAM Data Formatter — Convert JSON, XML, CSV & Excel" />
	<meta property="og:description" content="Instant browser-based data converter for JSON, CSV, XML, and Excel. 100% private — your data never leaves your device." />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="SAM Data Formatter" />

	<!-- Twitter Cards -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="SAM Data Formatter — Free Online Data Converter" />
	<meta name="twitter:description" content="Convert JSON, XML, CSV, and Excel spreadsheets instantly in your browser with zero uploads." />

	<!-- Structured Data -->
	{@html `<script type="application/ld+json">${JSON.stringify(webAppSchema)}</script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(faqSchema)}</script>`}
</svelte:head>

<section class="hero">
	<div class="hero-copy">
		<span class="eyebrow">Browser-based conversion</span>
		<h1>Reshape your data,<br />instantly.</h1>
		<p>Paste, drop, or upload — SAM Data Formatter converts between JSON, XML, CSV and Excel entirely on your device with zero server uploads.</p>
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

<div class="tool-wrapper">
	<Converter initialSourceFormat="json" initialTargetFormat="csv" />
</div>

<section class="converters-section">
	<div class="section-header">
		<h2 class="section-title">All Data Converters</h2>
		<p class="section-sub">Select a dedicated converter for your specific format pair with tailored tools and format tips.</p>
	</div>
	<div class="converters-grid">
		{#each conversions as conv}
			<a class="conv-card card" href="{base}/{conv.slug}/">
				<div class="conv-top">
					<span class="conv-badge">{conv.fromName} → {conv.toName}</span>
					<span class="conv-arrow" aria-hidden="true">↗</span>
				</div>
				<h3 class="conv-heading">{conv.h1}</h3>
				<p class="conv-desc">{conv.summary}</p>
			</a>
		{/each}
	</div>
</section>

<section class="highlights-section">
	<div class="section-header">
		<h2 class="section-title">Why Choose SAM Data Formatter?</h2>
		<p class="section-sub">Engineered for speed, privacy, and seamless developer workflows.</p>
	</div>
	<div class="highlights-grid">
		<div class="highlight-card card">
			<div class="hl-icon" aria-hidden="true">🔒</div>
			<h3>100% Client-Side Privacy</h3>
			<p>Your datasets and files never leave your device. All parsing, transformation, and file generation execute entirely in your web browser.</p>
		</div>
		<div class="highlight-card card">
			<div class="hl-icon" aria-hidden="true">⚡</div>
			<h3>Instant & Unlimited</h3>
			<p>No waiting in server conversion queues, no file upload timeouts, and no daily limits. Transform multi-megabyte payloads in milliseconds.</p>
		</div>
		<div class="highlight-card card">
			<div class="hl-icon" aria-hidden="true">📊</div>
			<h3>Real Excel (.xlsx) Support</h3>
			<p>Generates real, zipped OpenXML (.xlsx) files natively that open cleanly in Microsoft Excel, Google Sheets, and LibreOffice.</p>
		</div>
		<div class="highlight-card card">
			<div class="hl-icon" aria-hidden="true">🧠</div>
			<h3>Smart Type Detection</h3>
			<p>Automatically distinguishes numbers, booleans, strings, and serialized structures to preserve original data types accurately.</p>
		</div>
	</div>
</section>

<section class="home-faq-section">
	<div class="section-header">
		<h2 class="section-title">Frequently Asked Questions</h2>
		<p class="section-sub">Common questions about data conversions and security.</p>
	</div>
	<div class="faq-grid">
		<div class="faq-box card">
			<h3>Is my data safe and confidential?</h3>
			<p>Yes, 100%. SAM Data Formatter is built with a client-side architecture. When you paste or upload files, your data is processed only in your browser's local memory. No file or text is ever sent across the network.</p>
		</div>
		<div class="faq-box card">
			<h3>Can I convert between Excel files and JSON/CSV?</h3>
			<p>Yes! You can upload .xlsx files or paste copied rows from Excel directly into the tool. You can also export tabular datasets directly as genuine Microsoft Excel (.xlsx) spreadsheets.</p>
		</div>
		<div class="faq-box card">
			<h3>Do I need an account or subscription?</h3>
			<p>No. SAM Data Formatter is completely free to use without registration, sign-ups, or subscriptions.</p>
		</div>
		<div class="faq-box card">
			<h3>How are nested JSON structures handled when converting to CSV?</h3>
			<p>Nested objects and arrays are intelligently inspected and flattened into formatted fields so your CSV output remains structured and readable.</p>
		</div>
	</div>
</section>

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

	.tool-wrapper {
		margin-bottom: 56px;
	}

	.section-header {
		margin-bottom: 24px;
	}
	.section-title {
		font-family: var(--font-display);
		font-size: 26px;
		font-weight: 700;
		color: var(--text);
		margin: 0 0 8px;
	}
	.section-sub {
		color: var(--text-muted);
		font-size: 14.5px;
		margin: 0;
	}

	.converters-section {
		margin-bottom: 56px;
	}
	.converters-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 16px;
	}
	.conv-card {
		display: flex;
		flex-direction: column;
		padding: 22px;
		text-decoration: none;
		transition: border-color 0.15s, transform 0.15s;
	}
	.conv-card:hover {
		border-color: var(--accent);
		transform: translateY(-2px);
	}
	.conv-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 12px;
	}
	.conv-badge {
		font-family: var(--font-mono);
		font-size: 11.5px;
		color: var(--accent-strong);
		background: var(--accent-soft);
		border: 1px solid var(--border-strong);
		padding: 3px 8px;
		border-radius: 6px;
	}
	.conv-arrow {
		color: var(--text-muted);
		font-size: 16px;
		transition: color 0.15s, transform 0.15s;
	}
	.conv-card:hover .conv-arrow {
		color: var(--accent);
		transform: translate(2px, -2px);
	}
	.conv-heading {
		font-family: var(--font-display);
		font-size: 17px;
		font-weight: 700;
		color: var(--text);
		margin: 0 0 8px;
	}
	.conv-desc {
		font-size: 13px;
		color: var(--text-muted);
		line-height: 1.5;
		margin: 0;
	}

	.highlights-section {
		margin-bottom: 56px;
	}
	.highlights-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 18px;
	}
	.highlight-card {
		padding: 24px;
	}
	.hl-icon {
		font-size: 26px;
		margin-bottom: 12px;
	}
	.highlight-card h3 {
		font-family: var(--font-display);
		font-size: 16px;
		font-weight: 600;
		color: var(--text);
		margin: 0 0 8px;
	}
	.highlight-card p {
		font-size: 13.5px;
		color: var(--text-muted);
		line-height: 1.55;
		margin: 0;
	}

	.home-faq-section {
		margin-bottom: 24px;
	}
	.faq-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 18px;
	}
	.faq-box {
		padding: 24px;
	}
	.faq-box h3 {
		font-family: var(--font-display);
		font-size: 16px;
		font-weight: 600;
		color: var(--text);
		margin: 0 0 8px;
	}
	.faq-box p {
		font-size: 13.5px;
		color: var(--text-muted);
		line-height: 1.6;
		margin: 0;
	}

	@media (max-width: 800px) {
		.hero {
			grid-template-columns: 1fr;
		}
	}
</style>
