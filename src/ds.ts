import { Dashboard } from "dattatable";
import { Components, List, Types, Web } from "gd-sprest-bs";
import Strings from "./strings";
import * as moment from "moment";
import { formatDateValue } from "./common";


// Item
export interface IItem extends Types.SP.ListItem {
    Priorities: string;
    Status: string;
    LinesOfEffort: string;
    BLUF: string;
    Title: string;
    StartDate: string;
    EndDate: string;
    Location: string;
    AssignedTo: { Id: number; Title: string; }
    Members: {
        results: {
            Id: number;
            Title: string;
        }[]
    };
}

// Settings Item Interface
export interface ISetting extends Types.SP.ListItem {
    NavTitle: string;
    NavColor: string;
    SubNavTitle: string;
    SubNavTitleTL: string;
    legendHeader: string;
    legend_LOE_Current: string;
    legend_LOE_Future: string;
    legend_LOE_Enable: string;
    legend_LOE_Airmen: string;
}

// Configuration
export interface IConfiguration {
    BREvents: {
        startField: string;
        endField: string;
        groupField: string;
        subGroupField: string;
    };
    task: {
        startField: string;
        endField: string;
    };
    options: any;
    templatesDocLibrary: string;
    supportEmail: string;
    HeaderBKG: string;
    LOEcolors: {
        currentmission: string,
        futuremission: string,
        enablemissionpartnersuccess: string,
        airmenandcampus: string
    };
    customization: {
        Navigation_Color: string,
        Navigation_Title: string,
    };
    settingslink: {
        LOEs: string;
        Priorities: string;
    }

}



/**
 * Data Source
 */
export class DataSource {

    // Initializes the application
    static init(): PromiseLike<void> {
        // Return a promise
        return new Promise((resolve, reject) => {
            // Load the data
            this.load().then(() => {
                // Load the Settings
                this.loadSettings().then(() => {
                    // Load the Configuration
                    this.loadConfiguration().then(() => {
                        // Load the status filters
                        this.loadTemplateFiles().then(() => {
                            // Load the status filters
                            this.loadStatusFilters().then(() => {
                                // Load the priority filters
                                this.loadPriorityFilters().then(() => {
                                    // Load the LOE Filters
                                    this.LoadLOEFilters().then(() => {
                                        // Resolve the request
                                        resolve();
                                    }, reject);
                                }, reject);
                            }, reject);
                        }, reject);
                    }, reject);
                }, reject);
            }, reject);
        });
    }



    // Loads the list data
    private static _items: IItem[] = null;
    static get Items(): IItem[] { return this._items; }
    static load(): PromiseLike<IItem[]> {
        // Return a promise
        return new Promise((resolve, reject) => {
            // Load the data
            List(Strings.Lists.BREvents).Items().query({

                GetAllItems: true,
                Expand: ["AssignedTo", "Members"],
                OrderBy: ["Title"],
                Select: ["*", "AssignedTo/Id", "AssignedTo/Title", "Members/Id", "Members/Title"],
                Top: 5000
            }).execute(
                // Success
                items => {
                    // Set the items
                    this._items = items.results as any;

                    // Resolve the request
                    resolve(this._items);
                },
                // Error
                () => { reject(); }
            );
        });
    }

    // Loads the Settings List Data
    private static _Settings: ISetting[] = null;
    static get Settings(): ISetting[] { return this._Settings; }
    static loadSettings(): PromiseLike<ISetting[]> {
        // Return Promise
        return new Promise((resolve, reject) => {
            // Load Data
            List(Strings.Lists.Settings).Items().query({

                GetAllItems: true,
                Top: 5000,
                Select: ["*"]

            }).execute(
                // Success
                items => {
                    // Set the Items
                    this._Settings = items.results as any;

                    // Resolve request
                    resolve(this._Settings);
                },
                // Error
                () => { reject(); }
            );
        });
    }

    // Templates Files 
    private static _files: Types.SP.File[];
    static get Files(): Types.SP.File[] { return this._files; }
    private static _folders: Types.SP.FolderOData[];
    static get Folders(): Types.SP.FolderOData[] { return this._folders; }
    static loadTemplateFiles(): PromiseLike<void> {
        // Return a promise
        return new Promise((resolve, reject) => {
            // Load the library
            List(Strings.Lists.Templates).RootFolder().query({
                Expand: [
                    "Folders", "Folders/Files", "Folders/Files/Author", "Folders/Files/ListItemAllFields", "Folders/Files/ModifiedBy",
                    "Files", "Files/Author", "Files/ListItemAllFields", "Files/ModifiedBy"
                ]
            }).execute(folder => {
                // Set the folders and files
                this._files = folder.Files.results;
                this._folders = [];
                for (let i = 0; i < folder.Folders.results.length; i++) {
                    let subFolder = folder.Folders.results[i];
                    // Ignore the OTB Forms internal folder  
                    if (subFolder.Name != "Forms") { this._folders.push(subFolder as any); }
                }

                // Resolve the request
                resolve();
            }, reject);
        });
    }

    // Gets the item id from the query string
    static getItemIdFromQS() {
        // Get the id from the querystring
        let qs = document.location.search.split('?');
        qs = qs.length > 1 ? qs[1].split('&') : [];
        for (let i = 0; i < qs.length; i++) {
            let qsItem = qs[i].split('=');
            let key = qsItem[0];
            let value = qsItem[1];

            // See if this is the "id" key
            if (key == "ID") {
                // Return the item
                return parseInt(value);
            }
        }
    }

