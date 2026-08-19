#!/usr/bin/env bash
# Build the Astro site and publish dist/ to the `master` branch (GitHub Pages).
# Run from any source branch (dev). Source history stays on the current branch;
# only the built output lands on master.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEPLOY_BRANCH="master"
WORKTREE="$(mktemp -d)"

cd "$REPO_ROOT"

if [ -n "$(git status --porcelain)" ]; then
  echo "✖ Working tree has uncommitted changes. Commit them to your source branch first." >&2
  exit 1
fi

echo "▶ Building…"
npm run build
touch dist/.nojekyll

echo "▶ Publishing dist/ to $DEPLOY_BRANCH…"
git fetch origin "$DEPLOY_BRANCH"
git worktree add --force "$WORKTREE" "$DEPLOY_BRANCH" >/dev/null
trap 'git worktree remove --force "$WORKTREE" 2>/dev/null || true' EXIT

find "$WORKTREE" -maxdepth 1 ! -name .git ! -path "$WORKTREE" -exec rm -rf {} +
cp -R "$REPO_ROOT/dist/." "$WORKTREE/"

cd "$WORKTREE"
git add -A
if git diff --cached --quiet; then
  echo "▶ No changes to deploy."
else
  git commit -q -m "Deploy $(git -C "$REPO_ROOT" rev-parse --short HEAD)"
  git push origin "$DEPLOY_BRANCH"
  echo "✓ Deployed to $DEPLOY_BRANCH."
fi
