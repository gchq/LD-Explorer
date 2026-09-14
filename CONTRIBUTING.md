# How To Contribute

## Discuss significant changes first

We strongly encourage contributors to engage with the maintainers before starting work on any significant change.

An open issue should not be taken as approval to implement a solution. There may be additional context, design considerations, project priorities, or future plans that are not immediately apparent from the issue alone.

A short discussion up front can save a considerable amount of time for everyone involved and increase the likelihood that your contribution will be accepted. Whilst we appreciate and encourage contributions, we do not want to unnecessarily waste anyone's time by having them work on changes that may not align with the project's goals or direction.

For anything beyond a small bug fix or documentation change, please seek maintainer feedback before investing significant effort. Pull requests implementing substantial changes without prior discussion may be declined, even when the implementation itself is of a high quality.


## Raising issues

If you found a bug or you'd like a new feature or change, you can [file an issue](https://github.com/gchq/ld-explorer/issues). Please provide full details of your issue, and if its a bug, ideally steps to reproduce.

Before making a new one, please search the existing issues to check if your change has already been requested. Comment on an issue to let us know you're interested.

## Versioning

LD Explorer intends to follow [Semantic Versioning 2.0](https://semver.org/), which can be summarised roughly as follows:

- MAJOR version for incompatible or breaking changes, deprecated features or anytihng that prevents the user doing what they could previously do.
- MINOR version for any new functionality, or when marking existing functionality as deprecated.
- PATCH for backward compatible bug fixes or changes that the user isn't necessarily aware of. This includes upgrading dependencies and refactoring code.

Note that LD Explorer is currently in **Initial Development** and currently has a version number `0.x.x`. As per the Semantic Versioning specification, this means that anything MAY change at any time and the public API SHOULD NOT be considered stable. We will consider moving to `1.0.0` once we have observed that the software has proved its value and has a community of users.

## Contributing code

Prior to us accepting any work, you must sign the [GCHQ CLA Agreement](https://cla-assistant.io/gchq/ld-explorer). We follow a branching strategy for handling contributions:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/new_thing`)
3. Commit your Changes (`git commit -m 'Add a new thing'`)
4. Push to the Branch (`git push origin feature/new_thing`)
5. Open a Pull Request

You can contribute code for any issue by raising a pull request from your own fork of the repository. Raise an issue for your change if there isn't one already.

Please engage with us before undertaking any significant amount of work and before starting work on any new features.

### Code Quality

Despite this being prototype software, we have still tried to keep the code to a high standard. Code quality is currently automated through various built-time checks (eslint, typescript...) which need to pass before pull requests will be accepted. Code quality will also be assured manually by trusted maintainers on any pull request.

### Tests

Before opening a pull request, please ensure that the tests pass. See [Readme.md](./README.md) for details.

## Code of conduct

See [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).
