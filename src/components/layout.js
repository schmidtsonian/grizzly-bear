import React, {Component} from 'react';
import Helmet from 'react-helmet';

import Header from './molecules/Header/Header';

import '../styles/main.scss';

class Layout extends Component {

  render() {

    return (
      <div className={`l-main`}>
        <Helmet
          title={'some title'}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        /><Header />

        <main className='l-container'>
          {this.props.children}
        </main>
      </div>
    );
  }
}

export default Layout;