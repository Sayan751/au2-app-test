import { Registration, IPlatform } from "@aurelia/kernel";
import { CustomElement, StandardConfiguration, BrowserPlatform } from "@aurelia/runtime-html";
import { createFixture, TestContext } from "@aurelia/testing";
import { assert } from 'chai';
import { DogCeo } from '../src/dog-ceo';

describe('dog-ceo', function () {
    it('works', async function () {
        // arrange/bootstrap
        const platform = new BrowserPlatform(window);
        const ctx = TestContext.create();
        ctx.container.register(
            Registration.instance(IPlatform, platform),
            StandardConfiguration,
            DogCeo,
        );
        const fixture = createFixture(
            '<dog-ceo></dog-ceo>',
            undefined,
            [],
            true,
            ctx,
        );
        const queue = platform.domWriteQueue;

        // grab the CE.
        const dogCeoEl = fixture.host!.querySelector('dog-ceo')!;
        const dogCeo = CustomElement.for(dogCeoEl).viewModel as DogCeo;
        assert.instanceOf(dogCeo, DogCeo, 'incorrect instance');

        // assert URL
        await dogCeo.promise;
        let url = dogCeo.url;
        assert.strictEqual(url != null, true, 'expected truthy url1');
        assert.notEqual(url, '', 'expected truthy url2');
        queue.flush();
        const img = dogCeoEl.querySelector('img');
        assert.strictEqual(img!.src, url, 'img.src 1');

        // fetch new image
        dogCeoEl.querySelector('button')?.click();
        await dogCeo.promise;
        assert.notEqual(dogCeo.url, url, 'url should have been changed');
        queue.flush();
        assert.strictEqual(img!.src, dogCeo.url, 'img.src 2');

        await fixture.tearDown();
    });
});