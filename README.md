**Note:**
This component currently only supports Framer X51 and earlier. Due to changes in preview architecture in Framer Desktop, this component is not yet compatible

**TLDR:**
- Run `npx framer-local-live-preview` in a terminal
- Drop this component into your prototype
- Follow the instructions in the component to connect your prototype to the live preview server

A component that provides the same functionality as Framer's live preview without requiring an internet connection or creating a tunnel between your machine and the cloud. This project covers 3 main use cases:

## Restricted networks

If you're running within a restricted/corporate network you may have issues using the live preview functionality that ships with Framer due to the nature of the implementation. This project mitigates that by running locally within the network and not serving any of your project's assets on an externally accessible URL.

## Prototyping with hardware

By providing a consistent URL for your prototype to be served on you can easily connect external hardware through the local network. You'll immediately see changes reflected on connected hardware as you make changes in Framer Desktop.

## Multi-screen prototypes

If you're building a multi-screen prototype with Framer, you've probably ran into the following issues:

- Framer doesn't serve your prototype on the network
- The port the preview runs on is unpredictable
- You need to make a web export of your project every time you make a change want to preview it on other hardware

This project simplifies that by implementing path-based routing using a consistent URL. You can run the [server](https://github.com/iKettles/framer-local-live-preview) on a computer within your network or even on a Raspberry Pi, giving you a predictable URL you can use for any other devices that need to display your Framer prototype.

## Setup

This project consists of 2 parts:

- [Framer Local Live Preview Server](https://github.com/iKettles/framer-local-live-preview)
- This package

See the [docs](https://github.com/iKettles/framer-local-live-preview) on how to setup the live preview server.

* Drop the `LivePreviewTarget` component into your project and ensure it’s placed within a frame you’re previewing
* Set the server URL to what you see in the logs of the server, by default it's `http://localhost:8080`.
* Set the project ID to something unique and URL friendly
* Press Cmd + P/click the play button to preview your project **(the in-app preview needs to be open for the preview server to function)**
* If Instructions are set to show, you’ll see the URLs assigned to your project in the preview window. You can hide the instructions after.
* Go to http://localhost:8000/my-unique-id to preview your project

If you have any problems using this package, feel free to reach out to me directly on [Twitter](https://twitter.com/iKettles), on the [Framer Public Slack](https://framer.slack.com) or on [GitHub](https://github.com/iKettles/framer-local-live-preview-component)