### Contributing

Every change should be approved by TeamCity UI team.

### Build Process

The library is built on the public [TeamCity](https://teamcity.jetbrains.com/project/JetBrainsUi_TeamCityApiJs) server. 

**Publish Alpha** - build to publish from the `master` branch. Contains all non-stable features, that should be considered as release-candidates features.

**Publish Release** - build and publish from the `release/x.0` branches. Name represents the respective major version of the package.


### Commitment process:
Every major update requires developer to **manually change the version field** in the package.json so the CI could properly increment the version.
For example, transferring from 1.0.0 > 2.0.0 should be achieved with following change: 1.0.0-alpha.10 -> 2.0.0-alpha.0.

Please, use the ```npm run commit```. This way you'll get the CLI tool, that helps you writing proper description.
