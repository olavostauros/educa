export class QuestionCardElement extends HTMLElement {
  connectedCallback() {
    const gabarito = this.dataset.gabarito;
    const gabaritoTexto = this.dataset.gabaritoTexto;
    const opcoes = [...this.querySelectorAll<HTMLButtonElement>('[data-opcao]')];
    const botao = this.querySelector<HTMLButtonElement>('[data-ver-gabarito]');
    const resultado = this.querySelector<HTMLElement>('[data-resultado]');
    if (!gabarito || !botao || !resultado || !opcoes.length) return;

    let respondida = false;

    const marcar = (opcao: HTMLButtonElement) => {
      opcoes.forEach((o) => {
        delete o.dataset.state;
        o.setAttribute('aria-checked', 'false');
        o.tabIndex = -1;
      });
      opcao.dataset.state = 'selected';
      opcao.setAttribute('aria-checked', 'true');
      opcao.tabIndex = 0;
    };

    opcoes.forEach((opcao, i) => {
      opcao.tabIndex = i === 0 ? 0 : -1;
      opcao.addEventListener('click', () => {
        if (!respondida) marcar(opcao);
      });
      opcao.addEventListener('keydown', (e) => {
        const delta = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
        if (!delta) return;
        e.preventDefault();
        const proximo = opcoes[(i + delta + opcoes.length) % opcoes.length];
        proximo.focus();
        if (!respondida) marcar(proximo);
      });
    });

    botao.addEventListener('click', () => {
      respondida = true;
      let acertou: boolean | null = null;
      opcoes.forEach((opcao) => {
        const correta = opcao.dataset.opcao === gabarito;
        const escolhida = opcao.getAttribute('aria-checked') === 'true';
        opcao.dataset.state = correta ? 'correct' : escolhida ? 'wrong' : 'dim';
        opcao.setAttribute('aria-disabled', 'true');
        if (escolhida) acertou = correta;
      });

      resultado.textContent =
        acertou === null
          ? `Gabarito: ${gabaritoTexto}`
          : `${acertou ? 'Você acertou' : 'Você errou'} — gabarito: ${gabaritoTexto}`;
      resultado.classList.remove('hidden');
      resultado.classList.add(
        acertou === false ? 'text-danger' : acertou ? 'text-success' : 'text-accent',
      );
      botao.classList.add('hidden');
      resultado.tabIndex = -1;
      resultado.focus();
    });
  }
}

if (!customElements.get('question-card')) {
  customElements.define('question-card', QuestionCardElement);
}
