# TechnicalTest

# HOW TO RUN
1. From console, do "npm install" (without quotaion marks)
2. After Node.js is installed, do "npm install mocha chai chai-http axios --save-dev" (without quotation marks). These dependencies are required for running the tests.
3. Type "npx mocha apiTest.js --reporter mochawesome --reporter-options reportDir=reports,reportFilename=index,quiet=true" (without quotation marks) to run the tests and generate the report.
4. Within source code files, navigate to "reports" directory and open "index.html" to show the generated report test.
