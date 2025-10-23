#!/bin/bash

# Script para gerar um tarball de teste com react-native apontando para lib/ em vez de src/

set -e

echo "📦 Criando tarball para teste local..."

# Certificar que a lib está compilada
yarn build

# Fazer backup do package.json
cp package.json package.json.backup

# Modificar o campo react-native para apontar para lib/module/index
echo "🔧 Modificando package.json temporariamente..."
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg['react-native'] = 'lib/module/index';
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
console.log('✓ react-native field alterado para:', pkg['react-native']);
"

# Gerar o tarball
echo "📦 Gerando tarball..."
npm pack --silent

# Restaurar o package.json original
echo "🔄 Restaurando package.json original..."
mv package.json.backup package.json

TARBALL=$(ls flourish-sdk-react-native-*.tgz | tail -1)

echo ""
echo "✅ Tarball criado com sucesso: $TARBALL"
echo ""
echo "Para instalar no exemplo, execute:"
echo "  cd example"
echo "  yarn remove flourish-sdk-react-native"
echo "  yarn add ../$TARBALL"
echo "  rm -rf android/app/build android/build"
echo "  npx react-native start --reset-cache"
