import _    from 'lodash';
import Vue  from 'vue';

Vue.filter('gender', function (key) {
  const dict = [
    {
      label: '男',
      value: 1,
    },
    {
      label: '女',
      value: 2,
    },
    {
      label: '保密',
      value: 0,
    },
  ];

  if (_.isObject(key) || _.isArray(key)) {
    return dict;
  }

  let item = _.find(dict, { value: key });
  return item ? item.label : key;
});