import * as React from "react"
import { Frame, addPropertyControls, ControlType, RenderTarget } from "framer"

const instructionsStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    fontSize: 13,
    fontWeight: 500,
    textAlign: "center",
    color: "#bb88ff",
    backgroundColor: "#2f2546",
    border: "1px solid #8855ff",
    paddingTop: 5,
    paddingRight: 10,
    overflow: "hidden",
}

const linkStyle: React.CSSProperties = {
    color: "#fff",
    fontWeight: "bold",
}

const errorMessageStyle: React.CSSProperties = {
    color: "#ff0000",
    fontWeight: "bold",
}

export function LivePreviewTarget(props) {
    const { proxyServerHost, prototypeIdentifier } = props
    const [proxyServerError, setProxyServerError] = React.useState(null)
    const [localhostUrl, setLocalhostUrl] = React.useState(null)
    const [localNetworkUrl, setLocalNetworkUrl] = React.useState(null)
    const [additionalHostUrl, setAdditionalHostUrl] = React.useState(null)
    const registerTarget = async () => {
        try {
            const response = await (
                await fetch(`${proxyServerHost}/v1/proxy-target`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        identifier: prototypeIdentifier,
                        url: window.location.host,
                    }),
                })
            ).json()
            setProxyServerError(null)
            setLocalhostUrl(response.result.localhostUrl)
            setLocalNetworkUrl(response.result.localNetworkUrl)
            setAdditionalHostUrl(response.result.additionalUrl || null)
        } catch (err) {
            console.error(err)
            setProxyServerError(err.message)
            setLocalhostUrl(null)
            setLocalNetworkUrl(null)
            setAdditionalHostUrl(null)
        }
    }

    React.useEffect(() => {
        if (
            RenderTarget.current() === RenderTarget.preview &&
            window.location.pathname.includes(
                "/_app/resources/Vekter/preview.html"
            ) &&
            proxyServerHost &&
            prototypeIdentifier
        ) {
            registerTarget()
        } else {
            setLocalhostUrl(null)
            setProxyServerError(null)
            setLocalNetworkUrl(null)
        }
    }, [proxyServerHost, prototypeIdentifier])

    if (!props.showInstructions) {
        return null
    }

    return (
        <Frame {...props} style={instructionsStyle}>
            <div style={{ overflow: "scroll", width: "100%", height: "100%" }}>
                <p>
                    1. Check the documentation for this package to see how to
                    start the live preview server. You need to start it before
                    previewing your prototype
                </p>
                <p>
                    2. Place this component anywhere within the frame you want
                    to preview
                </p>
                <p>
                    {proxyServerHost ? "✅" : "❌"} Set the live preview server
                    URL in the property controls for this component
                </p>
                <p>
                    {prototypeIdentifier ? "✅" : "❌"} Set the Project ID in
                    the property controls to the path you want your project to
                    be accessible from. It needs to be unique and URL friendly!
                </p>
                {proxyServerError ? (
                    <p style={errorMessageStyle}>
                        An error occurred communicating with the live preview
                        server. Try refreshing the preview window (⌘R)
                    </p>
                ) : localhostUrl && localNetworkUrl ? (
                    <p>
                        Press Cmd + P to preview your frame. <br />
                        <br />
                        <span style={{ fontWeight: "bold" }}>
                            Don't close the preview window — this needs to be
                            open for the local preview server to function
                        </span>
                        <br />
                        <br />
                        Access your project using the following URL: <br />
                        <br />
                        <a
                            style={linkStyle}
                            href={localhostUrl}
                            target={"_blank"}
                        >
                            {localhostUrl}
                        </a>
                        <br />
                        <a
                            style={linkStyle}
                            href={localNetworkUrl}
                            target={"_blank"}
                        >
                            {localNetworkUrl}
                        </a>
                        {additionalHostUrl && (
                            <>
                                <br />
                                <a
                                    style={linkStyle}
                                    href={additionalHostUrl}
                                    target={"_blank"}
                                >
                                    {additionalHostUrl}
                                </a>
                            </>
                        )}
                    </p>
                ) : null}
            </div>
        </Frame>
    )
}

LivePreviewTarget.defaultProps = {
    width: 352,
    height: 250,
    showInstructions: true,
}

// Learn more: https://framer.com/api/property-controls/
addPropertyControls(LivePreviewTarget, {
    proxyServerHost: {
        title: "🖥️ Server",
        type: ControlType.String,
        defaultValue: "http://localhost:8080",
    },
    prototypeIdentifier: {
        title: "🆔 Project",
        type: ControlType.String,
        defaultValue: "my-project",
    },
    showInstructions: {
        title: "👁️ Instructions",
        type: ControlType.Boolean,
        enabledTitle: "Show",
        disabledTitle: "Hide",
        defaultValue: true,
    },
})
