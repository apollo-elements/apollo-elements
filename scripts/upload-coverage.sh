./cc-test-reporter sum-coverage codeclimate.*.json -p 2 -o codeclimate.total.json
./cc-test-reporter upload-coverage -i codeclimate.total.js
