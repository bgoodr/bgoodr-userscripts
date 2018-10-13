#!/bin/bash

echo "ERROR: This script no longer works as someone changed how gm scripts are stored under the firefox profile directory."
exit 1

usage () {
  cat <<EOF
Usage: $0 GIT_GM_SCRIPTS_DIR

Install a symbolic link from the gm_scripts directory in the default
Firefox profile directory, to the directory given by
GIT_GM_SCRIPTS_DIR.

If the gm_scripts directory is already a symbolic link, nothing is
done.

If the gm_scripts directory is a real directory, nothing is done
either. The user will likely need to copy the directory off first,
commit it to GitHub, and then run the script on it.

EOF
}

GIT_GM_SCRIPTS_DIR="$1"
if [ -z "$GIT_GM_SCRIPTS_DIR" ]
then
  usage
  exit 0
fi

# Make GIT_GM_SCRIPTS_DIR a fully-qualified path:
GIT_GM_SCRIPTS_DIR=$(readlink -f $GIT_GM_SCRIPTS_DIR)

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

echo "Note: Creating link from $GIT_GM_SCRIPTS_DIR to $gm_scripts_dir"
set -x
ln -s $GIT_GM_SCRIPTS_DIR $gm_scripts_dir
