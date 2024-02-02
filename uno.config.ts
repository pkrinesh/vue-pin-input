// uno.config.ts
import {
	defineConfig,
	presetIcons,
	presetAttributify,
	presetUno,
	transformerVariantGroup,
} from 'unocss'

export default defineConfig({
	presets: [presetAttributify(), presetUno(), presetIcons()],
	theme: {
		colors: {
			border: 'hsl(var(--border)/25%)',
			input: 'hsl(var(--input))',
			ring: 'hsl(var(--ring)/25%)',
			background: 'hsl(var(--background))',
			foreground: 'hsl(var(--foreground))',
			primary: {
				DEFAULT: 'hsl(var(--primary))',
				foreground: 'hsl(var(--primary-foreground))',
			},
			secondary: {
				DEFAULT: 'hsl(var(--secondary))',
				foreground: 'hsl(var(--secondary-foreground))',
			},
			neutral: {
				DEFAULT: 'hsl(var(--neutral))',
				foreground: 'hsl(var(--neutral-foreground))',
			},
			accent: {
				DEFAULT: 'hsl(var(--accent))',
				foreground: 'hsl(var(--accent-foreground))',
			},
			muted: {
				DEFAULT: 'hsl(var(--muted))',
				foreground: 'hsl(var(--muted-foreground))',
			},
			success: {
				DEFAULT: 'hsl(var(--success))',
				foreground: 'hsl(var(--success-foreground))',
			},
			destructive: {
				DEFAULT: 'hsl(var(--destructive))',
				foreground: 'hsl(var(--destructive-foreground))',
			},
			popover: {
				DEFAULT: 'hsl(var(--popover))',
				foreground: 'hsl(var(--popover-foreground))',
			},
			card: {
				DEFAULT: 'hsl(var(--card))',
				foreground: 'hsl(var(--card-foreground))',
			},
		},
	},
	transformers: [transformerVariantGroup()],
})
