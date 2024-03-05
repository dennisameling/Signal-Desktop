<!-- Copyright 2014-2021 Signal Messenger, LLC -->
<!-- SPDX-License-Identifier: AGPL-3.0-only -->
# Signal Unofficial (arm64)

This repository is a fork of the official Signal destop with added support for arm64 on Windows and Linux. You can download our [releases](https://github.com/dennisameling/Signal-Desktop/releases) for your device.

On Linux ARM64, use the Pi-Apps store to keep it up to date.  
[![badge](https://github.com/Botspot/pi-apps/blob/master/icons/badge.png?raw=true)](https://github.com/Botspot/pi-apps)  
Pi-Apps will monitor this repo for new releases and will request to install new versions from here as they become available.  

## Ending support for Signal Unofficial on macOS

The Signal team has introduced official Apple Silicon support in version [5.27.1](https://github.com/signalapp/Signal-Desktop/releases/tag/v5.27.1). This means that we won't be creating new builds of Signal Unofficial on macOS moving forward as there's no need for it anymore. The good news is that you can keep your message history when switching back to the official client!

1. Download the official macOS client [from the Signal website](https://signal.org/nl/download/).
2. Follow the steps in the "Migrate from Signal Unofficial to Signal Official" section below to copy your data over to the official client
3. Enjoy official Signal Apple Silicon support!

Version **5.33.0** will be the final macOS build of Signal Unofficial. New versions will only be released for the Windows platform moving forward. Users will see an in-app dialog telling them to switch over to the official client.

## Tips and Tricks
### Migrate from Signal Unofficial to Signal Official on macOS using the terminal (recommended when Signal Official has arm64 support)

```mv ~/Library/Application\ Support/Signal ~/Library/Application\ Support/SignalBACKUP && cp -R -v ~/Library/Application\ Support/Signal\ Unofficial ~/Library/Application\ Support/Signal```

1. This backs up the Signal folder
1. Then it overwrites the Signal folder with the Signal Unofficial folder.

### Migrate from Signal Official to Signal Unofficial on macOS using the terminal

```mv ~/Library/Application\ Support/Signal\ Unofficial ~/Library/Application\ Support/Signal\ UnofficialBACKUP && cp -R -v ~/Library/Application\ Support/Signal ~/Library/Application\ Support/Signal\ Unofficial```

1. This backs up the Signal Unofficial folder
1. Then it overwrites the Signal Unofficial folder with the Signal folder.

## Contributing Funds

You can donate to the official Signal development through the [Signal Technology Foundation](https://Signal.org/donate), an independent 501c3 nonprofit.

## Cryptography Notice

This distribution includes cryptographic software. The country in which you currently reside may have restrictions on the import, possession, use, and/or re-export to another country, of encryption software.
BEFORE using any encryption software, please check your country's laws, regulations and policies concerning the import, possession, or use, and re-export of encryption software, to see if this is permitted.
See <http://www.wassenaar.org/> for more information.

The U.S. Government Department of Commerce, Bureau of Industry and Security (BIS), has classified this software as Export Commodity Control Number (ECCN) 5D002.C.1, which includes information security software using or performing cryptographic functions with asymmetric algorithms.
The form and manner of this distribution makes it eligible for export under the License Exception ENC Technology Software Unrestricted (TSU) exception (see the BIS Export Administration Regulations, Section 740.13) for both object code and source code.

## License

Copyright 2013-2021 Signal, a 501c3 nonprofit

Licensed under the AGPLv3: https://opensource.org/licenses/agpl-3.0
