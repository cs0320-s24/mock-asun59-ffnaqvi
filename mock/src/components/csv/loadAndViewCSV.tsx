import { fileDictionary } from "../data/mockData";

let LOAD_CODE = -1; // Initial load code
let csvData = [];

export class InputHandler {
    static loadcsv(fileName: string) {
        if (fileDictionary.has(fileName)) {
        //    csvData = fileDictionary.get(fileName);
            LOAD_CODE = 200; // File exists
        } else {
           LOAD_CODE = -1; // File doesn't exist
        }
    }

    static viewcsv(): void {
        try {
            if (LOAD_CODE === 200) {
                console.table(csvData); // Print CSV data as a table
            } else {
                console.error("Failed to load CSV data.");
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    static handleCommand(commandString: string): void {
        const parts = commandString.split(' ');
        const command = parts[0];
        const fileName = parts[1];
        
        if (command === "loadcsv") {
            InputHandler.loadcsv(fileName);
            if (LOAD_CODE === 200) {
                console.log(`CSV file '${fileName}' loaded successfully.`);
            } else {
                console.error(`Failed to load CSV file '${fileName}'.`);
            }
        } else if (command === "view") {
            InputHandler.viewcsv();
        } else {
            console.error("Invalid command.");
        }
    }
}

