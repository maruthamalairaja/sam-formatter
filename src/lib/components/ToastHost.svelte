<script>
	import { toasts, dismiss } from '$lib/stores/toast.js';
</script>

<div class="toast-host" role="status" aria-live="polite">
	{#each $toasts as t (t.id)}
		<div class="toast toast-{t.type}" on:click={() => dismiss(t.id)}>
			<span class="dot"></span>
			<span class="msg">{t.message}</span>
		</div>
	{/each}
</div>

<style>
	.toast-host {
		position: fixed;
		bottom: 20px;
		right: 20px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		z-index: 200;
		max-width: min(360px, calc(100vw - 32px));
	}
	.toast {
		display: flex;
		align-items: center;
		gap: 10px;
		background: var(--bg-elevated);
		border: 1px solid var(--border-strong);
		color: var(--text);
		padding: 12px 14px;
		border-radius: var(--radius-md);
		font-size: 13px;
		font-family: var(--font-body);
		box-shadow: 0 12px 28px rgba(0, 0, 0, 0.45);
		cursor: pointer;
		animation: rise 0.2s ease-out;
	}
	.dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		flex-shrink: 0;
		background: var(--accent);
	}
	.toast-success .dot {
		background: var(--success);
	}
	.toast-error .dot {
		background: var(--danger);
	}
	.toast-info .dot {
		background: var(--accent);
	}
	@keyframes rise {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.toast {
			animation: none;
		}
	}
</style>
