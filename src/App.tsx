import {AppProvider} from "./context/AppContext.tsx";
import AppRoutes from "./routes";


const App = () => (
    <AppProvider>

            <AppRoutes/>


    </AppProvider>
);

export default App;