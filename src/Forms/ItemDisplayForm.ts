import Strings from "../strings";
import { ItemForm, Modal, Documents, LoadingDialog } from "dattatable";
import { DataSource, IItem, ISetting } from "../ds";
import * as moment from "moment";
import { Components } from "gd-sprest-bs";
import { TimeLine } from "../Timeline/timeline";
import { App } from "../app";
import { calendar2RangeFill } from "gd-sprest-bs/build/icons/svgs/calendar2RangeFill";

/**
 * Item Display Form
 */

export class ItemDisplayForm {
    // Global vars
    private _el: HTMLElement = null;
    private _elDisplayForm: HTMLElement = null;
    private _item: IItem = null;
    private _docs: Documents = null;
    private _timeline: TimeLine = null;
    private _elTimeline = document.querySelector("#timeline");
    private _elNavButton = document.querySelector(".dashboard-btn");
    private _timelineRefresh: App = null;


    // constructor
    constructor(el: HTMLElement, item: IItem) {
        // Save the properties
        this._el = el;

        // grabs the item ID
        this._item = item;

        // Set the list name
        ItemForm.ListName = Strings.Lists.BREvents;

        // Initialize the class
        DataSource.init().then(() => {
            DataSource.load().then(() => {
                // Render the class
                this.render(el);
            });
        });
    }
    // render
    private render(el: HTMLElement) {
        // modal head

        // create the element
        let elHead = document.createElement("div");

        // Set the header text
        elHead.innerHTML = "Battle Rhythm Event:  " + " " + this._item.Title + " - " + " Display Form";

        // Appened to the modal header
        Modal.setHeader(elHead);

        // modal body
        let elBody = document.createElement("div");
        let elItemform = document.createElement("div");
        let elDocs = document.createElement("div");
        let elBLUF = document.createElement("div");

        //BLUF
        elBLUF.innerHTML = "<h6>BLUF: </h6>" + " " + (this._item.BLUF || "No BLUF Provided.");
        // BLUF Style border
        elBLUF.className = "ItemDisplayBLUF p-3 mb-3 border rounded";

        // Accordian
        Components.Accordion({
            el: elItemform,
            autoCollapse: true,
            id: "ItemDisplayAccordian",
            items: [
                // Summary
                {
                    header: "Summary",
                    showFl: true,
                    onRender: (el) => {
                        this.summary(el);
                    }

                },
                // Documents
                {
                    header: "Documents",
                    onRender: (el) => {
                        // Documents for the item
                        new Documents({
                            el,
                            listName: Strings.Lists.BREvents,
                            itemId: this._item.Id,
                        });
                    }

                },
                // Members
                {
                    header: "Members",
                    onRender: (el) => {
                        // Members
                        this.members(el);
                    }
                }
            ]
        });





        elBody.appendChild(elBLUF);
        elBody.appendChild(elItemform);


        Modal.setBody(elBody)

        // modal footer
        let elFooter = document.createElement("div");
        let elButtons = document.createElement("div");
        Components.ButtonGroup({
            el: elButtons,
            buttons: [
                {
                    // Delete Button
                    text: "Delete",
                    type: Components.ButtonTypes.Danger,
                    onClick: () => {
                        // Deletes the item.
                        Modal.hide();
                        this.deleteEvent();
                    }
                },
                {
                    // Cancels the form.
                    text: "Cancel",
                    type: Components.ButtonTypes.Secondary,
                    onClick: () => {
                        // Hide the modal.
                        Modal.hide();
                    }
                },
                {
                    text: "Edit",
                    type: Components.ButtonTypes.Success,
                    onClick: () => {
                        // Opens the item edit form
                        ItemForm.edit({

                            // Grabs the item ID
                            itemId: this._item.Id,

                            // Refreshes the data
                            onUpdate: () => {
                                DataSource.refreshDashboard();
                                window.location.reload();
                            }

                        });
                    }
                }
            ]

        });
        elFooter.appendChild(elButtons);
        Modal.setFooter(elFooter);
        // modal props
        Modal.show();
    }

