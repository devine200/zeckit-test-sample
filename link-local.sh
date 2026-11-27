#!/bin/bash
# ============================================================
# Link Local ZecKit Setup
# ============================================================
# Create .zeckit-action as a local symlink to ../ZecKit.
# The checked-in workflows select their action through their own uses entries.
# ============================================================

ZECKIT_SOURCE="../ZecKit"
LINK_NAME=".zeckit-action"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ZecKit Local Linker"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 1. Check if source exists
if [ ! -d "$ZECKIT_SOURCE" ]; then
    echo ":: Error: Source project not found at $ZECKIT_SOURCE"
    exit 1
fi

# 2. Handle existing link/folder
if [ -e "$LINK_NAME" ] || [ -L "$LINK_NAME" ]; then
    echo ":: Removing existing $LINK_NAME..."
    rm -rf "$LINK_NAME"
fi

# 3. Create symlink
echo ":: Linking $ZECKIT_SOURCE -> $LINK_NAME"
ln -s "$ZECKIT_SOURCE" "$LINK_NAME"

echo ":: OK! Local linkage activated."
echo "   $LINK_NAME points to $ZECKIT_SOURCE."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
