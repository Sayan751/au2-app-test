import { IHttpClient } from '@aurelia/fetch-client';
import { customElement } from '@aurelia/runtime-html';
import template from './dog-ceo.html';

@customElement({ name: 'dog-ceo', template })
export class DogCeo {
    public url: string = '';
    public promise: Promise<void> | null = null;

    public constructor(
        @IHttpClient private http: IHttpClient,
    ) {
        void this.fetchDog();
    }

    public async fetchDog() {
        let resolve!: () => void;
        this.promise = new Promise((res) => resolve = res);
        const response = await this.http.fetch('https://dog.ceo/api/breeds/image/random');
        if (!response.ok) throw new Error(`Cannot fetch`);
        this.url = (await response.json() as DogResponse).message;
        resolve();
    }
}

interface DogResponse {
    message: string;
}