# Educa

Provas e questões oficiais de **concursos públicos brasileiros**, por banca, órgão, cargo, ano e
assunto — de graça e sem cadastro.

Projeto desenvolvido para o [HackBrasil](https://hackbrasil.com/) — a maior hackathon do Brasil —
na trilha **Acesso à educação**.

## O problema

Resolver questões de provas anteriores é a principal forma de estudar para concurso público no
Brasil. Mas acessar esse material hoje é difícil:

- **As provas estão espalhadas.** Cada banca (Cebraspe, FGV, FCC, Vunesp…) publica provas e
  gabaritos em PDFs soltos no próprio site, com padrões diferentes e links que quebram.
- **Os bancos de questões completos são pagos.** Filtrar por banca, órgão, cargo, ano e assunto —
  o básico para montar um simulado útil — costuma exigir assinatura.
- **Não dá para confiar na fonte.** Sites gratuitos agregam questões sem indicar de qual prova
  ela veio nem qual foi o gabarito definitivo publicado pela banca.

Quem não pode pagar estuda pior. Isso é um problema de acesso à educação.

## A solução

Educa é um site onde qualquer estudante acessa provas e resolve questões de concursos públicos
brasileiros, de graça e sem cadastro:

- Filtre questões por **banca, órgão, cargo, ano e assunto**
- Resolva questões e confira o **gabarito na hora**
- Acesse **provas oficiais completas** para montar seus simulados
- Cada questão traz o **gabarito definitivo** e a **fonte** de onde foi extraída

**Exemplo de uso:** Maria vai prestar o concurso do IBAMA para Analista Administrativo. No Educa
ela filtra `banca: Cebraspe` + `cargo: Analista Administrativo` + `assunto: Língua Portuguesa`,
resolve um bloco de 20 questões e confere o gabarito com a fonte oficial de cada uma.

## Como funciona

```
sites das bancas ──> crawlers ──> PDFs oficiais ──> extração ──> banco de questões (JSON)
                                                                        │
                                              site estático <── snapshot versionado
```

1. **Crawlers** em Python (Scrapy e Playwright) coletam provas e gabaritos nos sites das bancas.
2. Um **pipeline de extração** lê os PDFs e gera questões estruturadas, com gabarito definitivo
   e fonte.
3. O banco de questões é consolidado em **snapshots JSON**, versionados junto ao código.
4. O **site estático** consome o snapshot em tempo de build e é publicado no GitHub Pages — sem
   backend, sem custo de infraestrutura.

### Formato dos dados

Cada questão é um registro JSON com metadados de filtro, enunciado, gabarito e fonte:

```json
{
  "id": "cebraspe-2024-pf-escrivao-042",
  "banca": "Cebraspe",
  "orgao": "Polícia Federal",
  "cargo": "Escrivão de Polícia Federal",
  "ano": 2024,
  "assunto": "Direito Administrativo",
  "tipo": "certo_errado",
  "enunciado": "A respeito dos atos administrativos, julgue o item a seguir. ...",
  "gabarito": "certo",
  "fonte": "https://cdn.cebraspe.org.br/concursos/PF_24/arquivos/..."
}
```

## Estrutura do repositório

```
educa/
├── web/        # site estático (Astro, TypeScript, Tailwind CSS)
├── crawlers/   # coleta de provas e PDFs (Python, Scrapy, Playwright)
├── pipeline/   # extração de questões dos PDFs para o banco de dados
└── data/       # snapshots JSON do banco de questões
```

## Como executar

Pré-requisitos: Node.js 20+ e Python 3.12+.

### Site

```bash
cd web
npm install
npm run dev     # desenvolvimento em http://localhost:4321/educa/
npm run build   # gera o site estático em dist/
npm run preview # serve o build de produção localmente
```

### Crawlers e extração

```bash
cd crawlers
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
playwright install              # browsers usados pelo Playwright
scrapy crawl cebraspe           # exemplo: coleta as provas da banca Cebraspe
```

```bash
cd pipeline
pip install -r requirements.txt
python extract.py --in data/raw --out data/questions.json
```

### Deploy

O site é publicado automaticamente no GitHub Pages a cada push na branch `master`, pelo workflow
`.github/workflows/deploy.yml`. URL de produção: https://olavostauros.github.io/educa/

O deploy também pode ser disparado manualmente em **Actions → Deploy to GitHub Pages → Run
workflow**.

## Stack

- **Front-end:** Astro, TypeScript e Tailwind CSS; site estático no GitHub Pages
- **Crawling:** Python com Scrapy e Playwright
- **Dados:** snapshots JSON versionados no Git
- **Agente (planejado):** LLM que resolve, explica e ensina questões e lê editais

## Questões em aberto

**Front-end**

- Uso de React ou Vue — se e onde faz sentido introduzir componentes interativos além do que o
  Astro entrega sozinho
- Desenvolvimento do design system — definição dos tokens (cores, tipografia, espaçamento) e
  componentes base como botões e ícones

**Dados**

- Formato dos dados — arquivos JSON como opção principal (snapshots versionáveis no Git),
  avaliando alternativas como JSONL, MessagePack ou Parquet para datasets maiores; solução com
  SQL fica como segunda opção

**Agente** — resolve, explica e ensina questões, e lê editais para ajudar o estudante a entender
o que vai cair na prova

- Onde o agente roda — o site é estático, então a feature exige backend, função serverless ou
  integração direta com API de LLM
- Escolha do modelo e provider
- Como o agente acessa o banco de questões, editais, recursos e decisões (RAG sobre os arquivos
  de dados vs. contexto direto)
- Custos e limites de uso por estudante

## Próximos passos

O banco de dados também vai incluir editais, recursos e decisões das bancas.

## Origem

Educa nasceu do [Plantão](https://github.com/olavostauros/plantao), que cataloga questões de
provas oficiais de concursos policiais. Educa amplia o escopo para todos os concursos públicos
brasileiros, com foco em estudantes.
