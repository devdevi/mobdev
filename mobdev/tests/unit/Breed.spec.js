import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';
import BreedGallery from '@/components/BreedGallery.vue';

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg },
    });
    expect(wrapper.text()).to.include(msg);
  });
});
describe('BreedGallery.vue', () => {
  const pictures = [
    'https://images.dog.ceo/breeds/african/n02116738_10024.jpg',
    'https://images.dog.ceo/breeds/african/n02116738_10024.jpg',
    'https://images.dog.ceo/breeds/african/n02116738_10024.jpg',
  ];
  const index = 1;
  const wrapper = shallowMount(BreedGallery, {
    propsData: { pictures, index },
  });
  it('render the pictures', () => {
    expect(wrapper.html()).contain('<div class="columns is-multiline is-mobile is-2 is-cenered" index="1"><div class="column"><figure class="image is-128x128"><img src="https://images.dog.ceo/breeds/african/n02116738_10024.jpg" class="image is-128x128"></figure></div><div class="column"><figure class="image is-128x128"><img src="https://images.dog.ceo/breeds/african/n02116738_10024.jpg" class="image is-128x128"></figure></div><div class="column"><figure class="image is-128x128"><img src="https://images.dog.ceo/breeds/african/n02116738_10024.jpg" class="image is-128x128"></figure></div></div>')
  });
});
