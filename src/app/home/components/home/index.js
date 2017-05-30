import Store from '~home/store';

export default {
  name: 'home',
  data () {
    return {
      msg: 'Home',
      test1: Store.state.Home.test,
    };
  },
  computed: {
    test: function () {
      return Store.state.Home.test;
    },
  },
  methods: {
    testClick: function () {
      Store.commit('testFun');
      Store.dispatch('testAct');
    }
  }
};