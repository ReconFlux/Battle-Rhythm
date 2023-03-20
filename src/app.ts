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
                    href: "https://usaf.dps.mil/sites/307BW/307MSG/FSS/CF/SitePages/307th%20Cyberspace%20Support%20Flight.aspx",
                    items: [
                        {
                            text: "Home",
                            href: ""
                        },
                        {
                            text: "Self-Help",
                            href: "https://usaf.dps.mil/sites/307BW/307MSG/FSS/CF/SitePages/Self-Help.aspx"
                        },
                        {
                            text: "Helpful Links",
                            href: "https://usaf.dps.mil/sites/307BW/307MSG/FSS/CF/SitePages/Customer%20Self-Help%20Documents.aspx"
                        },
                        {
                            text: "Submit Ticket",
                            href: "https://usaf.dps.mil/sites/307BW/307MSG/FSS/CF/SitePages/Submit%20Ticket.aspx"
                        },
                        {
                            text: "FAQ's",
                            href: "https://usaf.dps.mil/sites/307BW/307MSG/FSS/CF/FAQs/Forms/AllItems.aspx"
                        },
                        {
                            text: "SCO - Operations",
                            href: "https://usaf.dps.mil/sites/307BW/307MSG/FSS/CF/SCO/SitePages/Home.aspx"
                        },
                        {
                            text: "SCOK - Knowledge Management Operations",
                            href: "https://usaf.dps.mil/sites/307BW/307MSG/FSS/CF/SCOK/SitePages/Home.aspx"
                        },
                        {
                            text: "SCOO - Network Operations",
                            href: "https://usaf.dps.mil/sites/307BW/307MSG/FSS/CF/SCOO/SitePages/Home.aspx"
                        },
                        {
                            text: "SCOS - Client Systems",
                            href: "https://usaf.dps.mil/sites/307BW/307MSG/FSS/CF/SCOS/SitePages/Home.aspx"
                        },
                        {
                            text: "SCO - Telecommunications",
                            href: "https://usaf.dps.mil/sites/307BW/307MSG/FSS/CF/TELECOM/SitePages/Home.aspx"
                        }
                    ]
                },
                {
                    text: "307th Services Flight",
                    href: "https://usaf.dps.mil/sites/307BW/307MSG/FSS/SVF/SitePages/Home.aspx"
                },
                {
                    text: "Airman and Family Readiness",
                    href: "https://usaf.dps.mil/sites/307BW/307MSG/FSS/AmnandFamilyReadiness/SitePages/Home.aspx"
                },
                {
                    text: "Civilian Personnel Liaison",
                    href: "https://usaf.dps.mil/sites/307BW/307MSG/FSS/CivilianLiaison/SitePages/Home.aspx",
                    items: [
                        {
                            text: "ART PD Library",
                            href: "https://usaf.dps.mil/teams/11387/SitePages/Home.aspx"
                        }
                    ]
                },
                {
                    text: "Manpower",
                    href: "https://usaf.dps.mil/sites/307BW/307MSG/FSS/Manpower/SitePages/Home.aspx",
                    items: [
                        {
                            text: "Unit Manpower Document",
                            href: "https://usaf.dps.mil/sites/307BW/307MSG/FSS/Manpower/Shared%20Documents/Unit%20Manpower%20Document"
                        }
                    ]
                },
                {
                    text: "Military Personnel Flight",
                    href: "https://usaf.dps.mil/sites/307BW/307MSG/FSS/MPF/SitePages/Home.aspx",
                    items: [
                        {
                            text: "307 FSS PSM",
                            href: "https://usaf.dps.mil/sites/307BW/307MSG/FSS/MPF/PSM/SitePages/Home.aspx"
                        },
                        {
                            text: "AGR",
                            href: "https://usaf.dps.mil/sites/307BW/307MSG/FSS/MPF/AGR/SitePages/Home.aspx"
                        },
                        {
                            text: "Career Development",
                            href: "https://usaf.dps.mil/sites/307BW/307MSG/FSS/MPF/CareerDevelopment/SitePages/Home.aspx"
                        },
                        {
                            text: "CSS Toolkit",
                            href: "https://usaf.dps.mil/sites/307BW/307MSG/FSS/MPF/CSSToolkit/SitePages/Home.aspx"
                        },
                        {
                            text: "CSS Training",
                            href: "https://usaf.dps.mil/sites/307BW/307MSG/FSS/MPF/CSStraining/SitePages/Home.aspx"
                        },
                        {
                            text: "Customer Support",
                            href: "https://usaf.dps.mil/sites/307BW/307MSG/FSS/MPF/Customer%20Support/SitePages/Home.aspx"
                        },
                        {
                            text: "Force Management",
                            href: "https://usaf.dps.mil/sites/307BW/307MSG/FSS/MPF/Forcemanagement/SitePages/Home.aspx"
                        },
                        {
                            text: "Wing Career Advisor",
                            href: "https://usaf.dps.mil/sites/307BW/307MSG/FSS/MPF/Wingcareeradvisor/SitePages/Home.aspx"
                        },
                        {
                            text: "Virtual IN/OUT Processing Status",
                            href: "https://usaf.dps.mil/sites/307BW/307MSG/FSS/MPF/Lists/Virtual%20InOut%20Processing/AllItems.aspx"
                        }

                    ]
                },
                
            ]

        });



    }
    

}





