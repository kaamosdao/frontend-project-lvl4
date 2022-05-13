export default (state, key, id) => state.items.filter((item) => item[key] !== id);
