export const getQueryString = (name: string) => {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  const r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURIComponent(r[2]);
  return '';
};

export const querySearch = (search: string) => search.slice(1).split('&').reduce((total, v) => {
  const q = v.split('=')
  // eslint-disable-next-line prefer-destructuring
  total[q[0]] = q[1]
  return total
}, {});
