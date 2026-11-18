export class ThemeToggleElement extends HTMLElement {
  connectedCallback() {
    this.syncState();
    this.querySelector('button')?.addEventListener('click', () => this.toggle());
  }

  private toggle() {
    const root = document.documentElement;
    root.classList.add('theme-switching');
    const dark = root.classList.toggle('dark');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
    document
      .querySelectorAll<ThemeToggleElement>('theme-toggle')
      .forEach((el) => el.syncState());
    void root.offsetHeight;
    requestAnimationFrame(() => root.classList.remove('theme-switching'));
  }

  syncState() {
    const dark = document.documentElement.classList.contains('dark');
    const button = this.querySelector('button');
    button?.setAttribute('aria-pressed', String(dark));
    button?.setAttribute('aria-label', dark ? 'Ativar tema claro' : 'Ativar tema escuro');
  }
}

if (!customElements.get('theme-toggle')) {
  customElements.define('theme-toggle', ThemeToggleElement);
}
