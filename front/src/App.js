import { Provider } from "react-redux";
import Layout from "./Layout";
import HeaderMenubar from "./ideUI/header/HeaderMenubar";
import { store } from "./store";

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
