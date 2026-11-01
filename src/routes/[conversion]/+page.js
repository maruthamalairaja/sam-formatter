import { error } from '@sveltejs/kit';
import { conversions, getConversionBySlug } from '$lib/conversions.js';

export const prerender = true;

export function entries() {
	return conversions.map(c => ({ conversion: c.slug }));
}

export function load({ params }) {
	const conversion = getConversionBySlug(params.conversion);
	if (!conversion) {
		throw error(404, `Conversion "${params.conversion}" not found.`);
	}
	return {
		conversion
	};
}

