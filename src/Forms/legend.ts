import Strings from "../strings";
import { Components, List, SPTypes, Types } from "gd-sprest-bs";
import { DataSource, IItem, ISetting } from "../ds";


export class Legend {
    private items: Components.IBadgeProps[] = [];
    private LOEs = []
    private _elBase = document.createElement('div');
    //private dragItem = document.querySelector(".Legend_Toast");
    private container = document.querySelector(".Legend_Toast");

    constructor(el: HTMLElement) {
        this.render(el);
        dragElement();
    }

    private render(el: HTMLElement) {
        let Settings = DataSource.Settings[0];
        console.log("LEGEND:" + this.LOEs);
        Components.Toast({
            el,
            className: "Legend_Toast hide d-none",

            headerText: Settings.legendHeader,
            onRenderBody: (el) => {
                el.id = "legendBody";

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

                                case "rect_" + fld.Choices.results[0]:
                                    _choiceElements.setAttribute("style", `border-left-color: ${Settings.legend_LOE_Current}`);
                                    break;
                                case "rect_" + fld.Choices.results[1]:
                                    _choiceElements.setAttribute("style", `border-left-color: ${Settings.legend_LOE_Future}`);
                                    break;
                                case "rect_" + fld.Choices.results[2]:
                                    _choiceElements.setAttribute("style", `border-left-color: ${Settings.legend_LOE_Enable}`);
                                    break;
                                case "rect_" + fld.Choices.results[3]:
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
            onRenderHeader(el) {
                el.id = "legendHead";
            },
        });
    }

}

function dragElement() {
    // give the legend a Id
    let elLegend = document.querySelector('.Legend_Toast') as HTMLElement;
    elLegend.id = "Legend";


    let Container = document.getElementById('_invisibleIfEmpty');
    let dragItem = document.getElementById('Legend');

    // // Test
    // dragItem.onmouseover = function () {
    //     console.log('mouse hover');
    // }

    //Make the DIV element draggagle:
    dragElement(document.getElementById("Legend"));
    function dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById("legendHead")) {
            /* if present, the header is where you move the DIV from:*/
            document.getElementById("legendHead").onmousedown = dragMouseDown;
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


}