    // Configuration
    private static _cfg: IConfiguration = null;
    static get Configuration(): IConfiguration { return this._cfg; }
    static loadConfiguration(): PromiseLike<void> {
        // Return a promise
        return new Promise(resolve => {
            // Get the current web
            Web().getFileByServerRelativeUrl(Strings.WebConfigUrl).content().execute(
                // Success
                file => {
                    // Convert the string to a json object
                    let cfg = null;
                    try { cfg = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(file))); }
                    catch { cfg = {}; }

                    // Set the configuration
                    this._cfg = cfg;

                    // Resolve the request
                    resolve();
                },

                // Error
                () => {
                    // Set the configuration to nothing
                    this._cfg = {} as any;

                    // Resolve the request
                    resolve();
                }
            );
        });
    }

    // Timeline Options
    static get TimelineOptions() {
        let options = (this.Configuration ? this.Configuration.options : null) || {};
        options.tooltip = options.tooltip || {};
        options.tooltip.template = (originalItemData, parsedItemData) => {
            let item = null;
            item = originalItemData.item;
            if (item) {
                return `<span>${"LOE: " + item.LinesOfEffort}<br/> ${"BR Event: " + item.Title}<br/> ${"Start Date: " + formatDateValue(item.EventDate ? item.EventDate : item.StartDate)}<br/> ${"End Date: " + formatDateValue(item.EndDate ? item.EndDate : item.DueDate)}<br/> ${"Status: " + item.Status}<br/></span>`;
            }
            return originalItemData.title;
        }
        // set options for start and end dates
        let today = moment();
        options.start = options.start || {};
        // options.start = moment(today.add(-1, "month")).format('YYYY/MM/DD');
        options.start = moment().startOf('month').format('YYYY/MM/DD');
        options.end = options.end || {};
        // options.end = moment(today.add(2, "month")).format('YYYY/MM/DD');
        options.end = moment().endOf('month').format('YYYY/MM/DD');
        options.zoomable = false;
        options.orientation = "top";
        options.maxHeight = 900;
        options.zoomMin = 1000 * 60 * 60 * 24; // one day in milliseconds

        // Return the options
        return options;
    }

    private static _dashboard: Dashboard = null;
    static get Dashboard(): Dashboard { return this._dashboard; }
    static setDashBoard(dashboard: Dashboard) {
        this._dashboard = dashboard;
    }
    static refreshDashboard() {
        if (this._dashboard != null) {
            this.load().then((items) => {
                this._dashboard.refresh(items);
            });
        }
    }

    // Status Filters
    private static _statusFilters: Components.ICheckboxGroupItem[] = null;
    static get statusFilters(): Components.ICheckboxGroupItem[] { return this._statusFilters; }
    static loadStatusFilters(): PromiseLike<Components.ICheckboxGroupItem[]> {
        // Return a promise
        return new Promise((resolve, reject) => {
            // Get the status field
            List(Strings.Lists.BREvents).Fields("Status").execute((fld: Types.SP.FieldChoice) => {
                let items: Components.ICheckboxGroupItem[] = [];

                // Parse the choices
                for (let i = 0; i < fld.Choices.results.length; i++) {
                    // Add an item
                    items.push({
                        label: fld.Choices.results[i],
                        type: Components.CheckboxGroupTypes.Switch,
                        isSelected: false
                    });
                }

                // Set the filters and resolve the promise
                this._statusFilters = items;
                resolve(items);
            }, reject);
        });
    }

    // Priorities Filters
    private static _priorityFilters: Components.ICheckboxGroupItem[] = null;
    static get priorityFilters(): Components.ICheckboxGroupItem[] { return this._priorityFilters; }
    static loadPriorityFilters(): PromiseLike<Components.ICheckboxGroupItem[]> {
        // Return a promise
        return new Promise((resolve, reject) => {
            // Get the status field
            List(Strings.Lists.BREvents).Fields("Priorities").execute((fld: Types.SP.FieldChoice) => {
                let items: Components.ICheckboxGroupItem[] = [];

                // Parse the choices
                for (let i = 0; i < fld.Choices.results.length; i++) {
                    // Add an item
                    items.push({
                        label: fld.Choices.results[i],
                        type: Components.CheckboxGroupTypes.Switch,
                        isSelected: true
                    });
                }

                // Set the filters and resolve the promise
                this._priorityFilters = items;
                resolve(items);
            }, reject);
        });
    }

    // LOE Filters
    private static _LOEFilters: Components.ICheckboxGroupItem[] = null;
    static get LOEFilters(): Components.ICheckboxGroupItem[] { return this._LOEFilters; }
    static LoadLOEFilters(): PromiseLike<Components.ICheckboxGroupItem[]> {
        // Return a promise
        return new Promise((resolve, reject) => {
            // Get the status field
            List(Strings.Lists.BREvents).Fields("LinesOfEffort").execute((fld: Types.SP.FieldChoice) => {
                let items: Components.ICheckboxGroupItem[] = [];

                // Parse the choices
                for (let i = 0; i < fld.Choices.results.length; i++) {
                    // Add an item
                    items.push({
                        label: fld.Choices.results[i],
                        type: Components.CheckboxGroupTypes.Switch,
                        isSelected: true
                    });
                }

                // Set the filters and resolve the promise
                this._LOEFilters = items;
                resolve(items);
            }, reject);
        });
    }
}
