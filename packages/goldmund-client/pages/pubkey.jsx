import SidebarNavigator from "../components/navigation/SidebarNavigator.jsx";
import Meta from "../components/wrappers/Meta.jsx";
import Tooltip from "../components/fragments/Tooltip.jsx";

const PublicKey = () => {

    function copyToClipboard(e) {
        let valueToPersist = document.getElementById("pub-key").innerText
        let ephemeralInputElement = document.createElement("input");
        document.body.appendChild(ephemeralInputElement);
        ephemeralInputElement.value = valueToPersist;
        ephemeralInputElement.select();
        document.execCommand("copy", false);
        ephemeralInputElement.remove();
        alert("[+] The public key has been copied to your clipboard.");
    };

    return (
        <>
            <Meta />
            <div>
                <SidebarNavigator name="$ gpg --import"/>
                <main id="main-collapse">
                <Tooltip message="Click anywhere on the public key to copy to clipboard" position={"left"}>
                    <pre onClick={copyToClipboard} id="pub-key" style={{width: "min-content", whiteSpace: "normal", wordBreak: "normal"}}>
-----BEGIN PGP PUBLIC KEY BLOCK-----

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
JEfIEYA9BrzI/jp1
=5FGM
-----END PGP PUBLIC KEY BLOCK-----
                </pre>
                </Tooltip>
                <div>
        </div>
            </main>
        </div>
    </>
    );
}

export default PublicKey;