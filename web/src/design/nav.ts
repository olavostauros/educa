const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const navItems = [
  { href: `${base}/`, label: 'Questões' },
  { href: `${base}/provas/`, label: 'Provas' },
  { href: `${base}/simulado/`, label: 'Simulado' },
];

export const projectLinks = [
  { href: 'https://github.com/olavostauros/papiro', label: 'Código no GitHub' },
  { href: 'https://hackbrasil.com/', label: 'HackBrasil' },
  { href: 'https://github.com/olavostauros/plantao', label: 'Plantão' },
];
