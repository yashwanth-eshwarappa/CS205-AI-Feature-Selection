# CS205-AI-Feature-Selection


# Introduction:

This project is for the Introduction to AI course, part of the project assigned by professor Dr. Eamonn Keogh during the Spring 2022 quarter at University of California Riverside.

In this project, nearest neighbor classifier is implemented through two different types of
searches - forward selection and backward elimination. The best feature/features are selected
based on accuracy rates after searching for the dataset provided.
The progeam code is written in JavaScript and used node.js runtime. Based on the search
algorithm selected, the solution provides accuracy rates for various combinations of features.
Using the accuracy rates, best set of features are selected for nearest neighbor classifier.
Feature Selection Algorithms
# Forward Selection
In this implementation, empty set is the initial feature selection. After each iteration, we continue
adding new features. Based on the accuracy, the best feature is selected for each iteration, and
ii is then compared with the other data points. By using the Euclidean squared distance formula,
we can find a nearest neighbour for each pair of data points. Repeating the process for each
pair of points will cover all the features. During a run, the algorithm will keep track of the best
features selected so far and use that to select the next best feature set. To calculate how
accurate the selected feature is, we look at how many times the feature selection algorithm
predicts the data type correctly.
# Backward Elimination
In this implementation, we are performing the opposite operation from forward selection. All
features are initially selected, i.e., we select all of them at once. After each relation we remove 1
feature and check the current best features available for the rest of feature combinations. The
Euclidean distance formula is considered to find the nearest neighbors for all the features in the
dataset. This process is followed till we reach the empty set. We even check the empty set and
check if thats better than selection of features.
Performance Analysis
The below graphs allow us to analyze the forward selection algorithm for small test data and
large test data. For small test data, we can see that features [3, 10] have the highest selection
accuracy, and for large test data, features [22, 11] have the highest selection accuracy. The
accuracy of a computational algorithm declines as more features are included, indicating that
adding too many features will reduce its usefulness when determining a data point's nearest
neighbor.
![image](https://user-images.githubusercontent.com/97561730/182485727-6d740c50-1093-4649-9840-d802e34341cd.png)
![image](https://user-images.githubusercontent.com/97561730/182485742-4c62c8ee-5c9e-4708-832a-f231f8661bd8.png)

The below graphs allow us to analyze the backward elimination algorithm for small test data and
large test data. For small test data, we can see that features [3, 10] have the highest selection
accuracy, and for large test data, features [22, 32] have the highest selection accuracy. With
more features, accuracy is lesser than many, indicating that we only need features the are more
relevant for the type which can be chosen that has better accuracy. And hence features with
highest accuracy is optimal for finding the nearest neighbor for a given data points.
![image](https://user-images.githubusercontent.com/97561730/182485657-ed49c5d5-c8c3-4806-98f9-72ca6d52ecbd.png)
![image](https://user-images.githubusercontent.com/97561730/182485668-8ff5aaca-86b4-49e7-b055-1917b9c544f4.png)

