
import { Helper, SPTypes } from "gd-sprest-bs";
import Strings from "./strings";

/**
 * SharePoint Assets
 */
export const Configuration = Helper.SPConfig({
    ListCfg: [
        // Main List
        {
            ListInformation: {
                Title: Strings.Lists.BREvents,
                BaseTemplate: SPTypes.ListTemplateType.GenericList
            },
            ContentTypes: [
                {
                    Name: "Event",
                    FieldRefs: [
                        "AssignedTo", "Objectives", "Status", "LinesOfEffort", "StartDate", "EndDate", "Location", "Description"
                    ]
                }
            ],
            TitleFieldDisplayName: "Event Name",
            CustomFields: [
                {
                    name: "AssignedTo",
                    title: "Assigned To",
                    type: Helper.SPCfgFieldType.User,
                    required: true,
                    selectionMode: SPTypes.FieldUserSelectionType.PeopleOnly,
                } as Helper.IFieldInfoUser,
                {
                    name: "Status",
                    title: "Status",
                    type: Helper.SPCfgFieldType.Choice,
                    choices: [
                        "Not Started",
                        "In Progress",
                        "Needs Attention",
                        "Completed",
                        "Cancelled",
                        "Delayed",
                        "Archived"
                    ]
                } as Helper.IFieldInfoChoice,
                {
                    name: "Objectives",
                    title: "Objectives",
                    type: Helper.SPCfgFieldType.Choice,
                    choices: [
                        "Objective 1",
                        "Objective 2",
                        "Objective 3",
                        "Objective 4",
                        "Objective 5"
                    ]
                } as Helper.IFieldInfoChoice,
                {
                    name: "LinesOfEffort",
                    title: "LinesOfEffort",
                    type: Helper.SPCfgFieldType.Choice,
                    choices: ["LOE A", "LOE B", "LOE C", "LOE D"]
                } as Helper.IFieldInfoChoice,
                // Start Date
                {
                    name: "StartDate",
                    title: "Start Date",
                    displayFormat: SPTypes.DateFormat.DateTime,
                    format: SPTypes.DateFormat.DateTime,
                    type: Helper.SPCfgFieldType.Date
                } as Helper.IFieldInfoDate,
                // End Date
                {
                    name: "EndDate",
                    title: "End Date",
                    displayFormat: SPTypes.DateFormat.DateTime,
                    format: SPTypes.DateFormat.DateTime,
                    type: Helper.SPCfgFieldType.Date
                } as Helper.IFieldInfoDate,
                // Location
                {
                    name: "Location",
                    title: "Location",
                    type: Helper.SPCfgFieldType.Text,
                    maxLength: 255,
                    required: true,
                    noteType: SPTypes.FieldNoteType.TextOnly
                } as Helper.IFieldInfoText,
                {
                    name: "Description",
                    title: "Description",
                    type: Helper.SPCfgFieldType.Note,
                    noteType: SPTypes.FieldNoteType.TextOnly
                } as Helper.IFieldInfoNote,
                {
                    name: "Members",
                    title: "Members",
                    type: Helper.SPCfgFieldType.User,
                    selectionMode: SPTypes.FieldUserSelectionType.PeopleOnly,
                    multi: true
                } as Helper.IFieldInfoUser,


            ],
            ViewInformation: [
                {
                    ViewName: "All Events",
                    ViewFields: [
                        "AssignedTo", "Status", "LinesOfEffort", "StartDate", "EndDate", "Location", "BLUF", "Members", "Objectives"
                    ]
                }
            ]
        },
        // Templates Library
        {
            ListInformation: {
                Title: Strings.Lists.Templates,
                BaseTemplate: SPTypes.ListTemplateType.DocumentLibrary
            }
        },
        // Settings List
        {
            ListInformation: {
                Title: Strings.Lists.Settings,
                BaseTemplate: SPTypes.ListTemplateType.GenericList
            },
            ContentTypes: [
                {
                    Name: "Settings",
                    FieldRefs: [
                        "NavTitle", "NavColor", "SubNavTitle", "SubNavTitleTL", "legendHeader", "legend_LOE_Current", "legend_LOE_Future", "legend_LOE_Enable", "legend_LOE_Airmen"
                    ]
                }
            ],
            CustomFields: [
                {
                    name: "NavTitle",
                    title: "Navigation Title",
                    type: Helper.SPCfgFieldType.Text,
                    required: true,
                    selectionMode: SPTypes.FieldType.Text,
                    defaultValue: "509th Strategic Engagement Toolset"
                } as Helper.IFieldInfoText,
                {
                    name: "NavColor",
                    title: "Navigation Color",
                    type: Helper.SPCfgFieldType.Text,
                    required: true,
                    selectionMode: SPTypes.FieldType.Text,
                    defaultValue: "black !important"
                } as Helper.IFieldInfoText,
                {
                    name: "SubNavTitle",
                    title: "Sub Navigation Title",
                    type: Helper.SPCfgFieldType.Text,
                    required: true,
                    selectionMode: SPTypes.FieldType.Text,
                    defaultValue: "Dashboard"
                } as Helper.IFieldInfoText,
                {
                    name: "SubNavTitleTL",
                    title: "TL - Sub Navigation Title",
                    type: Helper.SPCfgFieldType.Text,
                    required: true,
                    selectionMode: SPTypes.FieldType.Text,
                    defaultValue: "Timeline"
                } as Helper.IFieldInfoText,
                {
                    name: "legendHeader",
                    title: "Legend Header Title",
                    type: Helper.SPCfgFieldType.Text,
                    required: true,
                    selectionMode: SPTypes.FieldType.Text,
                    defaultValue: "Line of Effort"
                } as Helper.IFieldInfoText,
                {
                    name: "legend_LOE_Current",
                    title: "legend_LOE_Current",
                    type: Helper.SPCfgFieldType.Text,
                    required: true,
                    selectionMode: SPTypes.FieldType.Text,
                    defaultValue: "Red"
                } as Helper.IFieldInfoText,
                {
                    name: "legend_LOE_Future",
                    title: "legend_LOE_Future",
                    type: Helper.SPCfgFieldType.Text,
                    required: true,
                    selectionMode: SPTypes.FieldType.Text,
                    defaultValue: "Blue"
                } as Helper.IFieldInfoText,
                {
                    name: "legend_LOE_Enable",
                    title: "legend_LOE_Enable",
                    type: Helper.SPCfgFieldType.Text,
                    required: true,
                    selectionMode: SPTypes.FieldType.Text,
                    defaultValue: "Green"
                } as Helper.IFieldInfoText,
                {
                    name: "legend_LOE_Airmen",
                    title: "legend_LOE_Airmen",
                    type: Helper.SPCfgFieldType.Text,
                    required: true,
                    selectionMode: SPTypes.FieldType.Text,
                    defaultValue: "Purple"
                } as Helper.IFieldInfoText,
            ],
            ViewInformation: [
                {
                    ViewName: "All Items",
                    ViewFields: [
                        "NavTitle", "NavColor", "SubNavTitle", "SubNavTitleTL", "legendHeader", "legend_LOE_Current", "legend_LOE_Future", "legend_LOE_Enable", "legend_LOE_Airmen"
                    ]
                }
            ]
        }
    ]
});

// Adds the solution to a classic page
Configuration["addToPage"] = (pageUrl: string) => {
    // Add a content editor webpart to the page
    Helper.addContentEditorWebPart(pageUrl, {
        contentLink: Strings.SolutionUrl,
        description: Strings.ProjectDescription,
        frameType: "None",
        title: Strings.ProjectName
    }).then(
        // Success
        () => {
            // Load
            console.log("[" + Strings.ProjectName + "] Successfully added the solution to the page.", pageUrl);
        },

        // Error
        ex => {
            // Load
            console.log("[" + Strings.ProjectName + "] Error adding the solution to the page.", ex);
        }
    );
}