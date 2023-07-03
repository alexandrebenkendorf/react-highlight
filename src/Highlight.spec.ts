import Highlight from './Highlight';

let highlight: Highlight;

beforeEach(() => {
  highlight = new Highlight();
});

describe('Highlight', () => {
  it('should not duplicate the matching terms', () => {
    highlight.term('test test').in('test result');
    expect(highlight.matchedTerms).toHaveLength(1);
    expect(highlight.html.innerHTML).toBe('<strong data-testid="highlighted">test</strong> result');
  });

  it('should not highlight a term if there is no match', () => {
    highlight.term('testing').in('test result');
    expect(highlight.matchedTerms).toHaveLength(0);
    expect(highlight.html.innerHTML).toBe('test result');
  });

  it('should highlight a term if case insensitive', () => {
    highlight.term('test').in('Test result');
    expect(highlight.matchedTerms).toHaveLength(1);
    expect(highlight.html.innerHTML).toBe('<strong data-testid="highlighted">Test</strong> result');
  });

  it('should not highlight a term if case sensitive', () => {
    highlight = new Highlight({ caseSensitive: true });
    highlight.term('test').in('Test result');
    expect(highlight.matchedTerms).toHaveLength(0);
    expect(highlight.html.innerHTML).toBe('Test result');
  });

  it('should highlight part of the word', () => {
    highlight.term('tes').in('test result');
    expect(highlight.matchedTerms).toHaveLength(1);
    expect(highlight.html.innerHTML).toBe('<strong data-testid="highlighted">tes</strong>t result');
  });

  it('should highlight the terms separated by space', () => {
    highlight.term('the brown').in('the brown fox jumps over the lazy dog');
    expect(highlight.matchedTerms).toHaveLength(2);
    expect(highlight.html.innerHTML).toBe(
      '<strong data-testid="highlighted">the</strong> <strong data-testid="highlighted">brown</strong> fox jumps over <strong data-testid="highlighted">the</strong> lazy dog'
    );
  });

  it('should highlight the terms between quotes individually', () => {
    highlight.term('"brown fox""lazy dog"').in('the brown fox jumps over the lazy dog');
    expect(highlight.matchedTerms).toHaveLength(2);
    expect(highlight.html.innerHTML).toBe('the <strong data-testid="highlighted">brown fox</strong> jumps over the <strong data-testid="highlighted">lazy dog</strong>');
  });

  it('should highlight the terms between quotes and not highlight the unmatched term', () => {
    highlight.term('"brown fox" "lazy dog" cat').in('the brown fox jumps over the lazy dog');
    expect(highlight.matchedTerms).toHaveLength(2);
    expect(highlight.html.innerHTML).not.toContain('<strong data-testid="highlighted">cat</strong>');
  });

  it('should apply the custom css class to the highlight term', () => {
    highlight = new Highlight({ className: 'custom-class' });
    highlight.term('test').in('test result');
    expect(highlight.html.innerHTML).toBe('<strong data-testid="highlighted" class="custom-class">test</strong> result');
  });

  it('should apply the inline style to the highlight term', () => {
    highlight = new Highlight({ inlineStyle: 'color:blue;font-size:16px' });
    highlight.term('test').in('test result');
    expect(highlight.html.innerHTML).toBe('<strong data-testid="highlighted" style="color:blue;font-size:16px">test</strong> result');
  });

  it('should highlight the new term', () => {
    highlight.in('test result').term('test');
    const test1 = highlight.html.innerHTML;
    expect(test1).toBe('<strong data-testid="highlighted">test</strong> result');

    highlight.term('result');
    const test2 = highlight.html.innerHTML;
    expect(test2).toBe('test <strong data-testid="highlighted">result</strong>');

    highlight.term('foo');
    const test3 = highlight.html.innerHTML;
    expect(test3).not.toContain('<strong data-testid="highlighted">foo</strong>');
    expect(test3).toBe('test result');
  });
});
