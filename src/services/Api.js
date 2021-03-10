import axios from 'axios';

const urlBaseSheet = 'https://sheets.googleapis.com/v4/spreadsheets/';

export default {
    SingleGet: (apiKey, spreadsheetId, sheetName, ranges, callback) => {
        const urlSheet = urlBaseSheet + spreadsheetId + '/values/' + sheetName + '!' + ranges[0].range + '?key=' + apiKey;
        axios.get(urlSheet).then((sheet) => {
            if(callback) {
                callback(sheet);
            }
        });
    },
    BatchGet: (apiKey, spreadsheetId, sheetName, ranges, callback) => {
        let urlSheet = urlBaseSheet + spreadsheetId + '/values:batchGet?key=' + apiKey;
        ranges.forEach(range => {
            urlSheet += '&ranges=' + sheetName + '!' + range.range;
        });
        axios.get(urlSheet).then((sheet) => {
            if(callback) {
                callback(sheet);
            }
        });
    }
}