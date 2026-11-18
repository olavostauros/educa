const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const navItems = [
  { href: `${base}/`, label: 'Questões' },
  { href: `${base}/provas/`, label: 'Provas' },
  { href: `${base}/simulado/`, label: 'Simulado' },
];
