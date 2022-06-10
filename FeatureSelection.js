const fs = require('fs');
const readline = require('readline');

// Creating a readable stream from file
// readline module reads line by line 
// but from a readable stream only.
// const file = readline.createInterface({
//     input: fs.createReadStream(process.cwd() + '/CS205_CalibrationData__1.txt'),
//     output: process.stdout,
//     terminal: false
// });

var dataList = [];

async function readData() {
    const fileStream = fs.createReadStream(process.cwd() + '/CS205_CalibrationData__1.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    for await (var line of rl) {
        var list = [];
        for (var each of line.trim().split(/\s+/)) {
            list.push(Number.parseFloat(each));
        }
        dataList.push(list);
    }
}

function forwardSelection(dataList) {
    var returnString = "<h2><u>Forward Selection</u></h2>";
    console.log(dataList[0].length);
    var numOfFeature = dataList[0].length;

    console.log(numOfFeature - 1);

    var featuresVisited = [];
    var selectedFeatures = [];
    var finalBestAttributes = [];
    var maxAccuracy = Number.MIN_VALUE;

    //taking each feature 
    for (var j = 1; j < numOfFeature; j++) {

        var bestAccurancyThisTurn = 0;
        var bestAttributeToAdd = 0;

        for (var i = 1; i < numOfFeature; i++) {

            var localSelectedFeatures = [];

            // console.log(selectedFeatures);

            localSelectedFeatures = [...selectedFeatures];

            if (featuresVisited[i]) {
                continue;
            }

            localSelectedFeatures.push(i);

            var correctlyPredictedTypeCount = 0;
            for (var eachdata = 0; eachdata < dataList.length; eachdata++) {
                if (calculateAccuracy(eachdata, dataList, localSelectedFeatures)) {
                    correctlyPredictedTypeCount++;
                }
            }
            var result = (correctlyPredictedTypeCount) / dataList.length;

            // console.log(localSelectedFeatures);
            returnString += "For the features " + (localSelectedFeatures.toString()) + " the accuracy is " + result + "<br>";
            // console.log("->with features " + (localSelectedFeatures.toString()) + " the accuracy is " + result);

            var temp = maxAccuracy;
            maxAccuracy = Math.max(result, maxAccuracy);

            if (temp < maxAccuracy) {
                // finalBestAttributes.clear();
                finalBestAttributes = localSelectedFeatures;
            }

            if (result > bestAccurancyThisTurn) {
                bestAccurancyThisTurn = result;
                bestAttributeToAdd = i;
            }
        }

        selectedFeatures.push(bestAttributeToAdd);
        featuresVisited[bestAttributeToAdd] = true;
        returnString += "<b>Selecting best features " + (selectedFeatures) + " with accuracy " + bestAccurancyThisTurn + "</b><br>";
        console.log("Selecting best features " + (selectedFeatures) + " with accuracy " + bestAccurancyThisTurn);
    }
    returnString += "<h3><b>Final best feature for forward selection is " + (finalBestAttributes) + " and the accuracy is " + maxAccuracy + "</b></h3><br>";
    console.log("Final best feature for forward selection is " + (finalBestAttributes) + " and the accuracy is " + maxAccuracy);

    return returnString;
}

function calculateAccuracy(index, dataList, localSelectedFeatures) {

    var testerPoint = dataList[index];
    var minDistanceSquared = Number.MAX_VALUE;
    var predictedType = 0;
    for (var i = 0; i < dataList.length; i++) {
        if (i == index) {
            continue;
        }

        var curDistanceSquared = 0;
        var candidatePoint = dataList[i];

        for (var j of localSelectedFeatures) {
            curDistanceSquared += (candidatePoint[j] - testerPoint[j]) * (candidatePoint[j] - testerPoint[j]);
        }
        if (curDistanceSquared < minDistanceSquared) {
            minDistanceSquared = curDistanceSquared;
            predictedType = Number.parseInt(candidatePoint[0]);
        }
    }
    return Number.parseInt(testerPoint[0]) == predictedType;
}


