import '@testing-library/jest-dom/extend-expect';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { isPropertySetInCss, isMediaRuleCorrect } from './utility.js';

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');
const css = fs.readFileSync(path.resolve(__dirname, './index.css'), 'utf8');
const parts = css.split('@media');
const mediaQuery = parts[1];

let dom;
let container;

describe('index.html', () => {
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: 'dangerously' });
    container = dom.window.document.body;
  });

  it('css-1 media query tanımlanmış', () => {
    expect(parts.length).toBe(2);
  });

  it('css-1 media query maks genişlik 500px için ayarlanmış', () => {
    expect(isMediaRuleCorrect(mediaQuery, 'max-width', '500px')).toBe(true);
  });

  it("css-2 responsive için body tag'i ile min genişlik 300px ayarlanmış", () => {
    expect(isPropertySetInCss(mediaQuery, 'body', 'min-width', '300px')).toBe(
      true
    );
  });

  it("css-3 menu-items class'ında istenen 3 özellik de tanımlanmış.", () => {
    expect(
      isPropertySetInCss(mediaQuery, '.menu-items', 'flex-direction', 'column')
    ).toBe(true);
    expect(
      isPropertySetInCss(mediaQuery, '.menu-items', 'align-items', 'stretch')
    ).toBe(true);
    expect(isPropertySetInCss(mediaQuery, '.menu-items', 'gap', '0')).toBe(
      true
    );
  });

  it("css-4 main-container class'ında istenen 3 özellik de tanımlanmış.", () => {
    expect(
      isPropertySetInCss(mediaQuery, '.main-container', 'width', '100%')
    ).toBe(true);
    expect(
      isPropertySetInCss(mediaQuery, '.main-container', 'font-size', '1.3rem')
    ).toBe(true);
    expect(
      isPropertySetInCss(mediaQuery, '.main-container', 'padding', '0')
    ).toBe(true);
  });

  it("css-5 main-content class'ında padding 1.5rem ayarlanmış", () => {
    expect(
      isPropertySetInCss(mediaQuery, '.main-content', 'padding', '1.5rem')
    ).toBe(true);
  });

  it("css-6 menu-items içindeki anchor tag(a)'ler için 3 özellik de ayarlanmış", () => {
    expect(
      isPropertySetInCss(mediaQuery, '.menu-itemsa', 'padding', '1.1rem')
    ).toBe(true);
    expect(
      isPropertySetInCss(
        mediaQuery,
        '.menu-itemsa',
        'border',
        '1px solid black'
      )
    ).toBe(true);
    expect(
      isPropertySetInCss(mediaQuery, '.menu-itemsa', 'text-align', 'center')
    ).toBe(true);
  });
});
