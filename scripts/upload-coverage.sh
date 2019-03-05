if [ "$CIRCLE_PULL_REQUEST" == "false" ]; then
    for f in packages/*; do
      if [ -d $f -a -d $f/coverage ]; then
        echo $f;
        ./cc-test-reporter format-coverage -t lcov -o coverage/coverage.${f//\//-}.json $f/coverage/lcov.info;
      fi
    done;
    ./cc-test-reporter sum-coverage -o coverage/coverage.total.json coverage/coverage.*.json;
    ./cc-test-reporter upload-coverage -i coverage/coverage.total.json;
  fi
