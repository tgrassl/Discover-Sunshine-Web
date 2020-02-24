
const prefix = '[Search]';

export class GetVocabularyAction {
  static readonly type = `${prefix} Get vocabulary`;
}

export class SearchVocabularyAction {
  static readonly type = `${prefix} Search vocabulary`;
  constructor(public searchTerm: string) { }
}
