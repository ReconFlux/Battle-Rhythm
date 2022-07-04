import { DataTable, ItemForm, LoadingDialog, Modal, Documents } from "dattatable";
import { Components, ContextInfo, Helper, List, SPTypes, Types, Web } from "gd-sprest-bs";
import * as jQuery from "jquery";
import * as moment from "moment";
import { formatBytes, formatTimeValue } from "../../common";
import { DataSource } from "../../ds";
import Strings from "../../strings";
/**
 * Customization Settings for the Navigation Bar
 */
export class NavBarSettings {
    static edit(itemId: number, onUpdate: () => void) {
        // Set list name
        ItemForm.ListName = Strings.Lists.Settings;

        // Show the edit form
        ItemForm.edit({
            itemId,
            onCreateEditForm: (props) => {
                props.excludeFields = [
                    "Title", "SubNavTitle", "SubNavTitleTL", "legendHeader", "legend_LOE_Current", "legend_LOE_Future", "legend_LOE_Enable", "legend_LOE_Airmen"
                ],
                    props.onControlRendering = (ctrl, field) => {
                        // See if we picking the Color field
                        if (field.InternalName == "NavColor") {
                            // Update the control
                            (ctrl as any as Components.IFormControlProps).type = Components.FormControlTypes.ColorPicker;
                        }
                    }
                return props
            },
            onUpdate,
            onSetHeader: (props) => {
                props.innerHTML = "Navigation Bar Customization";
            }
        })
    }

}



/*
possible solutions: heavy research

1. JSON -> css
2. Setting & Calling a value from localstorage
3. create a function that sets the custom colors and then having load on initial startup
4. tell the PO it can't be done.
*/