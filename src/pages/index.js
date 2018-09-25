import Prismic from 'prismic-javascript';
import React, {Component} from 'react';
import Layout from '../components/layout';
import TemplateHome from '../components/templates/TemplateHome/TemplateHome';


class IndexPage extends Component {

  constructor(props) {

    super(props);

    this.state = {
      total: 0,
      bears: []
    }

    this.api = null;
  }

  componentDidMount() {

    const API_ENDPOINT = 'https://grizzlybear.cdn.prismic.io/api/v2';
    const API_TOKEN = 'MC5XNlFDLUNZQUFDWUFRNV9t.SSrvv71U77-9Au-_ve-_vWLvv70DLe-_ve-_ve-_ve-_ve-_ve-_vXfvv70Y77-977-9RX0rW--_vUEree-_vQ';

    Prismic.getApi(API_ENDPOINT, {accessToken: API_TOKEN})
      .then((api) =>
        api.query(Prismic.Predicates.any('document.type', ['bears'])))
      .then(
        (data) => this._normalizeData(data),
        (err) => console.log('Something went wrong: ', err)
      );
  }

  render() {

    const {bears, total} = this.state;

    return (
      <Layout>
        <TemplateHome bears={bears} total={total} />
      </Layout>

    );
  }

  _shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  _normalizeData(data) {

    console.log(data.results);
    this.setState({
      bears: this._shuffle(data.results),
      total: data.results.length,
    });
  }
}



export default IndexPage;
