---
title: Debug Log Manager — a published WordPress.org plugin
description: A free plugin on the WordPress.org repository that lets developers toggle WP_DEBUG and related wp-config constants and read the debug log straight from the admin — no SSH or manual file edits.
url: https://wordpress.org/plugins/debug-log-config-tool/
date: 2026-07-18
draft: false
---

**Debug Log Manager** is a small developer tool I ship on the public
[WordPress.org plugin repository](https://wordpress.org/plugins/debug-log-config-tool/).
It turns the usual "SSH in, edit `wp-config.php`, tail the log, edit it back"
dance into a couple of clicks inside the WordPress admin.

It sits outside my product work at WPManageNinja — a standalone plugin I own end to
end, from the `wp-config` handling to the readme, screenshots, and the WordPress.org
submission and review process.

## What it does

- Toggle `WP_DEBUG`, `WP_DEBUG_LOG`, `WP_DEBUG_DISPLAY`, and related constants from a
  settings screen instead of editing `wp-config.php` by hand.
- Read, filter, and clear `debug.log` from the admin — no file manager or terminal.
- Safe writes to `wp-config.php` that don't clobber existing configuration.

## Why it's worth showing

It's proof of shipping in public: passing the WordPress.org plugin guidelines and
review, maintaining it against new WordPress versions, and owning the whole
lifecycle of a real, installable product — not a demo. The kind of unglamorous
developer tooling that has to keep working on sites I'll never see.

*(Free on the [WordPress.org plugin directory](https://wordpress.org/plugins/debug-log-config-tool/).)*
