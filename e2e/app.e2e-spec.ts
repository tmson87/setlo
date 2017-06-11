import { SetloPage } from './app.po';

describe('setlo App', () => {
  let page: SetloPage;

  beforeEach(() => {
    page = new SetloPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
