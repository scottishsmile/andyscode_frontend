import '@/styles/globals.scss'
import 'bootstrap/dist/css/bootstrap.min.css';            // Import bootstrap css!
import {useEffect} from 'react'
import { Provider } from 'react-redux';
import { useStore } from '@/store/store';

export default function App({ Component, pageProps}) {

  // Bootstrap JavaScript files
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  // Initialize redux store
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
        <Component {...pageProps} />
    </Provider>
  );
}