import * as moment from "moment";
import Strings from "./strings";

// Formats the time value
export const formatTimeValue = (value: string) => {
    // Ensure a value exists
    if (value) {
        // Return the date value
        return moment(value).format(Strings.DateTimeFormat);
    }

    // Return nothing
    return "";
}

// Formats file size into human readable form
export const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    // Return the formatted size string
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Formats the date value
export const formatDateValue = (value: string) => {
    // Ensure a value exists
    if (value) {
        // Return the date value
        return moment(value).format(Strings.DateTimeFormat);
    }

    // Return nothing
    return "";
}


// Gets the field value
export const getFieldValue = (propName: string, value: any) => {
    // Split the properties
    let keys = propName.split(".");

    // Set the field value
    let fieldValue = value;
    for (let i = 0; i < keys.length; i++) {
        // Set the field value
        fieldValue = fieldValue ? fieldValue[keys[i]] : null;
    }

    // Return the field value
    return fieldValue || "";
}