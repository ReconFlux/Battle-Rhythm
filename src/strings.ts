import { ContextInfo } from "gd-sprest-bs";

// Updates the strings for SPFx
export const setContext = (context) => {
    // Set the page context
    ContextInfo.setPageContext(context);

    // Update the values
    Strings.SolutionUrl = ContextInfo.webServerRelativeUrl + "/SiteAssets/sp-BattleRhythm/index.html";
}

// Strings
const Strings = {
    AppElementId: "sp-BattleRhythm",
    DateFormat: "MM/DD/YYYY",
    GlobalVariable: "SPDashboard",

    // TODO - Making the List Settings URL Dynamic
    LineOfEfforts: ContextInfo.webServerRelativeUrl + "/_layouts/15/FldEdit.aspx?List=%7B24613378-6DC2-4604-B24F-992E0DC64A50%7D&Field=LinesOfEffort", // Static URL
    Priorities: ContextInfo.webServerRelativeUrl + "/_layouts/15/FldEdit.aspx?List=%7B24613378-6DC2-4604-B24F-992E0DC64A50%7D&Field=Priorities", // Static URL
    ProjectName: "Battle Rhythm",
    ProjectDescription: "A custom sharepoint application that provides information collaboration for leadership, objectives, and goals into a Dahboard view and timeline.",
    Lists: {
        BREvents: "Events",
        Templates: "Templates",
        Settings: "Settings" // Settings for the Application
    },
    SolutionUrl: ContextInfo.webServerRelativeUrl + "/SiteAssets/sp-BattleRhythm/index.html",
    SupportEmail: "stephenburtrum@burtrumtech.onmicrosoft.com",
    DateTimeFormat: "YYYY-MM-DD  HH:mm",
    Version: "3.8.1",
    WebConfigUrl: ContextInfo.webServerRelativeUrl + "/SiteAssets/sp-BattleRhythm/config.json",

}
export default Strings;