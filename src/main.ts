import { Aurelia, StandardConfiguration } from '@aurelia/runtime-html';
import { AppRoot as component } from './app-root';
import { DogCeo } from './dog-ceo';

(async function () {
  const host = document.querySelector<HTMLElement>('app')!;

  const au = new Aurelia()
    .register(
      StandardConfiguration,
      DogCeo,
    );
  au.app({ host, component });

  await au.start();
})().catch(console.error);
