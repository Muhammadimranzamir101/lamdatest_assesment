# lamdatest_assesment

Here are the steps to run the playwright tests with gitpod on labmda test
1. Open the repo on gitpod.
2. run "npm install" to install the packages.
3. run "npx playwright install-deps" to install dependencies that is required by the gitpod.
4. run the following commands to save your LambdaTest Credentials to Gitpod as environment variables:
   eval $(gp env -e LT_USERNAME=******)
   eval $(gp env -e LT_ACCESS_KEY=******)
5. Now to run the single test case run the below command in terminal
   npx playwright test "testFileLocation"
6. To run the all test cases in parallel run the below command in terminal.
   npx playwright test
   
