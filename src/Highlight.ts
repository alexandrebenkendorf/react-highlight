export type HighlightConfig = {
  caseSensitive?: boolean;
  className?: string;
  inlineStyle?: string;
};

const defaultConfig: HighlightConfig = {
  caseSensitive: false,
  className: '',
  inlineStyle: '',
};

export default class Highlight {
  text: string = '';
  searchTerm: string = '';
  terms: string[] = [];
  matchedTerms: string[] = [];
  html: HTMLSpanElement = document.createElement('span');
  config: HighlightConfig = { ...defaultConfig };

  constructor(config: HighlightConfig = {}) {
    (Object.keys(config) as (keyof HighlightConfig)[]).forEach((key) => {
      config[key] === undefined && delete config[key];
    });
    this.config = { ...this.config, ...config };
  }
  
  term(searchTerm: string) {
    this.matchedTerms = [];
    this.terms = [];
    this.searchTerm = searchTerm.trim();
    this.#setTerms();
    this.#execute();

    return this;
  }

  in(text: string) {
    this.text = text;
    this.#execute();

    return this;
  }

  #execute() {
    this.html.innerHTML = this.text;
    this.#setInnerHtml();
  }

  #setInnerHtml() {
    for (const term of this.terms) {
      const { matchedTerm, regex } = this.#getMatchedTermAndRegex(term);
      if (!matchedTerm) {
        break;
      }

      this.matchedTerms.push(matchedTerm);
      const className = this.config.className ? ` class="${this.config.className}"` : '';
      const inlineStyle = this.config.inlineStyle ? ` style="${this.config.inlineStyle}"` : '';
      const htmlString = `<strong data-testid="highlighted"${className}${inlineStyle}>${matchedTerm}</strong>`;
      this.html.innerHTML = this.html.innerHTML.replace(regex, htmlString);
    }
  }

  #getMatchedTermAndRegex(term: string) {
    const flags = `g${this.config.caseSensitive ? '' : 'i'}`;
    const regex = new RegExp(term, flags);
    const match = this.text.match(regex);
    const matchedTerm = match ? match[0] : null;
    return { matchedTerm, regex };
  }

  #setTerms() {
    let tempSearchTerm = this.searchTerm;
    const quotedTerms = tempSearchTerm.match(/"(.*?)"/gi)?.map((term) => term.replaceAll('"', '')) || [];
    for (const quotedTerm of quotedTerms) {
      tempSearchTerm = tempSearchTerm.replaceAll(`"${quotedTerm}"`, '');
    }
    const cleanedTerms = tempSearchTerm.split(' ').filter((term) => term !== '');
    this.terms = [...new Set([...quotedTerms, ...cleanedTerms])];
  }
}
