import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions) {
    // configure fake backend
    backend.connections.subscribe((connection: MockConnection) => {
        const testUser = { username: 'test', password: 'test', firstName: 'Test', lastName: 'User' };

        // wrap in timeout to simulate server api call
        setTimeout(() => {

            // fake authenticate api end point
            if (connection.request.url.endsWith('/auth') && connection.request.method === RequestMethod.Post) {
                // get parameters from post request
                const params = JSON.parse(connection.request.getBody());

                // check user credentials and return fake jwt token if valid
                if (params.username === testUser.username && params.password === testUser.password) {
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 200, body: { token: 'fake-jwt-token' } })
                    ));
                } else {
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 200 })
                    ));
                }
            }

        }, 500);

    });

    return new Http(backend, options);
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: Http,
    useFactory: fakeBackendFactory,
    deps: [MockBackend, BaseRequestOptions]
};
