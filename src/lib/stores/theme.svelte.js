import { browser } from '$app/environment';
import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';

class ThemeStore {
	theme = $state('light');

	constructor() {
		if (browser) {
			this.initialize();
		}
	}

	async initialize() {
		// Check for saved theme preference or default to system preference
		const { value: savedTheme } = await Preferences.get({ key: 'theme' });
		const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		
		this.theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
		this.applyTheme();

		// Listen for system theme changes
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', async (e) => {
			const { value: saved } = await Preferences.get({ key: 'theme' });
			if (!saved) {
				this.theme = e.matches ? 'dark' : 'light';
				this.applyTheme();
			}
		});
	}

	applyTheme() {
		if (this.theme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}

	async toggle() {
		this.theme = this.theme === 'light' ? 'dark' : 'light';
		await Preferences.set({ key: 'theme', value: this.theme });
		this.applyTheme();
	}

	async setTheme(newTheme) {
		this.theme = newTheme;
		await Preferences.set({ key: 'theme', value: this.theme });
		this.applyTheme();
	}

	get isDark() {
		return this.theme === 'dark';
	}
}

export const themeStore = new ThemeStore();