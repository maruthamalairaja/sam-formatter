<script>
	import { base } from '$app/paths';
	import Converter from '$lib/components/Converter.svelte';
	import { conversions, getRelatedConversions } from '$lib/conversions.js';

	export let data;
	$: conversion = data.conversion;
	$: related = getRelatedConversions(conversion.slug, 8);

	$: canonicalUrl = `https://formatter.amaraja.in/${conversion.slug}/`;

	$: softwareAppSchema = {
		'@context': 'https://schema.org',
		'@type': 'WebApplication',
		'name': `${conversion.fromName} to ${conversion.toName} Converter — SAM Data Formatter`,
		'url': canonicalUrl,
		'description': conversion.description,
		'applicationCategory': 'DeveloperApplication',
		'operatingSystem': 'Any',
		'offers': {
			'@type': 'Offer',
			'price': '0',
			'priceCurrency': 'USD'
		},
		'browserRequirements': 'Requires JavaScript. Requires HTML5.'
	};

	$: breadcrumbSchema = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		'itemListElement': [
			{
				'@type': 'ListItem',
				'position': 1,
				'name': 'Home',
				'item': 'https://formatter.amaraja.in/'
			},
			{
				'@type': 'ListItem',
				'position': 2,
				'name': `${conversion.fromName} to ${conversion.toName} Converter`,
				'item': canonicalUrl
			}
		]
	};

	$: faqSchema = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		'mainEntity': conversion.faqs.map(faq => ({
			'@type': 'Question',
			'name': faq.q,
			'acceptedAnswer': {
				'@type': 'Answer',
				'text': faq.a
			}
		}))
	};

	$: howToSchema = {
		'@context': 'https://schema.org',
		'@type': 'HowTo',
		'name': `How to convert ${conversion.fromName} to ${conversion.toName}`,
		'description': conversion.summary,
		'step': conversion.steps.map(s => ({
			'@type': 'HowToStep',
			'position': s.step,
			'name': s.title,
			'text': s.desc
		}))
	};
</script>

<svelte:head>
	<title>{conversion.title}</title>
	<meta name="description" content={conversion.description} />
	<meta name="keywords" content={conversion.keywords.join(', ')} />
	<link rel="canonical" href={canonicalUrl} />

	<!-- OpenGraph Metadata -->
	<meta property="og:title" content={conversion.title} />
	<meta property="og:description" content={conversion.description} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="SAM Data Formatter" />

	<!-- Twitter Cards -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={conversion.title} />
	<meta name="twitter:description" content={conversion.description} />

	<!-- Structured Data -->
	{@html `<script type="application/ld+json">${JSON.stringify(softwareAppSchema)}</script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(faqSchema)}</script>`}
	{@html `<script type="application/ld+json">${JSON.stringify(howToSchema)}</script>`}
</svelte:head>

