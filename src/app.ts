import { Dashboard, ItemForm } from "dattatable";
import { Components, Helper } from "gd-sprest-bs";
import * as jQuery from "jquery";
import * as moment from "moment";
import { pencilSquare } from "gd-sprest-bs/build/icons/svgs/pencilSquare";
import { calendar2RangeFill } from "gd-sprest-bs/build/icons/svgs/calendar2RangeFill";
import { calendarDay } from "gd-sprest-bs/build/icons/svgs/calendarDay";
import { calendarWeek } from "gd-sprest-bs/build/icons/svgs/calendarWeek";
import { calendarMonth } from "gd-sprest-bs/build/icons/svgs/calendarMonth";
import { calendar3 } from "gd-sprest-bs/build/icons/svgs/calendar3";
import { calendarPlus } from "gd-sprest-bs/build/icons/svgs/calendarPlus";
import { cardList } from "gd-sprest-bs/build/icons/svgs/cardList";
import { DataSource, IItem, ISetting } from "./ds";
import Strings from "./strings";
import { TimeLine } from "./Timeline/timeline";
//import { Icons } from "./icons";
import { folderFill } from "gd-sprest-bs/build/icons/svgs/folderFill";
import { windowFullscreen } from "gd-sprest-bs/build/icons/svgs/windowFullscreen";
import { DocModal } from "./Forms/DocsModal";
import { templateModal } from "./Forms/templatefolderModal";
import { Legend } from "./Forms/legend";
import { fileEarmarkPlusFill } from "gd-sprest-bs/build/icons/svgs/fileEarmarkPlusFill";
import { gearWideConnected } from "gd-sprest-bs/build/icons/svgs/gearWideConnected";
import { envelope } from "gd-sprest-bs/build/icons/svgs/envelope";
import { palette } from "gd-sprest-bs/build/icons/svgs/palette";
import { wrenchAdjustable } from "gd-sprest-bs/build/icons/svgs/wrenchAdjustable";
import { questionSquare } from "gd-sprest-bs/build/icons/svgs/questionSquare";
import { infoSquare } from "gd-sprest-bs/build/icons/svgs/infoSquare";
import { NavBarSettings } from "./Forms/Customization/NavBar";
import { SubNavBarSettings } from "./Forms/Customization/SubNav";
import { CustomLegend } from "./Forms/Customization/Legend";
import { aboutMe } from "./Forms/about";


// Date Range Interface
export interface IDateRange {
    OffsetDays: number;
    start: string;
    end: string;
    zoomMin: number;
}

/*
 * Timeline View Data
 */
let today = moment();
const TL_DY_1: IDateRange = {
    OffsetDays: 0,
    start: moment().startOf('day').format('YYYY/MM/DD'),
    end: moment().endOf('week').format('YYYY/MM/DD'),
    zoomMin: 1000 * 60 * 60 * 24, // one day in milliseconds
}
const TL_WK_1: IDateRange = {
    OffsetDays: 0,
    start: moment().startOf('week').format('YYYY/MM/DD'),
    end: moment().endOf('week').format('YYYY/MM/DD'),
    zoomMin: 1000 * 60 * 60 * 24, // one day in milliseconds
}
const TL_MO_1: IDateRange = {
    OffsetDays: 0,
    start: moment().startOf('month').format('YYYY/MM/DD'),
    end: moment().endOf('month').format('YYYY/MM/DD'),
    zoomMin: 1000 * 60 * 60 * 24, // one day in milliseconds
}
const TL_MO_3: IDateRange = {
    OffsetDays: 0,
    start: moment(today.add(-1, "month")).format('YYYY/MM/DD'),
    end: moment(today.add(2, "month")).format('YYYY/MM/DD'),
    zoomMin: 1000 * 60 * 60 * 24, // one day in milliseconds
}
const TL_MO_6: IDateRange = {
    OffsetDays: 0,
    start: moment(today.add(-4, "month")).format('YYYY/MM/DD'),
    end: moment(today.add(6, "month")).format('YYYY/MM/DD'),
    zoomMin: 1000 * 60 * 60 * 24, // one day in milliseconds
}

