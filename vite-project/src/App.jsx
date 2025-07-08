import {Layout} from "./components/Layout.jsx";
import {Hero} from "./components/sections/Hero.jsx";
import {Discovery} from "./components/sections/Discovery.jsx";

function App() {
  return <Layout title="无界律动">
    <Hero />
    <Discovery />
  </Layout>;
}

export default App
