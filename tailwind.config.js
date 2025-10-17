module.exports = {
    darkMode: 'class',
    content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        colors: {
          background: 'var(--background)',
          foreground: 'var(--foreground)',
          card: 'var(--card)',
          'card-foreground': 'var(--card-foreground)',
          primary: 'var(--primary)',
          'primary-foreground': 'var(--primary-foreground)',
          secondary: 'var(--secondary)',
          muted: 'var(--muted)',
          accent: 'var(--accent)',
          destructive: 'var(--destructive)',
          border: 'var(--border)',
          input: 'var(--input)',
          ring: 'var(--ring)',
          chart1: 'var(--chart-1)',
          chart2: 'var(--chart-2)',
          chart3: 'var(--chart-3)',
          chart4: 'var(--chart-4)',
          chart5: 'var(--chart-5)',
        },
        borderRadius: {
          lg: 'var(--radius)',
        },
      },
    },
    plugins: [require('tw-animate-css')],
  };
  