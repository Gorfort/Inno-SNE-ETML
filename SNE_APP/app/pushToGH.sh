cd ../..
git add .
git commit -m $1
git push origin $2
git checkout develop
sleep 5
