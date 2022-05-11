export default (state, id, payload) => state.items.filter((message) => message[id] !== payload.id);
