var Redux, {createStore} = require('redux');
import reducers from './reducers';

const configureStore = () => {
    return createStore(reducers);
}

export default configureStore;
