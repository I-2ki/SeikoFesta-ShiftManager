/* @refresh reload */
import { render } from 'solid-js/web';
import "solid-devtools"

import App from './components/Pages/App';

render(() => <App />, document.getElementById('root') as HTMLElement);