/**
 * Main Application
 */

export class App {

    private _dashboard: Dashboard = null;
    private _elTable: HTMLElement = null;
    private _timeline: TimeLine = null;
    private _showTLNav: boolean = false;
    private _elNavButton: HTMLAnchorElement = null;
    private _item: IItem = null;
    private _Settings: ISetting;



    // Constructor
    constructor(el: HTMLElement) {
        // Set the list name
        ItemForm.ListName = Strings.Lists.BREvents;
        // Set the Settings
        //this._Settings = DataSource.Settings;

        // Render the dashboard
        this.render(el);
        new Legend(el);
    }



    // Generates the Sub nav items
    private generateNavItems(): Array<Components.INavbarItem> {
        let navItems: Array<Components.INavbarItem> = [];

        // Add the item
        navItems.push({
            // Legend
            text: "Legend",
            isButton: true,
            iconSize: 18,
            iconType: cardList,
            iconClassName: "me-2",
            className: "btn-outline-dark me-3 legend_btn d-none btn-sm",
            onClick: () => {

                let legend = document.querySelector(".Legend_Toast");
                if (legend.classList.contains("hide")) {

                    // update class
                    legend.classList.remove("d-none")
                    legend.classList.remove("hide");
                    legend.classList.add("show");
                    legend.setAttribute("style", "top: 230px; left: 489px;");
                } else {

                    // hide it

                    legend.classList.remove("show");
                    legend.classList.add("hide");
                    legend.classList.add("d-none");

                    legend.setAttribute("style", "top: 230px; left: 489px;");
                }

            },
            onMenuRendering: props => {
                // Update the offset
                props.options.offset = [7, -9];

                // Return the properties
                return props;
            }
        });

        // Return the items
        return navItems;
    }

    // Generates the Sub nav items
    private generateNavEndItems(): Array<Components.INavbarItem> {
        let navItems: Array<Components.INavbarItem> = [];

        // Add the zoom buttons
        navItems.push(
            //Zoom Levels.
            {
                text: "Daily",
                isButton: true,
                className: "btn-outline-dark m-2 me-0 btn-filter d-none btn-sm",
                iconSize: 18,
                iconType: calendarDay,
                iconClassName: "me-2",
                onClick: (item, ev) => {
                    // Set this item as active
                    this.setActiveElement((ev.currentTarget as HTMLElement).querySelector(".btn-filter"));

                    // Call the event
                    this._timeline.updateDateRange(TL_DY_1);

                    // Set the colors in time delay
                    // setTimeout(() => {
                    //     this._timeline.refresh();
                    // }, 50);

                    this._timeline.loadColors();
                }
            },
            {
                text: "Weekly",
                isButton: true,
                className: "btn-outline-dark m-2 me-0 btn-filter d-none btn-sm",
                iconSize: 18,
                iconType: calendarWeek,
                iconClassName: "me-2",
                onClick: (item, ev) => {
                    // Set this item as active
                    this.setActiveElement((ev.currentTarget as HTMLElement).querySelector(".btn-filter"));

                    // Call the event
                    this._timeline.updateDateRange(TL_WK_1);

                    // Set the colors in time delay
                    setTimeout(() => {
                        this._timeline.refresh();
                    }, 50);
                }
            },
            {
                text: "Monthly",
                isButton: true,
                className: "btn-outline-dark m-2 me-0 btn-filter d-none btn-sm active",
                iconSize: 18,
                iconType: calendarMonth,
                iconClassName: "me-2",
                onClick: (item, ev) => {
                    // Set this item as active
                    this.setActiveElement((ev.currentTarget as HTMLElement).querySelector(".btn-filter"));

                    // Call the event
                    this._timeline.updateDateRange(TL_MO_1);
                    // Set the colors in time delay
                    setTimeout(() => {
                        this._timeline.refresh();
                    }, 50);
                }
            },
            {
                text: "3 Month",
                isButton: true,
                className: "btn-outline-dark m-2 me-0 btn-filter d-none btn-sm",
                iconSize: 18,
                iconType: calendar3,
                iconClassName: "me-2",
                onClick: (item, ev) => {
                    // Set this item as active
                    this.setActiveElement((ev.currentTarget as HTMLElement).querySelector(".btn-filter"));

                    // Call the event
                    this._timeline.updateDateRange(TL_MO_3);

                    // Set the colors in time delay
                    setTimeout(() => {
                        this._timeline.refresh();
                    }, 50);
                }
            },
            {
                text: "6 Month",
                isButton: true,
                className: "btn-outline-dark m-2 me-0 btn-filter d-none btn-sm",
                iconSize: 18,
                iconType: calendarPlus,
                iconClassName: "me-2",
                onClick: (item, ev) => {
                    // Set this item as active
                    this.setActiveElement((ev.currentTarget as HTMLElement).querySelector(".btn-filter"));

                    // Call the event
                    this._timeline.updateDateRange(TL_MO_6);

                    // Set the colors in time delay
                    setTimeout(() => {
                        this._timeline.refresh();
                    }, 50);
                }
            }

        );

        // Return the items
        return navItems;
    }

