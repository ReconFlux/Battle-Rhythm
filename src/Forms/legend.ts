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
        });


    }

}
