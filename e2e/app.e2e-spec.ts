import { YahtzeeScorerV2Page } from './app.po';

describe('yahtzee-scorer-v2 App', function() {
  let page: YahtzeeScorerV2Page;

  beforeEach(() => {
    page = new YahtzeeScorerV2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
