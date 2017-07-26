import _    from 'lodash';
import Vue  from 'vue';

Vue.filter('tipsType', function (key) {
  const dict = [
    {
      label: '亲，您有好友申请大创客代付',
      value: 0,
    },
    {
      label: '亲，您尚未开通共享助力收益权限',
      value: 1,
    },
  ];

  if (_.isObject(key) || _.isArray(key)) {
    return dict;
  }

  const item = _.find(dict, { value: key });
  return item ? item.label : key;
});