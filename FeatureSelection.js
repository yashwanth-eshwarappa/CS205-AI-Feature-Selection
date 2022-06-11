const fs = require('fs');
const readline = require('readline');

// Read input from user
const inputRead = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const args = process.argv;

// Storing the dataset in the list
var dataList = [];

console.log("--------------------------");
console.log("Feature Selection Project");
console.log("--------------------------");

inputRead.question('Select the search option from below:\n' +
    '1. Forward Selection \n' +
    '2. Backward Elimination\n', selection => {
        if (selection == 1) {
            console.log("\nSelected search: Forward Selection\n");
        }
        if (selection == 2) {
            console.log("\nSelected search: Backward Elimination\n");
        }

        // Reading the data from the provided file
        readData().then(() => {
            if (selection == 1) {
                let start = Date.now();
                //Calling Forward selection upon reading the dataset
                forwardSelection(dataList);
                let end = Date.now();
                console.log("Total Time taken = " + Number.parseFloat(end - start));
            }
            else if (selection == 2) {
                let start = Date.now();
                forwardSelection(dataList);
                //Calling Backward elimination upon reading the dataset
                backwardElimination(dataList);
                let end = Date.now();
                console.log("Total Time taken = " + Number.parseFloat(end - start));
            }
            else {
                console.log("Incorrect search selected!!");
            }

        });
        inputRead.close();
    });

// Reading the data points from file and storing in the list dataList
async function readData() {
    var filePath;
    if (args[2] != null) {
        filePath = args[2];
    }
    else {
        filePath = process.cwd() + '/CS205_SP_2022_SMALLtestdata__10.txt'
    }
    const fileStream = fs.createReadStream(filePath);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    // Iterating each line and extracting the data
    for await (var line of rl) {
        var list = [];
        for (var each of line.trim().split(/\s+/)) {
            list.push(Number.parseFloat(each));
        }
        // Adding all data points to dataList
        dataList.push(list);
    }
}

function forwardSelection(dataList) {
    // Count of features
    var numOfFeature = dataList[0].length;
    // Flag to check if the feature already visited for the same entry
    var featuresVisited = [];
    var selectedFeatures = [];
    // storing the best feature for forward selection in this list
    var finalBestAttributes = [];
    // To store the maximum accuracy value for selected features
    var maxAccuracy = Number.MIN_VALUE;

    // Iterate each feature of datapoint
    for (var j = 1; j < numOfFeature; j++) {
        var currBestAccuracy = 0;
        var currBestFeature = 0;

        for (var i = 1; i < numOfFeature; i++) {

            // Saving the selected features after each iteration to current selection
            var localSelectedFeatures = [];
            localSelectedFeatures = [...selectedFeatures];

            if (featuresVisited[i]) {
                continue;
            }

            localSelectedFeatures.push(i);

            // Calculating the accuracy by checking each localSelectedFeatures
            var correctlyPredictedTypeCount = 0;
            for (var eachdata = 0; eachdata < dataList.length; eachdata++) {
                if (calculateAccuracy(eachdata, dataList, localSelectedFeatures)) {
                    correctlyPredictedTypeCount++;
                }
            }
            // Get the accuracy by dividing the correctlyPredictedTypeCount with total data entries of all types
            var result = (correctlyPredictedTypeCount) / dataList.length;

            console.log("For the features " + (localSelectedFeatures.toString()) + " the accuracy is " + result);

            // saving maximum accuracy for all the feature so far
            var temp = maxAccuracy;
            maxAccuracy = Math.max(result, maxAccuracy);

            if (temp < maxAccuracy) {
                finalBestAttributes = localSelectedFeatures;
            }
            // saving the current iteration's best accuracy for features
            if (result > currBestAccuracy) {
                currBestAccuracy = result;
                currBestFeature = i;
            }
        }
        // adding current best feature to selectedFeatures list which has best accuracy so far
        selectedFeatures.push(currBestFeature);
        // setting visited flag for current feature
        featuresVisited[currBestFeature] = true;
        console.log("Selecting best features " + (selectedFeatures) + " with accuracy " + currBestAccuracy);
    }

    maxAccuracy *= 100;
    console.log("----------------------------------------------------------------------------------------");
    console.log("Final best features for forward selection are " + (finalBestAttributes) + " and the accuracy is " + (maxAccuracy).toFixed(2) + "%");
    console.log("----------------------------------------------------------------------------------------");
}

