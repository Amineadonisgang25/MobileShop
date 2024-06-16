import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "../../public/css/responsive.css";
import "../../public/css/bootstrap.min.css";
import "../../public/css/style.css"
import { Provider } from 'react-redux';
import  {store} from '@/store/store';
import { CookieProvider } from '@/context/CookieContext';




export default function App({ Component, pageProps}: AppProps ) {
  return (
      <CookieProvider>
          <Provider store={store}>
                  <Component {...pageProps} />
          </Provider>
      </CookieProvider>
      );
}
