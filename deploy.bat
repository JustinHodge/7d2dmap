cd dist
git init
git checkout -b master
git add -A
git commit -m deploy
git push -f git@github.com:JustinHodge/JustinHodge.github.io.git master
cd ..
