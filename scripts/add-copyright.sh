#!/bin/sh

copyright_notice="(c) Crown Copyright GCHQ"

# Typescript files 
for i in $(find ./src ./e2e ./test -name '*.ts'); 
do
  if ! grep -q "$copyright_notice" $i
  then
    echo "Writing crown copyright header to $i" 
    echo "/* $copyright_notice */\n" | cat - $i > $i.new && mv $i.new $i
  fi
done

# Svelte files (note the different comment structure)
for i in $(find ./src ./e2e ./test -name '*.svelte'); 
do
  if ! grep -q "$copyright_notice" $i
  then
    echo "Writing crown copyright header to $i" 
    echo "<!-- $copyright_notice -->\n" | cat - $i > $i.new && mv $i.new $i
  fi
done