<div class="conversion-page">
	<nav class="breadcrumbs" aria-label="Breadcrumb">
		<a href="{base}/">Home</a>
		<span class="sep" aria-hidden="true">/</span>
		<span class="current" aria-current="page">{conversion.fromName} to {conversion.toName}</span>
	</nav>

	<header class="conv-hero">
		<div class="badge-row">
			<span class="pill-badge">Free In-Browser Converter</span>
			<span class="pill-pill">Zero Server Uploads</span>
		</div>
		<h1>{conversion.h1}</h1>
		<p class="hero-desc">{conversion.summary}</p>
		<div class="trust-pills">
			<span class="trust-item"><span class="check">✓</span> 100% Client-Side</span>
			<span class="trust-item"><span class="check">✓</span> Instant Processing</span>
			<span class="trust-item"><span class="check">✓</span> Private & Secure</span>
			<span class="trust-item"><span class="check">✓</span> No Registration</span>
		</div>
	</header>

	<section class="tool-section">
		<Converter
			initialSourceFormat={conversion.from}
			initialTargetFormat={conversion.to}
			prefillSample={true}
		/>
	</section>

	<section class="guide-section">
		<h2 class="section-title">How to Convert {conversion.fromName} to {conversion.toName}</h2>
		<p class="section-sub">Follow three simple steps to convert your data locally with zero configuration.</p>
		<div class="steps-grid">
			{#each conversion.steps as s}
				<div class="step-card card">
					<div class="step-num">{s.step}</div>
					<h3 class="step-title">{s.title}</h3>
					<p class="step-desc">{s.desc}</p>
				</div>
			{/each}
		</div>
	</section>

	<section class="features-section">
		<h2 class="section-title">Why Use SAM Data Formatter for {conversion.fromName} to {conversion.toName}?</h2>
		<div class="feature-grid">
			{#each conversion.whyUse as feature}
				<div class="feature-card card">
					<div class="feature-icon" aria-hidden="true">⚡</div>
					<h3 class="feature-title">{feature.title}</h3>
					<p class="feature-desc">{feature.desc}</p>
				</div>
			{/each}
		</div>
	</section>

	<section class="faq-section">
		<h2 class="section-title">Frequently Asked Questions</h2>
		<p class="section-sub">Everything you need to know about converting {conversion.fromName} to {conversion.toName}.</p>
		<div class="faq-list">
			{#each conversion.faqs as faq}
				<div class="faq-item card">
					<h3 class="faq-question">{faq.q}</h3>
					<p class="faq-answer">{faq.a}</p>
				</div>
			{/each}
		</div>
	</section>

	<section class="related-section">
		<h2 class="section-title">Other Data Conversion Tools</h2>
		<p class="section-sub">Explore more free, browser-based data converters.</p>
		<div class="related-grid">
			{#each related as item}
				<a class="related-card card" href="{base}/{item.slug}/">
					<span class="related-name">{item.fromName} to {item.toName}</span>
					<span class="related-desc">{item.summary}</span>
					<span class="related-link">Convert now →</span>
				</a>
			{/each}
		</div>
	</section>
</div>

<style>
	.conversion-page {
		display: flex;
		flex-direction: column;
		gap: 36px;
	}

	.breadcrumbs {
		display: flex;
		align-items: center;
		gap: 8px;
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--text-muted);
	}
	.breadcrumbs a {
		color: var(--accent);
		text-decoration: none;
		transition: color 0.15s;
	}
	.breadcrumbs a:hover {
		color: var(--text);
		text-decoration: underline;
	}
	.breadcrumbs .sep {
		color: var(--text-faint);
	}
	.breadcrumbs .current {
		color: var(--text);
	}

	.conv-hero {
		padding-bottom: 24px;
		border-bottom: 1px solid var(--border);
	}
	.badge-row {
		display: flex;
		gap: 10px;
		margin-bottom: 14px;
		flex-wrap: wrap;
	}
	.pill-badge {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--accent-strong);
		background: var(--accent-soft);
		border: 1px solid var(--border-strong);
		padding: 4px 10px;
		border-radius: 999px;
	}
	.pill-pill {
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--success);
		background: rgba(63, 206, 160, 0.1);
		border: 1px solid rgba(63, 206, 160, 0.3);
		padding: 4px 10px;
		border-radius: 999px;
	}
	.conv-hero h1 {
		font-family: var(--font-display);
		font-size: clamp(30px, 4vw, 44px);
		line-height: 1.1;
		color: var(--text);
		margin: 0 0 14px;
	}
	.hero-desc {
		color: var(--text-muted);
		font-size: 16px;
		line-height: 1.6;
		max-width: 60ch;
		margin: 0 0 18px;
	}
	.trust-pills {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
		font-size: 13px;
		color: var(--text-muted);
	}
	.trust-item {
		display: inline-flex;
		align-items: center;
		gap: 6px;
	}
	.trust-item .check {
		color: var(--accent-strong);
		font-weight: bold;
	}

	.section-title {
		font-family: var(--font-display);
		font-size: 24px;
		font-weight: 700;
		color: var(--text);
		margin: 0 0 8px;
	}
	.section-sub {
		color: var(--text-muted);
		font-size: 14px;
		margin: 0 0 24px;
	}

	.steps-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		gap: 18px;
	}
	.step-card {
		padding: 24px;
		position: relative;
	}
	.step-num {
		font-family: var(--font-mono);
		font-size: 18px;
		font-weight: bold;
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background: var(--accent-soft);
		border: 1px solid var(--accent);
		color: var(--accent-strong);
		margin-bottom: 16px;
	}
	.step-title {
		font-family: var(--font-display);
		font-size: 16px;
		font-weight: 600;
		color: var(--text);
		margin: 0 0 8px;
	}
	.step-desc {
		font-size: 13.5px;
		color: var(--text-muted);
		line-height: 1.5;
		margin: 0;
	}

	.feature-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 18px;
	}
	.feature-card {
		padding: 24px;
	}
	.feature-icon {
		font-size: 24px;
		margin-bottom: 12px;
	}
	.feature-title {
		font-family: var(--font-display);
		font-size: 16px;
		font-weight: 600;
		color: var(--text);
		margin: 0 0 8px;
	}
	.feature-desc {
		font-size: 13.5px;
		color: var(--text-muted);
		line-height: 1.5;
		margin: 0;
	}

	.faq-list {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}
	.faq-item {
		padding: 20px 24px;
	}
	.faq-question {
		font-family: var(--font-display);
		font-size: 16px;
		font-weight: 600;
		color: var(--text);
		margin: 0 0 8px;
	}
	.faq-answer {
		font-size: 14px;
		color: var(--text-muted);
		line-height: 1.6;
		margin: 0;
	}

	.related-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 16px;
	}
	.related-card {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 20px;
		text-decoration: none;
		transition: border-color 0.15s, transform 0.15s;
	}
	.related-card:hover {
		border-color: var(--accent);
		transform: translateY(-2px);
	}
	.related-name {
		font-family: var(--font-display);
		font-size: 15px;
		font-weight: 700;
		color: var(--text);
	}
	.related-desc {
		font-size: 12.5px;
		color: var(--text-muted);
		line-height: 1.4;
		flex: 1;
	}
	.related-link {
		font-size: 12px;
		font-weight: 600;
		color: var(--accent);
		margin-top: 6px;
	}
</style>

