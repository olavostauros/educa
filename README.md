# Educa

Provas e questões oficiais de **concursos públicos brasileiros**, por banca, órgão, cargo, ano e
assunto.

Projeto desenvolvido para o [HackBrasil](https://hackbrasil.com/) — a maior hackathon do Brasil —
na trilha **Acesso à educação**.

## O que é

Educa é um site onde estudantes podem acessar provas e resolver questões de concursos públicos do
Brasil, de graça e sem cadastro.

- Filtre questões por banca, órgão, cargo, ano e assunto
- Resolva questões e confira o gabarito na hora
- Acesse provas oficiais completas para montar seus simulados
- Cada questão traz o gabarito definitivo e a fonte de onde foi extraída

## Como funciona

O site é estático. As questões vêm de um snapshot do banco de questões, extraído dos PDFs oficiais
das bancas, com gabarito definitivo e a fonte de cada questão.

## Front-end

- Astro, TypeScript e Tailwind CSS
- Site estático publicado no GitHub Pages

Questões em aberto:

- Uso de React — se e onde faz sentido introduzir componentes interativos além do que o Astro
  entrega sozinho
- Desenvolvimento do design system e definição dos tokens (cores, tipografia, espaçamento)

## Crawling e dados

- Crawlers em Python (Scrapy e Playwright) coletam provas e PDFs oficiais das bancas
- As questões são extraídas dos PDFs com gabarito definitivo e fonte
- O site consome um snapshot do banco de questões gerado por esse pipeline

## Próximos passos

O banco de dados também vai incluir editais, recursos e decisões das bancas. Eventualmente, Educa
vai ter um agente que resolve, explica e ensina questões — e que também lê editais para ajudar o
estudante a entender o que vai cair na prova.

## Origem

Educa nasceu do [Plantão](https://github.com/olavostauros/plantao), que cataloga questões de
provas oficiais de concursos policiais. Educa amplia o escopo para todos os concursos públicos
brasileiros, com foco em estudantes.
