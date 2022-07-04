import { Modal } from "dattatable";
import Strings from "../strings";

/**
 * About me Modal
 */
export class aboutMe {
    private _el: HTMLElement = null;

    constructor(el: HTMLElement) {
        this._el = el;
        this.render(el);
    }
    private render(el: HTMLElement) {

        // Header title
        Modal.setHeader("About");

        // Body element
        let body = document.createElement('div');
        body.innerHTML = `
        <h5>Name: ${Strings.ProjectName}</h5><br>
        <br>
        <b>Description: </b> ${Strings.ProjectDescription}<br>
        <br>
        <br>
        <b>Version: </b> ${Strings.Version} <b>Developer: </b> <a href="https://github.com/ReconFlux" target="_blank">Stephen Burtrum</a>
        `
        Modal.setBody(body);

        // Footer
        let footer = document.createElement('div');
        Modal.setFooter(footer); // intentially left blank.

        Modal.show();
    }
}