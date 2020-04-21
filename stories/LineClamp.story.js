import {
  storiesOf
} from '@storybook/vue';
import {
  withKnobs,
  number
} from '@storybook/addon-knobs';
import {
  withOptions
} from '@storybook/addon-options';
import 'bootstrap/dist/css/bootstrap.css';

import LineClamp from '../components/line-clamp.vue'

const stories = storiesOf('Colorz/Text/Line clamp', module);
withOptions({
  hierarchySeparator: /\//, // matches /
  // hierarchySeparator: /\/|\./, // matches a . or /
  // hierarchyRootSeparator: /\|/, //matches a |
});
stories.addDecorator(withKnobs);


const cases = {
  'With HTML': `<div class="text-18 leading-loose"><p class="mt-20">Si ça se trouve? Alors pour nous sortir de là va falloir un plus solide que du si ça se trouve! Mais ils ont pas le droit de décider de la retraite eux-mêmes! On l’a dit et redit ça! Alors dites vous que c’est un combat réel et montrez-moi ce que vous avez dans l’slibard! Sinon on fait un tunnel jusqu'à notre campement. Léodagan et moi on creuse, pendant vous balancez de la caillasse dans l'autre sens pour les éloigner du chantier. Faut faire comme avec les scorpions qui se suicident quand ils sont entourés par le feu. Ouais le problème c'est qu'on a passé quatre semaines à construire un barrage, ça fait un peu mal au cul de le détruire. Non mais n’exagérez pas non plus! J’vous demande quand même pas de manger des briques! </p><p class="mt-20">Y a des gens qui ont pris la peine de faire un dessert. La moindre des choses c’est de rester pour le manger. Putain en plein dans sa mouille! Non mais maintenant il faut se tirer dans l'autre sens. Passer la tête? Pour me prendre une flêche dedans? Non merci! </p><p class="mt-20">Très exactement c’est «Provençal le Gaulois». Déjà à la corne, ils regardent même pas vers ici! Vous pouvez bien agiter tout les drapeaux que vous voudrez! </p><p class="mt-20">Oui mais nous on est trois, enfin, deux et demi. La ferme! Mais ça va! Pourquoi vous m’agressez? </p><p class="mt-20">Alors là, personne sait qui est tombé et tout le monde s’en fout! Sans vouloir la ramener la seule différence concrète avec les briques c’est que vous appelez ça des tartes. Mais qu’est c’que ça peut vous foutre, de toute façon, c’est pas vous qui l’avez faite, si? </p></div>`,
  'With Link': `<div class="text-18 leading-loose"><p class="mt-20">Si ça se trouve? Alors pour nous sortir de là va falloir un plus solide que du si ça se trouve! Mais ils ont pas le droit de décider de la retraite eux-mêmes! On l’a dit et redit ça! Alors dites vous que c’est un combat réel et montrez-moi ce que vous avez dans l’slibard! Sinon on fait un tunnel jusqu'à notre campement. Léodagan et moi on creuse, pendant vous balancez de la caillasse dans l'autre sens pour les éloigner du chantier. Faut faire comme avec les scorpions qui se suicident quand ils sont entourés par le feu. Ouais le problème c'est qu'on a passé quatre semaines à construire un barrage, ça fait un peu mal au cul de le détruire. Non mais n’exagérez pas non plus! J’vous demande quand même pas de manger des briques! </p><p class="mt-20">Y a des gens qui ont pris la peine de faire un dessert. La moindre des choses c’est de rester pour le manger. Putain en plein dans sa mouille! Non mais maintenant il faut se tirer dans l'autre sens. Passer la tête? Pour me prendre une flêche dedans? Non merci! </p><p class="mt-20">Très exactement c’est «Provençal le Gaulois». Déjà à la corne, ils regardent même pas vers ici! Vous pouvez bien agiter tout les drapeaux que vous voudrez! </p><p class="mt-20">Oui mais nous on est trois, enfin, deux et demi. La ferme! Mais ça va! Pourquoi vous m’agressez? </p><p class="mt-20">Alors là, personne sait qui est tombé et tout le monde s’en fout! Sans vouloir la ramener la seule différence concrète avec les briques c’est que vous appelez ça des tartes. Mais qu’est c’que ça peut vous foutre, de toute façon, c’est pas vous qui l’avez faite, si? </p><a href="#">Je suis un lien</a></div>`,
  'text':
    `Très exactement c’est «Provençal le Gaulois». Déjà à la corne, ils regardent même pas vers ici! Vous pouvez bien agiter tout les drapeaux que vous voudrez!<a href="#">Je suis un lien</a>`
  ,
  'very Long Text': `Si ça se trouve? Alors pour nous sortir de là va falloir un plus solide que du si ça se trouve! Mais ils ont pas le droit de décider de la retraite eux-mêmes! On l’a dit et redit ça! Alors dites vous que c’est un combat réel et montrez-moi ce que vous avez dans l’slibard! Sinon on fait un tunnel jusqu'à notre campement. Léodagan et moi on creuse, pendant vous balancez de la caillasse dans l'autre sens pour les éloigner du chantier. Faut faire comme avec les scorpions qui se suicident quand ils sont entourés par le feu. Ouais le problème c'est qu'on a passé quatre semaines à construire un barrage, ça fait un peu mal au cul de le détruire. Non mais n’exagérez pas non plus! J’vous demande quand même pas de manger des briques!`
}


const demoComponent = text => ({
  components: {
    LineClamp
  },
  props: {
    lines: {
      default: number('Lines', 3)
    },
    text: {
      default: text
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$forceUpdate();
    })
  },
  template: `
    <div class="container">
      <div class="form-group"></div>
      <blockquote>Between 1 and 5 lines</blockquote>
      <div class="row">
        <div class="jumbotron" style="max-width: 320px">
          <code>Lines: {{lines}}</code>
          <LineClamp :lines="lines" v-html="text" />
        </div>
      </div>
    </div>`
})

Object.keys(cases).map(label => {
  stories.add(label, () => (demoComponent(cases[label])))
})