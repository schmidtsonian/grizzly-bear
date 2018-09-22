import React, {Component} from 'react';

class TemplateHome extends Component {

  constructor(props) {
    super(props);

    this.state = {
      total: 0,
      indexItemActive: 0,
    }
  }

  componentDidUpdate(prevProps) {

    if (this.props.total !== prevProps.total) {

      this.setState({total: this.props.total});
    }
  }

  render() {

    const {bears} = this.props;
    const {indexItemActive} = this.state;

    console.log(indexItemActive);

    return (

      <section className='t-home h-abs-bg'>

        {
          bears.map((item, index) => {

            const nameClassActive = index === indexItemActive ? 'is-active' : '';

            return (
              <div
                key={index}
                onClick={this._next.bind(this)}
                className={`t-home-bear h-abs-bg ${nameClassActive}`}
                style={{'backgroundImage': `url(${item.image.url})`}}>
              </div>
            );
          })
        }
      </section>
    );
  }

  _next() {

    const {indexItemActive, total} = this.state;
    const prevIndex = indexItemActive;
    let nexIndex = prevIndex + 1;

    nexIndex = nexIndex < 0 ? total - 1 : nexIndex;
    nexIndex = nexIndex >= total ? 0 : nexIndex;

    this._tweenSlide(nexIndex, prevIndex);
  }

  _tweenSlide(nexIndex, prevIndex) {

    this.setState({indexItemActive: nexIndex});
  }
}

export default TemplateHome;