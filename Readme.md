[![official JetBrains project](https://jb.gg/badges/official-flat-square.svg)](https://confluence.jetbrains.com/display/ALL/JetBrains+on+GitHub)

# TeamCity UI Library

This module contains components and utilities used in TeamCity UI. It can also be used as a helper in time you develop the Plugin for the TeamCity. 

**Warning! This module is still under active development.** 
 
There are some useful resources for this repository:
* [JetBrains / TeamCity Blog post about the UI Plugins](https://blog.jetbrains.com/teamcity/2020/09/teamcity-2020-2-updated-plugin-development)
* [JetBrains / TeamCity UI Plugin Development Documentation](https://plugins.jetbrains.com/docs/teamcity/front-end-extensions.html)

## Usage

To start using the package, import it as a module:

``import TeamCityUI from "@jetbrains/teamcity-ui"``

Module contains a bunch of useful items to assist you during plugin development. The set of items is not in a final version yet. 

`Components` &mdash; set of reusable TeamCity Components.

`utils` &mdash; set of utilities
 
```utils.requestJSON``` &mdash; function to request and parse a JSON from the server. It already contains all the headers for the request and automatically parses the response.

```utils.requestTEXT``` &mdash; function to request and parse a TEXT from the server. It already contains all the headers for the request and automatically parses the response.

```Plugin``` &mdash; plugin constructor. It expects you to specify PlaceID and content options as arguments (read more about controlled plugins).
                                  
```pluginRegistry``` &mdash; plugin registry which you could use to find a certain instance of your plugin.
                                  

## Feedback, feature-requests and bug-reports

There is a dedicated tag in YouTrack: [SakuraUI-plugin](https://youtrack.jetbrains.com/issues/TW?q=%23SakuraUI-Plugins%20). Using the Fix Version property you can filter the tasks, which are going to be released in the next Major / Minor version of TeamCity.
 
Feel free to write us a line, if you have any feedback about the Plugins and this Module. 

Wish you a happy coding!

