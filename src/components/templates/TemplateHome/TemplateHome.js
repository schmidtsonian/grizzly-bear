import React, {Component} from 'react';

class TemplateHome extends Component {

  constructor(props) {
    super(props);

    this.timeout = null;
    this.currentAudio = null;

    this.state = {
      total: 0,
      indexItemActive: 0,
      state: 'idle' //0: idle, 1: action, 2: resting
    }
  }

  componentDidUpdate(prevProps) {

    if (this.props.total !== prevProps.total) {

      this.setState({total: this.props.total});
    }
  }

  render() {

    const {bears} = this.props;
    const {indexItemActive, state} = this.state;

    return (

      <section className='t-home h-abs-bg'>
        {
          bears.map((item, index) => {

            const data = item.data;
            const nameClassActive = index === indexItemActive ? 'is-active' : '';

            return (
              <div
                key={index}
                className={`t-home-bear ${nameClassActive} is-${state}`}>

                <div
                className='t-home-bear__image t-home-bear__idle h-abs-bg'
                style={{'backgroundImage': `url(${data.image_idle.url})`}}></div>

                <div
                className='t-home-bear__image t-home-bear__action h-abs-bg'
                style={{'backgroundImage': `url(${data.image_action.url})`}}></div>

                <div
                className='t-home-bear__image t-home-bear__resting h-abs-bg'
                style={{'backgroundImage': `url(${data.image_resting.url})`}}></div>
              </div>
            );
          })
        }

        <div
        className='t-home__bt t-home__bt--rand h-abs-left-bottom'
        onClick={this._next.bind(this)} >

          <span
          className='t-home__bt-state-idle h-abs-bg'
          style={{'backgroundImage': 'url(/images/button-idle.png)'}} ></span>

          <span
          className='t-home__bt-state-hover h-abs-bg'
          style={{'backgroundImage': 'url(/images/button-hover.png)'}} ></span>

          <span
          className='t-home__bt-state-down h-abs-bg'
          style={{'backgroundImage': 'url(/images/button-down.png)'}} ></span>

        </div>

        <div
        className='t-home__bt t-home__bt--action h-abs-right-bottom'
        onClick={this._doAction.bind(this)}>

          <span
          className='t-home__bt-state-idle h-abs-bg'
          style={{'backgroundImage': 'url(/images/button-idle.png)'}} ></span>

          <span
          className='t-home__bt-state-hover h-abs-bg'
          style={{'backgroundImage': 'url(/images/button-hover.png)'}} ></span>

          <span
          className='t-home__bt-state-down h-abs-bg'
          style={{'backgroundImage': 'url(/images/button-down.png)'}} ></span>

        </div>

      </section>
    );
  }

  _next() {

    if(this.state.state === 'action') {return;}

    const {indexItemActive, total} = this.state;
    const prevIndex = indexItemActive;
    let nexIndex = prevIndex + 1;

    nexIndex = nexIndex < 0 ? total - 1 : nexIndex;
    nexIndex = nexIndex >= total ? 0 : nexIndex;

    this._tweenSlide(nexIndex, prevIndex);
  }

  _tweenSlide(nexIndex, prevIndex) {

    this.setState({
      state: 'idle',
      indexItemActive: nexIndex,
    });
  }

  _doAction() {

    const {indexItemActive} = this.state;
    const {bears} = this.props;

    this.setState({state: 'action'});

    if(this.timeout) {
      clearTimeout(this.timeout);
    }

    this.currentAudio = new Audio();
    this.currentAudio.addEventListener('canplaythrough', () => {
      this.timeout = setTimeout(() => {
        this.setState({state: 'resting'});
      }, this.currentAudio.duration * 1000);
      this.currentAudio.play();
    });

    const randIndex = Math.floor(Math.random() * bears[indexItemActive].data.audios.length);
    this.currentAudio.src = bears[indexItemActive].data.audios[randIndex].audio.url
  }
}

export default TemplateHome;