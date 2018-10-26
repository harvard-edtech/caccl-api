if [ -f ./test/environment.js ];
then
  mocha --exit --recursive --timeout 12000 --reporter spec
else
  echo "\n\n----------------------- Oops! -----------------------"
  echo "To run tests, you need to set up a Canvas environment"
  echo "View /test/environment.js for instructions."
  echo "-----------------------------------------------------\n\n"
fi