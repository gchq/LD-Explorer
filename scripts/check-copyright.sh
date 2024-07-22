#!/bin/sh
copyright_notice="Crown Copyright GCHQ"
missing=0

for i in  $(find ./src ./e2e ./test -name '*.ts' -o -name '*.svelte'); 
do
  if ! grep -q "$copyright_notice" $i
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