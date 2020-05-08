import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(route: string) {
    return browser.get(route) as Promise<any>;
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getTitleText() {
    return element(by.css('head title')).getText() as Promise<string>;
  }
}
