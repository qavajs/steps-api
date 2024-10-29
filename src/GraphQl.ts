export default class GraphQl {
  method = 'POST';
  headers = { 'Content-Type': 'application/json' };
  _query = '';
  _variables = {};
  body = '';

  private updateBody() {
    this.body = JSON.stringify({ query: this._query, variables: this._variables });
  }

  set query(query: string) {
    this._query = query;
    this.updateBody();
  }

  set variables(variables: string) {
    this._variables = JSON.parse(variables);
    this.updateBody();
  }
}
