import Strings from "../strings";
import { Components, List, SPTypes, Types } from "gd-sprest-bs";
import { DataSource, IItem, ISetting } from "../ds";


export class Legend {
    private items: Components.IBadgeProps[] = [];
    private LOEs = []
    private _elBase = document.createElement('div');

    constructor(el: HTMLElement) {
        this.render(el);
        el.id = "mydiv";
    }

    private render(el: HTMLElement) {
        let Settings = DataSource.Settings[0];
        console.log(this.LOEs);
        Components.Toast({

            el,
            className: "Legend_Toast hide d-none",
            headerText: Settings.legendHeader,
            onRenderBody: (el) => {

                // Return a promise
                return new Promise((resolve, reject) => {
                    // Get the status field
                    List(Strings.Lists.BREvents).Fields("LinesOfEffort").execute((fld: Types.SP.FieldChoice) => {


                        // Parse the choices
                        for (let i = 0; i < fld.Choices.results.length; i++) {
                            // Add choices to an array
                            this.LOEs.push(fld.Choices.results[i]);

                            // creates an element for each choice.
                            const _choiceElements = document.createElement('div');

                            // Name of choices
                            _choiceElements.innerHTML = fld.Choices.results[i];

                            // set custom ID's
                            _choiceElements.id = `rect_${fld.Choices.results[i]}`;

                            // Add a class
                            _choiceElements.className = "legendBody"

                            // Set Legend Colors
                            let Settings = DataSource.Settings[0];
                            switch (_choiceElements.id = `rect_${fld.Choices.results[i]}`) {

                                case "rect_Current Mission":
                                    _choiceElements.setAttribute("style", `border-left-color: ${Settings.legend_LOE_Current}`);
                                    break;
                                case "rect_Future Mission":
                                    _choiceElements.setAttribute("style", `border-left-color: ${Settings.legend_LOE_Future}`);
                                    break;
                                case "rect_Enable Mission Partner Success":
                                    _choiceElements.setAttribute("style", `border-left-color: ${Settings.legend_LOE_Enable}`);
                                    break;
                                case "rect_Airmen and Campus":
                                    _choiceElements.setAttribute("style", `border-left-color: ${Settings.legend_LOE_Airmen}`);
                                default:
                                    break;
                            }




                            el.appendChild(_choiceElements);
                        }

                        resolve(this.LOEs);
                    }, reject);
                });


            },
            options: { autohide: true },
        });


    }


}
//Make the DIV element draggagle:
dragElement(document.getElementById("mydiv"));
let toasthead = document.querySelector(".toast-header") as HTMLElement;
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (toasthead) {
        /* if present, the header is where you move the DIV from:*/
        toasthead.onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}