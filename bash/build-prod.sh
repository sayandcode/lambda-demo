rimraf dist/
yarn ncc build src/index.lambda.ts -m -o dist
sam build
