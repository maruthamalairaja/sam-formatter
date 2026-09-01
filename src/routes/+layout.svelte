<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import Footer from '$lib/components/Footer.svelte';
	import ToastHost from '$lib/components/ToastHost.svelte';

	const cssVarMap = {
		bg: '--bg',
		bgElevated: '--bg-elevated',
		bgInset: '--bg-inset',
		border: '--border',
		borderStrong: '--border-strong',
		accent: '--accent',
		accentStrong: '--accent-strong',
		accentSoft: '--accent-soft',
		wine: '--wine',
		text: '--text',
		textMuted: '--text-muted',
		textFaint: '--text-faint',
		success: '--success',
		warning: '--warning',
		danger: '--danger'
	};

	onMount(async () => {
		try {
			const res = await fetch(`${base}/config/theme.json`);
			if (!res.ok) return;
			const theme = await res.json();
			const root = document.documentElement.style;
			for (const [key, value] of Object.entries(theme.colors || {})) {
				if (cssVarMap[key]) root.setProperty(cssVarMap[key], value);
			}
			if (theme.fonts?.display) root.setProperty('--font-display', theme.fonts.display);
			if (theme.fonts?.body) root.setProperty('--font-body', theme.fonts.body);
			if (theme.fonts?.mono) root.setProperty('--font-mono', theme.fonts.mono);
			if (theme.radius?.sm) root.setProperty('--radius-sm', theme.radius.sm);
			if (theme.radius?.md) root.setProperty('--radius-md', theme.radius.md);
			if (theme.radius?.lg) root.setProperty('--radius-lg', theme.radius.lg);
		} catch (e) {
			// The built-in defaults in app.css already match the default theme,
			// so a missing/broken config file just means no runtime override.
		}
	});
</script>

<div class="shell">
	<header class="site-header">
		<div class="header-inner">
			<a class="brand-mark" href="{base}/">
				<span class="glyph" aria-hidden="true">
					<svg width="26" height="26" viewBox="0 0 26 26" fill="none">
						<rect width="26" height="26" rx="7" fill="var(--accent-soft)" />
						<path d="M7 9c0-1.6 1.6-2.4 3.2-2.4s2.4 0.8 2.4 2.4-1.6 2.4-2.4 3.2 2.4 1.6 2.4 3.2-0.8 2.4-2.4 2.4S7 17 7 15.4" stroke="var(--accent)" stroke-width="1.7" fill="none" stroke-linecap="round" />
						<path d="M19 9c0-1.6-1.6-2.4-3.2-2.4S13.4 7.4 13.4 9s1.6 2.4 2.4 3.2-2.4 1.6-2.4 3.2 0.8 2.4 2.4 2.4S19 17 19 15.4" stroke="var(--accent-strong)" stroke-width="1.7" fill="none" stroke-linecap="round" opacity="0.65" />
					</svg>
				</span>
				<span class="brand-text">
					<span class="brand-title">SAM Data Formatter</span>
					<span class="brand-sub">JSON · XML · CSV · Excel</span>
				</span>
			</a>
		</div>
	</header>

	<main class="site-main">
		<slot />
	</main>

	<Footer />
</div>

<ToastHost />

<style>
	.shell {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}
	.site-header {
		border-bottom: 1px solid var(--border);
		position: sticky;
		top: 0;
		z-index: 50;
		background: rgba(23, 8, 18, 0.82);
		backdrop-filter: blur(10px);
	}
	.header-inner {
		width: 100%;
		max-width: 1600px;
		margin: 0 auto;
		padding: 14px clamp(16px, 3vw, 40px);
		box-sizing: border-box;
	}
	.brand-mark {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		text-decoration: none;
	}
	.glyph {
		display: flex;
		flex-shrink: 0;
	}
	.brand-text {
		display: flex;
		flex-direction: column;
		line-height: 1.2;
	}
	.brand-title {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 15.5px;
		color: var(--text);
		letter-spacing: -0.01em;
	}
	.brand-sub {
		font-family: var(--font-mono);
		font-size: 10.5px;
		letter-spacing: 0.06em;
		color: var(--text-faint);
	}
	.site-main {
		flex: 1;
		max-width: 1600px;
		width: 100%;
		margin: 0 auto;
		padding: 36px clamp(16px, 3vw, 40px) 0;
		box-sizing: border-box;
	}
</style>