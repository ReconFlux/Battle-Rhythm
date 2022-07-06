import * as moment from "moment";
import { DataItem, DataSet, DataView, Timeline } from "vis-timeline/standalone";
import { formatDateValue, getFieldValue } from "../common";
import { DataSource } from "../ds";
import { ItemDisplayForm } from "../Forms/ItemDisplayForm";
import { IDateRange } from "../app";
import { Components } from "gd-sprest-bs";

/**
 * Timeline
 */
export class TimeLine {
    private _el: HTMLElement = null;
    private _filter: string = null;
    private _groups: Array<any> = null;
    private _items: Array<any> = null;
    private _options: any = null;
    private _view: DataView = null;
    private _isHidden: Boolean = false;
    private _elDisplayForm: HTMLElement = null;

    // Timeline
    private _timeline = null;
    get Timeline() { return this._timeline; }
    get isHidden() { return this._isHidden; }


    // Constructor
    constructor(el: HTMLElement) {
        // Save the properties
        this._el = document.createElement("div");
        this._el.id = "timeline";
        el.appendChild(this._el);

        // Timeline Props
        this._items = [];

        // Load the events and groups
        this.loadEvents();

        // Render the timeline
        this.render();
        loadTabColors();

        // Hide the timeline by default
        this.hide();
    }

    // Filters the timeline
    filter(value: string) {
        // Set the filter
        this._filter = value;

        // Refresh the timeline
        this._view ? this._view.refresh() : null;
    }

    // Filters the timeline data
    private filterEvents(row) {
        // See if a filter is defined
        if (this._filter) {
            // See if the category matches
            if (row.item.Category != this._filter) { return false; }
        }

        // Don't filter out the item
        return true;
    }

    // Hides the timeline
    hide() {
        // Hides the element
        this._el.classList.add("d-none");
        this._isHidden = false;
    }

    // Loads the groups
    private loadGroups() {
        let groups: any[] = null;

        let groupNames = {};
        let grOrder = 1;
        // Clear the groups
        groups = [];

        // Parse the visible items
        let items = this._view.get();
        for (let i = 0; i < items.length; i++) {
            let item = items[i];

            // Save the group name
            if (item.group) { groupNames[item.group] = true; }
        }


        // Parse the group names
        for (let groupName in groupNames) {
            // set the group style for calendar events
            switch (groupName) {
                case "Readiness":
                    grOrder = 1;
                    break;
                case "Processes":
                    grOrder = 2;
                    break;
                case "Community":
                    grOrder = 3;
                    break;
            }

            // Ensure the group exists
            if (groupName)
                // Add the group
                groups.push({
                    id: groupName,
                    className: groupName,
                    content: groupName,
                    order: grOrder
                });
        }

        // Update the groups
        groups = groups.length > 0 ? groups : null;

        // Return the groups
        return groups;
    }

    // Loads the events
    private loadEvents() {
        this._groups = [];
        this._items = [];

        // See if items exist and we are not in a workspace
        if (DataSource.Items) {
            let cfg = DataSource.Configuration ? DataSource.Configuration : null;
            let Events = [];


            // Parse the items
            for (let i = 0; i < DataSource.Items.length; i++) {
                let item = DataSource.Items[i];

                // Validate the dates
                let startDate = getFieldValue((cfg && cfg.BREvents ? cfg.BREvents.startField : "") || "StartDate", item);
                let endDate = getFieldValue((cfg && cfg.BREvents ? cfg.BREvents.endField : "") || "EndDate", item);
                if (endDate && startDate) {
                    // Create the timeline item
                    let timelineItem: DataItem = {
                        item,
                        id: "Event_" + item.Id,
                        className: "Itemclass_" + getFieldValue("LinesOfEffort", item),
                        group: getFieldValue("Priorities", item),
                        content: item.Title,
                        title: item.Title,
                        start: formatDateValue(startDate),
                        end: formatDateValue(endDate)
                    } as any;

                    // Add the timeline item
                    Events.push(timelineItem);
                }
            }

            // Append the Events
            this._items = this._items.concat(Events);


        }
    }

