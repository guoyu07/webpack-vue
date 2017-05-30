export default {
  state: {
    test: 1,
  },
  mutations: {
    testFun: function () {
      console.log('首页状态mutations方法');
    }
  },
  actions:{
    testAct: function () {
      console.log('首页状态actions方法');
    }
  }
};
