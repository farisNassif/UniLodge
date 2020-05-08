import { AppPage } from './app.po';
import { browser, by, element, logging } from 'protractor'

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo('/home');
    expect(page.getTitleText()).toEqual('UniLodge - Home');
  });
});
