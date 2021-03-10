import axios from 'axios';

const urlBaseSheet = 'https://sheets.googleapis.com/v4/spreadsheets/';

export default {
    SingleGet: (apiKey, spreadsheetId, sheetName, ranges, majorDimension, callback) => {
        const urlSheet = urlBaseSheet + spreadsheetId + '/values/' + sheetName + '!' + ranges[0].range + '?key=' + apiKey + '&majorDimension=' + majorDimension;
        axios.get(urlSheet).then((sheet) => {
            if(callback) {
                callback(sheet);
            }
        });
    },
    BatchGet: (apiKey, spreadsheetId, sheetName, ranges, majorDimension, callback) => {
        let urlSheet = urlBaseSheet + spreadsheetId + '/values:batchGet?key=' + apiKey + '&majorDimension=' + majorDimension;
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