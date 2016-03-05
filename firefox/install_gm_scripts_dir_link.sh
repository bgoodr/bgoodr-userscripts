#!/bin/bash

GIT_GM_SCRIPTS_DIR="$1"
if [ -z "$GIT_GM_SCRIPTS_DIR" ]
then
  if [ -d ./gm_scripts ]
  then
    GIT_GM_SCRIPTS_DIR=$(readlink -f ./gm_scripts)
    echo "Note: No GIT_GM_SCRIPTS_DIR supplied. Defaulting to:"
    echo "      $GIT_GM_SCRIPTS_DIR"
  else
    echo "USAGE: $0 GIT_GM_SCRIPTS_DIR"
    exit 0
  fi
fi

# No, don't do this: pkill firefox
# Let the user decide when to close firefox.
if pgrep firefox 1>/dev/null
then
  echo "Note: Firefox is running. Close it first before updating"
  exit 0
fi

# Find the Firefox profile directory (http://askubuntu.com/a/354907/340383) :
firefox_head_dir=$HOME/.mozilla/firefox
def_Pfile=$(cat "$firefox_head_dir/profiles.ini" | sed -n -e 's/^.*Path=//p' | head -n 1)

# Locate the GreaseMonkey scripts directory:
gm_scripts_dir=$firefox_head_dir/$def_Pfile/gm_scripts

# Avoid installing if the link is already installed:
if [ -h $gm_scripts_dir ]
then
  echo "Note: gm_scripts directory at $gm_scripts_dir"
  echo "      is a symbolic link to $(readlink -f $gm_scripts_dir)"
  echo "      Nothing to do."
  exit
fi

if [ "$(readlink -f $GIT_GM_SCRIPTS_DIR)" = "$(readlink -f $gm_scripts_dir)" ]
then
  echo "ERROR: $GIT_GM_SCRIPTS_DIR"
  echo "       resolves to the same thing as"
  echo "       $gm_scripts_dir"
  exit 1
fi


# Avoid modifying existing "real" greasemonkey script directories. Let
# the user handle that manually:
if [ -d $gm_scripts_dir ]
then
  # But only if it contains files and is not just stubbed out by the GreaseMonkey extension:
  if [ -n "$(cd $gm_scripts_dir; find . -maxdepth 1 | grep -v '^\.$' )" ]
  then
    echo "Note: Greasemonkey scripts directory already exists: $gm_scripts_dir"
    echo "      Cowardly refusing to modify."
    exit 0
  fi
  echo "Note: Removing empty gm_scripts directory at $gm_scripts_dir"
  rm -rf $gm_scripts_dir
fi

echo "Note: Creating link"
set -x
ln -s $GIT_GM_SCRIPTS_DIR $gm_scripts_dir
