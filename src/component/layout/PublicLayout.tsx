import { Layout as LayoutANTD, theme } from "antd";
import { ReactNode } from "react";
import Footer from "./Footer";

const { Header, Content } = LayoutANTD;

export default function PublicLayout({ children }: Props) {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <LayoutANTD
            style={{
                minHeight: "100vh",
            }}
        >
            <Header style={{ paddingInline: "16px" }}>
                <div style={{ display: "flex" }}>
                    <div
                        className="logo"
                        style={{
                            width: "10rem",
                            textAlign: "center",
                            fontWeight: "bold",
                        }}
                    >
                        <span
                            style={{
                                backgroundColor: "whitesmoke",
                                padding: "12px 50px",
                                opacity: "65%",
                            }}
                        >
                            LOGO
                        </span>
                    </div>
                </div>
            </Header>
            <Content
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                    background: colorBgContainer,
                }}
            >
                {children}
            </Content>
            <Footer />
        </LayoutANTD>
    );
}

interface Props {
    children?: ReactNode;
}
