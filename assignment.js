// Sort the document based on CGPA
// Each elective will have only 50 seats
// Assign elective based on options
// Option 1 will have highest priority

const parser = require("simple-excel-to-json");
const json2xls = require("json2xls");
const fs = require("fs");

const assignmentDocument = parser.parseXls2Json("./Assignment.xlsx");

const sortedDocument = assignmentDocument[0].sort(function(a, b) {
    return b.CGPA - a.CGPA;
});

let countFWT = 0,
    countITS = 0,
    countERP = 0,
    countUI = 0;

let isAssigned = false;

const assignedDocument = assignmentDocument[0].map((student) => {
    isAssigned = false;
const opt=[student.OPTION_1, student.OPTION_2, student.OPTION_3, student.OPTION_4];
const ele=["Fundamentals of Web Technologies", "Internet, Technology and Society", "Enterprise Resource Planning", "User Interface/User Experience (UI/UX) Design"];
for(i=0; i<4; i++)
{
    if (!isAssigned) {
        switch (opt[i]) {
            case ele[0]:
                if (countFWT < 50) {
                    student.ELECTIVE = ele[0];
                    countFWT++;
                    isAssigned = true;
                }
                break;

            case ele[1]:
                if (countITS < 50) {
                    student.ELECTIVE = ele[1];
                    countITS++;
                    isAssigned = true;
                }
                break;

            case ele[2]:
                if (countERP < 50) {
                    student.ELECTIVE = ele[2];
                    countERP++;
                    isAssigned = true;
                }
                break;

            case ele[3]:
                if (countUI < 50) {
                    student.ELECTIVE = ele[3];
                    countUI++;
                    isAssigned = true;
                }
                break;
        }
    }

}

    return student;
});

console.log(assignedDocument);

const assignedData = json2xls(assignedDocument);
fs.writeFileSync("Assigned.xlsx", assignedData, "binary");