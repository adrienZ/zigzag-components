import {
  storiesOf
} from '@storybook/vue';
import {
  withOptions
} from '@storybook/addon-options';
import 'bootstrap/dist/css/bootstrap.css';

import Underline from '../components/text/Underline.vue'

const stories = storiesOf('Text', module);
withOptions({
  hierarchySeparator: /\//, // matches /
  // hierarchySeparator: /\/|\./, // matches a . or /
  // hierarchyRootSeparator: /\|/, //matches a |
});


const demoComponent = text => ({
  components: {
    Underline
  },
  template: `
    <div class="container">
      <div class="form-group"></div>
      <h1>Underline effects</h1>
      <div class="jumbotron w-100">
        <Underline />
      </div>
    </div>`
})

stories.add('Underline', demoComponent)
