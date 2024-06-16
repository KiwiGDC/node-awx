export class InstanceApiError extends Error {

    constructor() {
        super("API INSTANCE NOT FOUND, INIT THE INSTANCE API BEFORE USE LIBRARY");
    }

}