function backwardElimination(dataList) {
    // To store the maximum accuracy value for selected features
    var maxAccuracy = Number.MIN_VALUE;
    // storing the best feature for forward selection in this list
    var finalBestAttributes = [];
    var numOfFeature = dataList[0].length;
    // Flag to check if the feature already visited for the same entry
    var featuresVisited = [];

    var selectedFeatures = [];
    for (var i = 1; i < numOfFeature; i++) {
        selectedFeatures.push(i);
    }
    for (var j = 0; j < numOfFeature; j++) {
        var currBestAccuracy = 0;
        var currBestFeature = 0;
        for (var i = 1; i < numOfFeature; ++i) {

            // Saving the selected features after each iteration to current selection
            var localSelectedFeatures = [];
            localSelectedFeatures = [...selectedFeatures];
            if (featuresVisited[i]) {
                continue;
            }
            // skipping removal for the first iteration
            if (j != 0) {
                localSelectedFeatures = removeElementFromList(localSelectedFeatures, i);
            }

            // Calculating the accuracy by checking each localSelectedFeatures
            var correctlyPredictedTypeCount = 0;
            for (var eachdata = 0; eachdata < dataList.length; eachdata++) {
                if (calculateAccuracy(eachdata, dataList, localSelectedFeatures)) {
                    correctlyPredictedTypeCount++;
                }
            }
            var result = (correctlyPredictedTypeCount) / dataList.length;

            // saving maximum accuracy for all the feature so far
            var temp = maxAccuracy;
            maxAccuracy = Math.max(result, maxAccuracy);

            if (temp < maxAccuracy) {
                finalBestAttributes = localSelectedFeatures;
            }

            console.log("For the features " + (localSelectedFeatures) + " the accuracy is " + result);

            // saving the current iteration's best accuracy for features
            if (result > currBestAccuracy) {
                currBestAccuracy = result;
                currBestFeature = i;
            }
            if (j == 0) {
                break;
            }
        }
        // skipping removal for the first iteration
        if (j != 0) {
            selectedFeatures = removeElementFromList(selectedFeatures, currBestFeature);
            featuresVisited[currBestFeature] = true;
        }

        console.log("Selecting best features " + (selectedFeatures) + " with accuracy " + currBestAccuracy);
    }

    maxAccuracy *= 100;
    console.log("----------------------------------------------------------------------------------------");
    console.log("Final best feature for backward elimination is " + (finalBestAttributes) + " and the accuracy is " + (maxAccuracy).toFixed(2) + "%");
    console.log("----------------------------------------------------------------------------------------");
}

function calculateAccuracy(index, dataList, localSelectedFeatures) {
    // Selecting the data point based on the index provided
    var givenDataPoint = dataList[index];
    var minDistSquared = Number.MAX_VALUE;
    var predictedType = 0;
    // Iterate through each data points
    for (var i = 0; i < dataList.length; i++) {
        if (i == index) {
            continue;
        }
        var currDistSquared = 0;
        var currPoint = dataList[i];

        //Calculating euclidean distance for givenDataPoint from all other data points
        for (var j of localSelectedFeatures) {
            currDistSquared += (currPoint[j] - givenDataPoint[j]) * (currPoint[j] - givenDataPoint[j]);
        }
        // predict the type by comparing the current DataPoint with all other data points
        if (currDistSquared < minDistSquared) {
            minDistSquared = currDistSquared;
            predictedType = Number.parseInt(currPoint[0]);
        }
    }
    // Checking if the provided data point type is same as predicted type
    return Number.parseInt(givenDataPoint[0]) == predictedType;
}

// Utility function to remove provided element from list
function removeElementFromList(arr, value) {
    return arr.filter(function (temp) {
        return temp != value;
    });
}
