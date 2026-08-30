<script>
	import { onMount } from 'svelte';
	import { base } from '$app/paths';

	let heading = 'Explore our other projects';
	let projects = [];
	let loaded = false;

	onMount(async () => {
		try {
			const res = await fetch(`${base}/config/projects.json`);
			if (res.ok) {
				const data = await res.json();
				heading = data.heading || heading;
				projects = data.projects || [];
			}
		} catch (e) {
			// Config is optional — footer just shows the brand row if it's missing.
		}
		loaded = true;
	});
</script>

<footer class="site-footer">
	<div class="footer-inner">
		{#if loaded && projects.length}
			<div class="explore">
				<div class="explore-heading">{heading}</div>
				<div class="project-grid">
					{#each projects as p}
						<a class="project-card" href={p.url} target="_blank" rel="noopener noreferrer">
							<span class="project-name">{p.name}</span>
							{#if p.description}<span class="project-desc">{p.description}</span>{/if}
							<span class="project-go" aria-hidden="true">↗</span>
						</a>
					{/each}
				</div>
			</div>
		{/if}
		<div class="footer-base">
			<span class="brand">SAM Data Formatter</span>
			<span class="tagline">Runs entirely in your browser — nothing is uploaded.</span>
		</div>
	</div>
</footer>

<style>
	.site-footer {
		border-top: 1px solid var(--border);
		margin-top: 56px;
		padding: 40px 0 28px;
	}
	.footer-inner {
		max-width: 1080px;
		margin: 0 auto;
		padding: 0 24px;
	}
	.explore {
		margin-bottom: 30px;
	}
	.explore-heading {
		font-family: var(--font-display);
		font-size: 15px;
		font-weight: 600;
		letter-spacing: 0.02em;
		color: var(--text);
		margin-bottom: 16px;
	}
	.project-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 12px;
	}
	.project-card {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 4px;
		background: var(--bg-elevated);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		padding: 16px 40px 16px 16px;
		text-decoration: none;
		transition: border-color 0.15s, transform 0.15s;
	}
	.project-card:hover {
		border-color: var(--accent);
		transform: translateY(-2px);
	}
	.project-name {
		font-family: var(--font-display);
		color: var(--text);
		font-weight: 600;
		font-size: 13.5px;
	}
	.project-desc {
		color: var(--text-muted);
		font-size: 12px;
		line-height: 1.4;
	}
	.project-go {
		position: absolute;
		top: 14px;
		right: 14px;
		color: var(--text-faint);
		font-size: 13px;
	}
	.project-card:hover .project-go {
		color: var(--accent);
	}
	.footer-base {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 10px;
		padding-top: 20px;
		border-top: 1px solid var(--border);
	}
	.brand {
		font-family: var(--font-display);
		font-weight: 700;
		color: var(--text);
		font-size: 13px;
	}
	.tagline {
		color: var(--text-faint);
		font-size: 12px;
	}
</style>