    // Refreshes the dashboard
    private refresh() {
        // Refresh the data
        DataSource.load().then(items => {
            // Update the dashboard and timeline
            this._dashboard.refresh(items);
            this._timeline.refresh();

        });
    }

    // Renders the dashboard
    private render(el: HTMLElement) {
        let NavTitle = DataSource.Settings[0];
        let NavColor = DataSource.Settings[0];
        let SubNavTitle = DataSource.Settings[0];
        // Create the dashboard
        this._dashboard = new Dashboard({
            el,
            hideHeader: true,
            useModal: true,
            filters: {
                items: [{
                    header: "By Category",
                    items: DataSource.LOEFilters,
                    onFilter: (value: string) => {
                        // Filter the table and timeline
                        this._dashboard.filter(3, value);
                        this._timeline.filter(value);
                    }
                }]
            },
            navigation: {
                title: NavTitle.NavTitle,
                onRendered: (el) => {
                    // Update classes for the navBar container
                    let navEl = el.firstChild as HTMLElement;
                    navEl.classList.remove("bg-primary");
                    navEl.classList.remove("rounded");
                    navEl.classList.remove("rounded-bottom");
                    navEl.classList.add("rounded-top");
                    navEl.id = "DashboardNav";
                    navEl.setAttribute("style", `background-color: ${NavColor.NavColor} !important`);
                    navEl.firstElementChild.classList.add("ps-2");
                    navEl.firstElementChild.classList.add("pe-1");

                    // Add a logo to the navbar brand
                    let navBrand = navEl.querySelector(".navbar-brand") as HTMLAnchorElement;
                    navBrand.classList.add("d-flex");
                    navBrand.classList.add("me-2");
                    let brandText = navBrand.innerText;
                    let div = document.createElement("div");
                    div.classList.add("me-2");
                    //div.appendChild(Icons.B2Logo(48, 78)); // Need to make this customizable
                    navBrand.innerHTML = div.outerHTML;
                    navBrand.append(brandText);
                    this._elNavButton = el.querySelector(".nav-timeline-btn");
                },
                items: [
                    // New Item
                    {
                        className: "btn-outline-light btn-sm",
                        iconClassName: "me-2",
                        text: "New Event",
                        isButton: true,
                        iconType: fileEarmarkPlusFill,
                        iconSize: 18,
                        onClick: () => {
                            ItemForm.ListName = Strings.Lists.BREvents;
                            // Create an item
                            ItemForm.create({

                                // Custom Header
                                onSetHeader: (el) => {
                                    el.innerText = "Create New Event"
                                },
                                onUpdate: () => {
                                    // Initialize the application
                                    DataSource.init().then(() => {
                                        // Render Nav
                                        this.refresh();
                                    });
                                }
                            });
                        }
                    },
                    // Dashboard/Timeline Switch
                    {
                        onRender: (item) => {
                            item.id = "timelineButton";
                        },
                        className: "btn-outline-light nav-timeline-btn ms-2 btn-sm timeline",
                        text: "Timeline",
                        isButton: true,
                        iconClassName: "me-2",
                        iconSize: 18,
                        iconType: calendar2RangeFill,
                        onClick: (item, ev) => {
                            let icon = this._elNavButton.firstChild as SVGElement;
                            let filtericon = document.querySelector(".filter-icon");
                            // Get the search element
                            let elSearch = document.querySelector(".navbar input[type='search']") as HTMLInputElement;
                            if (this._elNavButton.classList.contains("timeline")) {


                                // Show the timeline
                                this._elTable.classList.add("d-none");
                                this._timeline.show();

                                filtericon.classList.add("d-none");

                                // Disable the search element
                                elSearch.disabled = true;


                                // Change the subnav
                                this.subnavSwitch(ev);
                                this.showTLButtons(ev);
                                this.showZoomButtons(ev);

                                // Refesh Timeline
                                this._timeline.refresh();


                                // Clear the button icon
                                while (this._elNavButton.firstChild) { this._elNavButton.removeChild(this._elNavButton.firstChild); }

                                // Render the dashboard icon
                                this._elNavButton.appendChild(windowFullscreen(18, 18));
                                icon.classList.add("me-3");




                                // Change Button Text
                                this._elNavButton.append("Dashboard");

                                // Change Button Class
                                this._elNavButton.classList.remove("timeline");
                                this._elNavButton.classList.add("dashboard");

                            } else if (this._elNavButton.classList.contains("dashboard")) {

                                // Enable the search element
                                elSearch.disabled = false;

                                filtericon.classList.remove("d-none");

                                // Clear the button icon
                                while (this._elNavButton.firstChild) { this._elNavButton.removeChild(this._elNavButton.firstChild); }

                                // Render the dashboard icon
                                this._elNavButton.appendChild(calendar2RangeFill(18, 18));
                                icon.classList.add("me-3");

                                // Change Button Text
                                this._elNavButton.append("Timeline");

                                // Change Button Class
                                this._elNavButton.classList.remove("dashboard");
                                this._elNavButton.classList.add("timeline");

                                // Show the dashboard
                                this._timeline.hide();
                                this.subnavSwitch(ev);
                                this._elTable.classList.remove("d-none");
                                this.showTLButtons(ev);
                                this.showZoomButtons(ev);
                            }
                            // Check if legend is displaying
                            let legend = el.querySelector(".Legend_Toast") as HTMLElement;
                            if (legend.classList.contains("show")) {
                                legend.classList.remove("show");
                                legend.classList.add("hide");
                            }
                        }

                    }
                ],
                itemsEnd: [
                    {
                        text: "Templates",
                        className: "btn-outline-light me-3 templates_btn btn-sm",
                        iconClassName: "me-2",
                        iconSize: 18,
                        iconType: folderFill,
                        isButton: true,
                        onClick: (el: HTMLElement) => {
                            // Open the Templates table
                            new templateModal(el);
                        }
                    },
                    {
                        text: "Settings",
                        className: "btn-outline-light me-3 btn-sm",
                        iconSize: 18,
                        iconClassName: "me-2",
                        iconType: gearWideConnected,
                        isButton: true,
                        items: [
                            {
                                text: "Application Customization",
                                isHeader: true
                            },

                            {
                                text: "Navigation Bar",

                                iconSize: 18,
                                iconClassName: "me-3",
                                iconType: palette,
                                onClick: () => {
                                    new NavBarSettings.edit(1, () => {
                                        location.reload();
                                    });
                                }
                            },
                            {
                                text: "Sub-Navigation Bar",
                                iconSize: 18,
                                iconType: palette,
                                iconClassName: "me-3",
                                onClick: () => {
                                    new SubNavBarSettings.edit(1, () => {
                                        location.reload();
                                    });
                                }
                            },
                            // MAYBE - Need to research to even see if its a good idea to change the Column titles.
                            // {
                            //     text: "Dashboard",
                            //     iconSize: 18,
                            //     iconType: palette,
                            //     onClick: () => {

                            //     }
                            // },
                            {
                                text: "Legend",
                                iconSize: 18,
                                iconType: palette,
                                iconClassName: "me-3",
                                onClick: () => {
                                    new CustomLegend.edit(1, () => {
                                        location.reload();
                                    });
                                }
                            },
                            {
                                isDivider: true,
                            },
                            {
                                text: "Application Configuration",
                                isHeader: true
                            },
                            {
                                text: "Line of Efforts",
                                iconSize: 18,
                                iconClassName: "me-3",
                                iconType: wrenchAdjustable,
                                onClick: () => {
                                    // Display in a modal
                                    Helper.SP.ModalDialog.showModalDialog({
                                        allowMaximize: false,
                                        showMaximized: true,
                                        url: Strings.LineOfEfforts
                                    });
                                }
                            },
                            {
                                text: "Priorities",
                                iconSize: 18,
                                iconClassName: "me-3",
                                iconType: wrenchAdjustable,
                                onClick: () => {
                                    // Display in a modal
                                    Helper.SP.ModalDialog.showModalDialog({
                                        allowMaximize: false,
                                        showMaximized: true,
                                        url: Strings.Priorities
                                    });
                                }
                            },
                        ]
                    },
                    {
                        text: "Help",
                        className: "btn-outline-light me-3 btn-sm",
                        iconClassName: "me-2",
                        iconSize: 18,
                        isButton: true,
                        iconType: questionSquare,
                        items: [
                            {
                                text: "About",
                                iconSize: 18,
                                iconClassName: "me-3",
                                iconType: infoSquare,
                                onClick: (el: HTMLElement) => {
                                    new aboutMe(el);
                                }
                            },
                            {
                                isDivider: true
                            },
                            {
                                text: "Contact Support",
                                iconSize: 18,
                                iconClassName: "me-3",
                                iconType: envelope,
                            },
                        ]

                    }
                ],
            },
            subNavigation: {
                onRendered: props => {
                    // Set the ID for the subnav
                    props.id = "SubNav";
                },
                title: SubNavTitle.SubNavTitle,
                items: this.generateNavItems(),
                itemsEnd: this.generateNavEndItems(),
            },
            footer: {
                onRendered(el) {
                    // Update classes for the navBar container
                    let navEl = el.firstChild as HTMLElement;
                    let navBrand = navEl.querySelector(".navbar-brand") as HTMLAnchorElement;
                    let div = document.createElement('div');
                    navBrand.append(div);
                    // Theme Switch
                    Components.CheckboxGroup({
                        type: Components.CheckboxGroupTypes.Switch,
                        className: "position-absolute bottom-0 start-0 fs-6",
                        el: div,
                        multi: false,
                        items: [
                            {
                                label: "Dark Mode",
                                onChange: (item) => {
                                    // item ? darkMode() : alert('Dark Mode OFF');  // TODO
                                    darkMode(item ? true : false);
                                },
                            },
                        ]
                    });
                },
                onRendering(props) {
                    props.brand = " ";
                    props.className = "rounded-bottom"

                },

                itemsEnd: [
                    {
                        text: "v" + Strings.Version,
                        onClick: (el: HTMLElement) => {
                            new aboutMe(el);
                        }
                    }
                ]
            },
            table: {
                rows: DataSource.Items,
                dtProps: {
                    dom: 'rt<"row"<"col-sm-4"l><"col-sm-4"i><"col-sm-4"p>>',
                    createdRow: function (row, data, index) {
                        jQuery('td', row).addClass('align-middle');
                    },
                    drawCallback: function (settings) {
                        let api = new jQuery.fn.dataTable.Api(settings) as any;
                        jQuery(api.context[0].nTable).removeClass('no-footer');
                        jQuery(api.context[0].nTable).addClass('tbl-footer');
                        jQuery(api.context[0].nTable).addClass('table-striped');
                        jQuery(api.context[0].nTableWrapper).find('.dataTables_info').addClass('text-center');
                        jQuery(api.context[0].nTableWrapper).find('.dataTables_length').addClass('pt-2');
                        jQuery(api.context[0].nTableWrapper).find('.dataTables_paginate').addClass('pt-03');
                    },
                    headerCallback: function (thead, data, start, end, display) {
                        jQuery('th', thead).addClass('align-middle');
                    },
                    lengthMenu: [10, 15, 20, 25, 50, 100],
                    // Order by the 1st column by default; ascending
                    order: [[6, "desc"]]
                },
                onRendered: (el, dt) => {
                    // Save a reference to the element
                    this._elTable = el;

                    // See if the timeline exists
                    if (this._timeline) {
                        // Refresh it
                        this._timeline.refresh();
                    } else {
                        // Render the timeline
                        this._timeline = new TimeLine(el.parentElement);
                    }
                },
                columns: [
                    {
                        name: "",
                        title: "",
                        onRenderCell(el, column, item: IItem) {
                            Components.Tooltip({
                                el: el,
                                content: "Edit Item",
                                btnProps: {
                                    // Render the button
                                    iconType: pencilSquare,
                                    iconSize: 18,
                                    isLarge: true,
                                    type: Components.ButtonTypes.OutlineSecondary,
                                    onClick: () => {
                                        // Show the edit form
                                        ItemForm.edit({
                                            itemId: item.Id,
                                            onUpdate: () => {
                                                // Refresh the data
                                                DataSource.init().then(items => {
                                                    // Update the data
                                                    this.refresh(items);
                                                });
                                                window.location.reload();
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    },
                    {
                        name: "Title",
                        title: "Event Name"
                    },
                    {
                        name: "Priorities",
                        title: "Priorities"
                    },
                    {
                        name: "LinesOfEffort",
                        title: "Line of Effort"
                    },
                    {
                        name: "Status",
                        title: "Status"
                    },
                    {
                        name: "StartDate",
                        title: "Start",
                        onRenderCell: (el, column, item: IItem) => {
                            let date = item[column.name];
                            el.innerHTML =
                                moment(date).format(Strings.DateTimeFormat);
                        }
                    },
                    {
                        name: "EndDate",
                        title: "End",
                        onRenderCell: (el, column, item: IItem) => {
                            let date = item[column.name];
                            el.innerHTML =
                                moment(date).format(Strings.DateTimeFormat);
                        }
                    },
                    {
                        name: "Location",
                        title: "Location"
                    },
                    {
                        name: "",
                        title: "Facilitator",
                        onRenderCell: (el, column, item: IItem) => {
                            // Grabs the users Title
                            el.innerHTML = item ? item.AssignedTo.Title : "";
                        }
                    },
                    {
                        name: "",
                        title: "Members",
                        onRenderCell: (el, column, item: IItem) => {
                            // creates an array

                            let pocs = ((item["Members"] ? item["Members"].results : null) || []).sort((a, b) => {
                                if (a.Title < b.Title) { return -1; }
                                if (a.Title > b.Title) { return 1; }
                                return 0;
                            });
                            for (let i = 0; i < pocs.length; i++) {
                                if (i > 0) el.innerHTML += "<br/>";
                                el.innerHTML += pocs[i].Title;
                            }
                        }
                    },
                    {
                        // 6 - Documents
                        name: "Documents",
                        title: "Documents",
                        onRenderCell: (el, column, item: IItem) => {
                            // Render the document column
                            Components.Tooltip({
                                el: el,
                                content: "Upload Documents",
                                btnProps: {
                                    iconType: folderFill,
                                    iconSize: 28,
                                    type: Components.ButtonTypes.OutlineSecondary,
                                    isLarge: true,
                                    onClick: () => {
                                        new DocModal(el, item);
                                    }
                                }
                            });
                        }
                    },
                ]
            },
            onRendered(el) {
                el.id = "DASHBOARD";
                el.classList.add("rounded");
                el.setAttribute("style", "border: 1px solid #dbdbdb");
            },
        });
    }

    // Subnavigation Title Switch
    private subnavSwitch(ev) {
        let SubNavTitle = DataSource.Settings[0];
        let SubNavTitleTL = DataSource.Settings[0];
        // Change the Sub Navs Title
        let subnavTitle = document.querySelector("#SubNav a.navbar-brand");
        if (subnavTitle && this._timeline.isHidden) {
            subnavTitle.innerHTML = SubNavTitleTL.SubNavTitleTL;
            // Show subnav buttons
            this._showTLNav = true;

        }
        else if (!this._timeline.isHidden) {
            subnavTitle.innerHTML = SubNavTitle.SubNavTitle;
            // Show subnav buttons
            this._showTLNav = false;
        };
    }

    // Show the timeline buttons
    private showTLButtons(ev) {
        let btnLegend = document.querySelector(".legend_btn");

        if (this._showTLNav) {
            btnLegend.classList.remove("d-none");
        } else {
            btnLegend.classList.add("d-none");
        }
    }

    // Show zoom buttons
    private showZoomButtons(ev) {
        let zoomBTNs = document.querySelectorAll(".btn-filter");
        if (this._showTLNav) {
            for (let i = 0; i < zoomBTNs.length; i++) {
                let _zoomBtn = zoomBTNs[i];

                // Remove the hidden class
                _zoomBtn.classList.remove("d-none");
            }
        } else {
            for (let i = 0; i < zoomBTNs.length; i++) {
                let _zoomBtn = zoomBTNs[i];

                // add the hidden class
                _zoomBtn.classList.add("d-none");
            }
        }
    }

    // Sets the active element
    private setActiveElement(el: HTMLElement) {
        // Get the nav items
        let elements = document.querySelectorAll(".btn-filter");
        for (let i = 0; i < elements.length; i++) {
            let element = elements[i];

            // Revert the item
            element.classList.remove("active");
        }

        // Make this element active
        el.classList.add("active");
    }

}
function darkMode(flag: boolean) {

    if (flag == true) {
        let workspace = document.querySelector("#s4-workspace");
        workspace.classList.add("dark");
        let tableheaders = jQuery('td', '#DataTables_Table_0').addClass("dark");
        let datatable = document.querySelector('.dataTable ');
        datatable.classList.add('dark');
        let icons = jQuery('svg', ".btn-icon").addClass("dark");
        let footer = jQuery('.navbar', '#footer').attr("style", "background-color: #444 !important");
        let subNav = jQuery('.navbar', '#SubNav').attr("style", "background-color: #444 !important");
        // let switchText = jQuery('label', 'form-check-label').addClass("dark");
        let switchText = document.querySelector('label.form-check-label');
        switchText.setAttribute('style', 'color: white');
        let navBrand = jQuery('.navbar-brand', '.container-fluid').attr("style", "color: white !important");
        let versionText = jQuery('a.nav-link', 'li.nav-item').attr("style", "color: white !important");

        // Remove the style on the filter icon
        let iconFilter = document.querySelector('svg.bi-filter');
        iconFilter.classList.remove('dark');

        // Set the time line buttons
        let tlBtns = document.querySelectorAll('.btn-sm');
        tlBtns.forEach((el: HTMLElement) => {
            // remove the dark class
            el.classList.remove('btn-outline-dark');
            // add the light class
            el.classList.add('btn-outline-light');
        });
    }
    else if (flag == false) {
        let workspace = document.querySelector("#s4-workspace");
        workspace.classList.remove("dark");
        let tableheaders = jQuery('td', '#DataTables_Table_0').removeClass("dark");
        let datatable = document.querySelector('.dataTable ');
        datatable.classList.remove('dark');
        let icons = jQuery('svg', ".btn-icon").removeClass("dark");
        let footer = jQuery('.navbar', '#footer').removeAttr("style", "background-color: #444 !important");
        let subNav = jQuery('.navbar', '#SubNav').removeAttr("style", "background-color: #444 !important");
        let switchText = document.querySelector('label.form-check-label');
        switchText.removeAttribute('style');
        let navBrand = jQuery('.navbar-brand', '.container-fluid').removeAttr("style", "color: white !important");
        let versionText = jQuery('a.nav-link', 'li.nav-item').removeAttr("style", "color: white !important");
    }
}




