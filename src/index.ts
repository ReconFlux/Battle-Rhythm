import { ContextInfo } from "gd-sprest-bs";
import { App } from "./app";
import { Configuration } from "./cfg";
import { DataSource } from "./ds";
import Strings, { setContext } from "./strings";
import { InstallationRequired } from "dattatable";

// Styling
import "./styles.scss";


// Create the global variable for this solution
const GlobalVariable = {
    Configuration,
    render: (el: HTMLElement, context?) => {
        // See if the page context exists
        if (context) {
            // Set the context
            setContext(context);
        }

        // Initialize the solution
        DataSource.init().then(
            // Success
            () => {
                // Create the application
                //alert('Version: ' + Strings.Version); // Dev Test Only
                new App(el);
            },
            // Error
            () => {
                // See if an install is required
                InstallationRequired.requiresInstall(Configuration).then(installFl => {
                    // See if an installation is required
                    if (installFl) {
                        // Show the installation dialog
                        InstallationRequired.showDialog();
                    } else {
                        // Log
                        console.error("[" + Strings.ProjectName + "] Error initializing the solution.");
                    }
                });
            }
        );
    }
};

// Update the DOM
window[Strings.GlobalVariable] = GlobalVariable;

// Get the element and render the app if it is found
let elApp = document.querySelector("#" + Strings.AppElementId) as HTMLElement;
if (elApp) {
    // Render the application
    GlobalVariable.render(elApp);
}