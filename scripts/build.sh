rm -rf build/npm && \
./node_modules/.bin/babel -d build/npm/lib ./src && \
cp README.md build/npm && \
node -p 'p=require(\"./package\"); p.main=\"lib\"; p.scripts=p.devDependencies=undefined; JSON.stringify(p,null,2)' > build/npm/package.json
