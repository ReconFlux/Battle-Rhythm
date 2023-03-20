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
import { folderFill } from "gd-sprest-bs/build/icons/svgs/folderFill";
import { windowFullscreen } from "gd-sprest-bs/build/icons/svgs/windowFullscreen";
import { fileEarmarkPlusFill } from "gd-sprest-bs/build/icons/svgs/fileEarmarkPlusFill";
import { gearWideConnected } from "gd-sprest-bs/build/icons/svgs/gearWideConnected";
import { envelope } from "gd-sprest-bs/build/icons/svgs/envelope";
import { palette } from "gd-sprest-bs/build/icons/svgs/palette";
import { wrenchAdjustable } from "gd-sprest-bs/build/icons/svgs/wrenchAdjustable";
import { questionSquare } from "gd-sprest-bs/build/icons/svgs/questionSquare";
import { infoSquare } from "gd-sprest-bs/build/icons/svgs/infoSquare";
import { Navbar } from "gd-sprest-bs/src/components/components";


/**
 * Main Application
 */

export class App {
    // Constructor
    constructor(el: HTMLElement) {
        ItemForm.ListName = Strings.Lists.BREvents;


        // Render the dashboard
        this.render(el);
    }

    private render(el: HTMLElement) {
        let navBar = Navbar({
            el,
            brand: Strings.ProjectName,
            brandUrl: "",
            enableSearch: false,
            items: [
                {
                    text: "307th Force Support Squadron",
                    href: "/sites/307BW/307MSG/FSS/SitePages/Home.aspx",
                    isActive: true
                },
                {
                    text: "307BW vFSS",
                    href: "https://usaf.dps.mil/sites/307BW/307MSG/FSS/vFSS/SitePages/Home.aspx",
                },
                {
                    text: "307th Cyberspace Support Flight",
                    href: " ",
                    items: [
                        {
                            text: "Home",
                            href: ""
                        },
                        {
                            text: "",
                            href: ""
                        },
                        {
                            text: "",
                            href: ""
                        },
                        {
                            text: "",
                            href: ""
                        },
                        {
                            text: "",
                            href: ""
                        },
                        {
                            text: "",
                            href: ""
                        },
                        {
                            text: "",
                            href: ""
                        },
                        {
                            text: "",
                            href: ""
                        },
                        {
                            text: "",
                            href: ""
                        },
                        {
                            text: "",
                            href: ""
                        }
                    ]
                },
                {
                    text: "307th Services Flight",
                    href: " "
                },
                {
                    text: "Airman and Family Readiness",
                    href: " "
                },
                {
                    text: "Civilian Personnel Liaison",
                    href: " ",
                    items: [
                        {
                            text: "",
                            href: ""
                        }
                    ]
                },
                {
                    text: "Manpower",
                    href: " ",
                    items: [
                        {
                            text: "",
                            href: ""
                        }
                    ]
                },
                {
                    text: "Military Personnel Flight",
                    href: " ",
                    items: [
                        {
                            text: "",
                            href: ""
                        },
                        {
                            text: "",
                            href: ""
                        },
                        {
                            text: "",
                            href: ""
                        },
                        {
                            text: "",
                            href: ""
                        },
                        {
                            text: "",
                            href: ""
                        },
                        {
                            text: "",
                            href: ""
                        },
                        {
                            text: "",
                            href: ""
                        },
                        {
                            text: "",
                            href: ""
                        },
                        {
                            text: "",
                            href: ""
                        }

                    ]
                },
                
            ]

        });



    }
    

}





