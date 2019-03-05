cp -Rf node_modules/@webcomponents/webcomponentsjs docs
rollup -c docs/rollup.config.js

lerna run docs --stream

for p in $( ls packages ); do
  if [ -d packages/$p/docs ]; then
    q=$(echo $p | sed -e "s/packages\///g")
    echo "Copying packages/$p/docs to docs/$q/"
    rsync -a --delete packages/$p/docs/ docs/$q/
  fi
done
