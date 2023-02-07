### Contributing

This package reflects all changes implemented in TeamCity Core. Every change should be approved by TeamCity UI team.

### Build Process

The bundle is built on the public [TeamCity](https://teamcity.jetbrains.com/project/JetBrainsUi_TeamCityApiJs) server. 

**Publish Alpha** - build to publish from the `master` branch. Contains all non-stable features, that should be considered as release-candidates features.

**Publish Release** - build and publish from the `release/20XX.YY` branches. Name convention follows the respective TeamCity versioning convention:
YEAR.MONTH (e.g. 2022.03, 2023.05, etc).


### Commitment process:
Every major update requires developer to **manually change the version field** in the package.json so the CI could properly increment the version.
For example, transferring from 2023.3 > 2023.5 should be followed by next change: 2023.3.1-alpha.10 -> 2023.5.1-alpha.0.

Please, use the ```npm run commit```. This way you'll get the CLI tool, that helps you writing proper description.
