import ReactDOM from "react-dom/client";

// styles
import "./index.css";

// components
import App from "./App.jsx";

// router
import {BrowserRouter} from "react-router-dom";

// redux
import {Provider} from "react-redux";
import {store} from "./features/store.js";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "@/dev/index.js";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <BrowserRouter>
            <DevSupport ComponentPreviews={ComponentPreviews}
                        useInitialHook={useInitial}
            >
                <App/>
            </DevSupport>
        </BrowserRouter>
    </Provider>
);
