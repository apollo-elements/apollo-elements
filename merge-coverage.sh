for f in packages/*; do
  if [ -d $f -a -d $f/coverage ]; then
    echo $f;
    ./cc-test-reporter format-coverage -t lcov -o coverage/coverage.${f//\//-}.json $f/coverage/lcov.info;
  fi
done;
