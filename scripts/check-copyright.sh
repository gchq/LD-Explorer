#!/bin/sh

missing=0

for i in  $(find ./src ./e2e ./test -name '*.ts' -o -name '*.svelte'); 
do
  if ! grep -q "Crown Copyright GCHQ" $i
  then
    echo "Missing copyright notice in $i"
    missing=$((missing + 1))
  fi
done


  if [ "$missing" -gt 0 ]
  then
    echo "Add copyright headers with: npm run copyright:write"
    exit 1
  fi