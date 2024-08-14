import "./App.css";
import { useRoutes } from "react-router-dom";
import DataProvider from "./contexts/ContextData";
import routes from "./routes";
import Header from "./components/subComponents/header/Header";

function App() {
  const router = useRoutes(routes);

  return (
		<DataProvider>
			<Header />
		   {router}
		</DataProvider>
  );
}

export default App;
