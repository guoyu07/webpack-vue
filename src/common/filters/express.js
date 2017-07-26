import _    from 'lodash';
import Vue  from 'vue';

Vue.filter('express', function (key) {
  const dict = [
    {
      label: '待出库',
      value: 0,
    },
    {
      label: '订单已收货',
      value: 1,
    },
    {
      label: '订单已发货',
      value: 2,
    },
    {
      label: '配送员已出发',
      value: 3,
    },
  ];

  if (_.isObject(key) || _.isArray(key)) {
    return dict;
  }

  const item = _.find(dict, { value: key });
  return item ? item.label : key;
});