    // Refreshes the timeline
    public refresh() {
        // Clear the Items
        this._items = [];

        // Load the events and groups
        this.loadEvents();

        // See if data exists
        if (this._view && this._items && this._items.length > 0) {
            // Update the view
            this._view.setData(new DataSet(this._items));

            // Update the groups
            this._timeline.setGroups(this.loadGroups());

            // Update Colors
            loadTabColors();
        } else {
            // Render the timeline
            this.render();


        }
    }

    // Shows the timeline
    show() {
        // Show the element
        this._el.classList.remove("d-none");
        this._isHidden = true;

        // Set the Tab Colors
        loadTabColors();
    }

    // Renders the timeline
    private render() {

        // Clear the element
        while (this._el.firstChild) { this._el.removeChild(this._el.firstChild); }
        
        let elCard = document.createElement('div');
        this._el.appendChild(elCard);
        // Ensure items exist
        if (this._items.length > 0) {
            // Create the view
            this._view = new DataView(new DataSet(this._items), { filter: row => { return this.filterEvents(row); } });

            // Initialize the timeline
            this._timeline = new Timeline(this._el, this._view, this.loadGroups(), DataSource.TimelineOptions);

            // Onclick event
            this._timeline.on("click", (props) => {
                let data = null;
                let event = null;
                // check if the event was clicked
                if (props.item) {
                    data = props.item.split("_");
                }
                if (data && data[0] == "Event") {
                    // Parse the events
                    for (let i = 0; i < DataSource.Items.length; i++) {
                        let item = DataSource.Items[i];

                        // See if this is the target item
                        if (item.Id == data[1]) {
                            // Open the Display Form
                            new ItemDisplayForm(this._elDisplayForm, item);
                        }
                    }
                }
            });

            // Update Color on Range Change
            this.Timeline.on("rangechange", () => {
                loadTabColors();
            });
        } else if (this._items.length == 0) {
            Components.Card({
                el: elCard,
                body: [{
                    title: "No Data",
                    text: "No data exists, please create an event."
                }]
            });
        }
    }

    // Updates the date range
    updateDateRange(value: IDateRange) {
        // set the date range for the timeline from navigation bar
        let today = moment();

        // set today's date with the offset
        today.add(-value.OffsetDays, "days");

        // set the Options for zoom 
        this._timeline.setOptions({
            start: value.start,
            end: value.end,
            zoomMin: value.zoomMin
        });

        // reset the view to specified values
        // this._timeline.setWindow(today.valueOf(), today.valueOf() + value.Range);
        this._timeline.setWindow(value.start, value.end);
    }

    // Public color set
    public loadColors() {
        loadTabColors();
    }



}
function loadTabColors() {
    let Settings = DataSource.Settings[0];
    let TAB_CurrentMission = document.querySelectorAll(".Itemclass_Current");
    for (var i = 0; i < TAB_CurrentMission.length; i++) {
        TAB_CurrentMission[i].setAttribute("style", `border-left-color: ${Settings.legend_LOE_Current} !important`);
    }

    let TAB_FutureMission = document.querySelectorAll(".Itemclass_Future");
    for (var i = 0; i < TAB_FutureMission.length; i++) {
        TAB_FutureMission[i].setAttribute("style", `border-left-color: ${Settings.legend_LOE_Future} !important`);
    }

    let TAB_EnableMission = document.querySelectorAll(".Itemclass_Enable");
    for (var i = 0; i < TAB_EnableMission.length; i++) {
        TAB_EnableMission[i].setAttribute("style", `border-left-color: ${Settings.legend_LOE_Enable} !important`);
    }

    let TAB_AirmenCampus = document.querySelectorAll(".Itemclass_Airmen");
    for (var i = 0; i < TAB_AirmenCampus.length; i++) {
        TAB_AirmenCampus[i].setAttribute("style", `border-left-color: ${Settings.legend_LOE_Airmen} !important`);
    }

}