    private deleteEvent() {
        //create the confirmation modal
        let elModal = document.getElementById("event-registration-modal");
        if (elModal == null) {
            //create the element
            elModal = document.createElement("div");
            elModal.className = "modal";
            elModal.id = "event-delete-modal";
            document.body.appendChild(elModal);
        }
        //Create the modal
        let modal = Components.Modal({
            el: elModal,
            title: "Delete Event",
            body: "Are you sure you want to delete this event?",
            type: Components.ModalTypes.Medium,
            onClose: () => {
                if (elModal) {
                    document.body.removeChild(elModal);
                    elModal = null;
                }
            },
            onRenderBody: (elBody) => {
                let alert = Components.Alert({
                    type: Components.AlertTypes.Danger,
                    content: "Error deleting the event",
                    className: "eventDeleteErr d-none",
                });
                elBody.prepend(alert.el);
                alert.hide();
            },
            onRenderFooter: (elFooter) => {
                Components.ButtonGroup({
                    el: elFooter,
                    buttons: [
                        {
                            text: "Yes",
                            type: Components.ButtonTypes.Primary,
                            onClick: () => {
                                let elAlert =
                                    document.querySelector(".eventDeleteErr");
                                LoadingDialog.setHeader("Delete Event");
                                LoadingDialog.setBody("Deleting the event");
                                LoadingDialog.show();
                                this._item.delete().execute(
                                    () => {
                                        // Refresh the dashboard
                                        DataSource.refreshDashboard();
                                        LoadingDialog.hide();
                                        modal.hide();
                                        // Refresh the timeline
                                        this._timeline.refresh();
                                    },
                                    () => {
                                        LoadingDialog.hide();
                                        elAlert.classList.remove("d-none");
                                    }
                                );
                            },
                        },
                        {
                            text: "No",
                            type: Components.ButtonTypes.Secondary,
                            onClick: () => {
                                modal.hide();
                            },
                        },
                    ],
                });
            },
        });
        modal.show();
    }

    // Summary
    private summary(el: HTMLElement) {
        //let elSum = document.createElement("div");
        el.innerHTML = `<div class="lh-1">
        <div class="row text-black">
            <div class="col">
            <div class="row mt-3">
                    <div class="col">
                        <h6 class="fw-bold text-black">Location:</h6>
                        <p class=" m-0">${this._item.Location}</p>
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col">
                        <h6 class="fw-bold text-black">Start Date:</h6>
                        <p class=" m-0">${(moment(this._item.StartDate).format(Strings.DateTimeFormat))}</p>
                    </div>
                    <div class="col">
                        <h6 class="fw-bold text-black">End Date:</h6>
                        <p class=" m-0">${(moment(this._item.EndDate).format(Strings.DateTimeFormat))}</p>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col">
                        <h6 class="fw-bold text-black">Line of Effort:</h6>
                        <p class=" m-0">${this._item.LinesOfEffort}</p>
                    </div>
                    <div class="col">
                        <h6 class="fw-bold text-black">Status:</h6>
                        <p class=" m-0">${this._item.Status || ""}</p>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col">
                        <h6 class="fw-bold text-black">Priority:</h6>
                        <p class=" m-0">${this._item.Priorities}</p>
                    </div>
                    <div class="col">
                        <h6 class="fw-bold text-black">Facilitator:</h6>
                        <p class=" m-0">${this._item.AssignedTo.Title || ""}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    }

    // Members
    private members(el: HTMLElement) {
        let pocs = (this._item.Members ? this._item.Members : null);
        let items: Components.IListGroupItem[] = [];
        if (pocs === null) { console.log("POCS are null"); }
        if (pocs) {
            for (let i = 0; i < pocs.results.length; i++) {
                let poc = pocs.results[i]["Title"];
                // Add an item
                items.push({
                    href: "#",
                    className: "mb-1 py-3 lh-tight  + border",
                    content: [
                        "<div class=\"d-flex w-100 align-items-center justify-content-between\">",
                        "<span>" + poc + "</span>",
                        "</div>"
                    ].join('\n')
                });
            }
        }
        else {
            // Add a blank entry
            items.push({
                content: "<h6>No Members Assigned.</h6>"
            });
        }
        Components.ListGroup({
            el,
            items
        });
    }

    // Refresh
    private refresh() {

        while (this._elTimeline) { this._elTimeline.remove(); }
    }

}