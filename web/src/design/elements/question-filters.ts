export class QuestionFiltersElement extends HTMLElement {
  connectedCallback() {
    const selects = this.querySelectorAll<HTMLSelectElement>('select[data-filtro]');
    const items = this.querySelectorAll<HTMLElement>('[data-filter-item]');
    const contagem = this.querySelector<HTMLElement>('[data-contagem]');

    const filtrar = () => {
      const ativos = [...selects]
        .map((s) => ({ campo: s.dataset.filtro!, valor: s.value }))
        .filter((f) => f.valor !== '');

      let visiveis = 0;
      items.forEach((item) => {
        const ok = ativos.every((f) => item.dataset[f.campo] === f.valor);
        item.hidden = !ok;
        if (ok) visiveis++;
      });
      if (contagem) contagem.textContent = String(visiveis);
    };

    selects.forEach((s) => s.addEventListener('change', filtrar));
  }
}

if (!customElements.get('question-filters')) {
  customElements.define('question-filters', QuestionFiltersElement);
}
