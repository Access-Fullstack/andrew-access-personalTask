## Task

Create a system that can accept up to 300, 000 records and dispatches these records in batches of 100 to 1000
over a period of 6hours.
note - Source of data can come from endpoint or a csv/excel file - Batches should not be less than 100 and not more than 1000 - Time to dispatch all records should be within 6hours or less. - Your application will be dispatching to an endpoint (edited)

## Steps
1. Add an input folder to your root directory
2. Inside the input folder add a csv or an excel file
3. Add a csvOutput folder to your root directory
4. Add a excelOutputs folder to your root directory
5. In src folder- pass the files you want to read into the getPathDirectory fnx in the anlysis file
6. Run npm install to install dependencies
7. Run npm compile to compile typescript
8. Run npm start to run your app

### Hurray