import {
  storiesOf
} from '@storybook/vue';
import {
  withKnobs,
  select,
} from '@storybook/addon-knobs';

import IframePlayer from '../components/iframe-player/iframe-player.vue'

const options = {
  'Youtube page url': 'https://www.youtube.com/watch?v=pCnsWTEaYLU',
  'Youtube embed url': 'https://www.youtube.com/embed/pCnsWTEaYLU',
  'Vimeo page url': 'https://vimeo.com/259411563',
  'Vimeo embed url': 'https://player.vimeo.com/video/255269888',
  'Dailymotion page url': 'https://www.dailymotion.com/video/x7tbx37?playlist=x5nmbq',
  'Dailymotion embed url': 'https://www.dailymotion.com/embed/video/x7s2hhv',
  'Not url': 'not url',
};



const stories = storiesOf('Player', module);
stories.addDecorator(withKnobs);

stories.add('Iframe', () => ({
  components: {
    IframePlayer
  },
  props: {
    src: {
      default: select('Source', options, options[Object.keys(options)[0]], 'GROUP-ID1')
    },
  },
  template: `<div>
    <IframePlayer :src="src" />
    {{src}}
  </div>`
}));