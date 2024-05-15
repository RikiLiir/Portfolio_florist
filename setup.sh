#!/bin/bash
echo "Installing npm dependencies for API..."
cd ./my-app || { echo "Error: Directory ./api not found."; exit 1; }
npm install

if [ $? -ne 0 ]; then
    echo "Error: npm install failed for API."
    read -p "Press Enter to continue..."
    exit 1
fi
echo "npm install completed successfully for Api"
cd ..


echo "Installing npm dependencies for Client..."
cd ./server || { echo "Error: Directory Client not found."; exit 1; }
npm install

if [ $? -ne 0 ]; then
    echo "Error: npm install failed for Client."
    read -p "Press Enter to continue..."
    exit 1
fi
echo "npm install completed successfully for Client."
cd ..

echo "npm install completed successfully for both directories."
read -p "Press Enter to continue..."