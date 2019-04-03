if [ "$CIRCLE_PULL_REQUEST" == "false" ]; then
  echo "Formatting Coverage Reports..."
  ./cc-test-reporter format-coverage -t lcov -o coverage/coverage.total.json coverage/lcov.info;

  echo "Uploading Coverage Reports..."
  ./cc-test-reporter upload-coverage -i coverage/coverage.total.json;

  rm -f cc-test-reporter
fi
