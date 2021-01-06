import { shallowMount } from '@vue/test-utils'
import CovidDataComponent from '@/modules/covid-data/components/CovidDataComponent.vue'

describe('CovidDataComponent', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(CovidDataComponent);
  });
  it('renders', async () => {
    let msg = 'Show grid representation';
    let button =wrapper.find('.component-button');
    expect(button.text()).toBe(msg);

    await button.trigger('click');

    msg = 'Show table representation';
    expect(button.text()).toBe(msg);
  })
})
