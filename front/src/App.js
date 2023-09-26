import { Provider } from "react-redux";
import HeaderMenubar from "./ideUI/header/HeaderMenubar";
import { store } from "./store";
import Layout from "./layout/Layout";

function App() {
  return (
    <Provider store={store}>
      <div>
        <HeaderMenubar />
        <Layout />
      </div>
    </Provider>
  );
}

export default App;
