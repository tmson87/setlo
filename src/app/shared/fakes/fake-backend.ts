import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions) {
    // configure fake backend
    backend.connections.subscribe((connection: MockConnection) => {
        const testUser = {
          id: '123',
          email: 'test',
          password: 'test',
          firstName: 'Test',
          lastName: 'User',
          token: 'ABCDE',
          exp: '2018-01-01T00:00:00z' };

        // wrap in timeout to simulate server api call
        setTimeout(() => {

            // fake authenticate api end point
            if (connection.request.url.endsWith('/auth') && connection.request.method === RequestMethod.Post) {
                // get parameters from post request
                const params = JSON.parse(connection.request.getBody()).params;

                // check user credentials and return fake jwt token if valid
                if (params.email === testUser.email && params.password === testUser.password) {
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 200, body: { result: testUser } })
                    ));
                } else {
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 200, body: { error: { message: 'Incorrect email or password' } } })
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
