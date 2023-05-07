import { Layout as LayoutANTD } from "antd";

const { Footer: FooterANTD } = LayoutANTD;

export default function Footer() {
    return (
        <FooterANTD style={{ textAlign: "center" }}>
            By :{" "}
            <a
                href="https://geoit.dev"
                target="_blank"
                style={{ color: "black", textDecoration: "none" }}
                rel="noreferrer"
            >
                GeoIT Developer
            </a>
        </FooterANTD>
    );
}
