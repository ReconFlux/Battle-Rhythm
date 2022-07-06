import Strings from "../strings";
import { Components, List, SPTypes, Types } from "gd-sprest-bs";
import { DataSource, IItem, ISetting } from "../ds";


export class Legend {
    private items: Components.IBadgeProps[] = [];
    private LOEs = []
    private _elBase = document.createElement('div');

    constructor(el: HTMLElement) {
        this.render(el);

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
            onRenderHeader(el) {
                el.id = "mydivHeader";
            },
        });


    }


}

//Make the DIV element draggagle
var dragItem = document.querySelector(".Legend_Toast");
var container = document.querySelector(".Legend_Toast");

var active = false;
var currentX;
var currentY;
var initialX;
var initialY;
var xOffset = 0;
var yOffset = 0;

container.addEventListener("touchstart", dragStart, false);
container.addEventListener("touchend", dragEnd, false);
container.addEventListener("touchmove", drag, false);

container.addEventListener("mousedown", dragStart, false);
container.addEventListener("mouseup", dragEnd, false);
container.addEventListener("mousemove", drag, false);

function dragStart(e) {
    if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
    } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
    }

    if (e.target === dragItem) {
        active = true;
    }
}

function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;

    active = false;
}

function drag(e) {
    if (active) {

        e.preventDefault();

        if (e.type === "touchmove") {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
        } else {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;

        setTranslate(currentX, currentY, dragItem);
    }
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}