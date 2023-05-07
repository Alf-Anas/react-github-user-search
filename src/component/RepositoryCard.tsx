import { Card, Space } from "antd";
import { RepositoryResponse } from "../types.ts/RepositoryResponse";
import { EyeOutlined, ForkOutlined, LinkOutlined, StarOutlined } from "@ant-design/icons";

export default function RepositoryCard({ data }: { data: RepositoryResponse }) {
    return (
        <Card
            size="small"
            title={data.name}
            extra={
                <a href={data.html_url} target="_blank" rel="noreferrer">
                    <LinkOutlined /> Open
                </a>
            }
            style={{ marginBottom: "0.5rem" }}
        >
            <p>{data.description || "-"}</p>
            <Space size={16}>
                <span>
                    <EyeOutlined /> {data.watchers_count}
                </span>
                <span>
                    <ForkOutlined /> {data.forks_count}
                </span>
                <span>
                    <StarOutlined /> {data.stargazers_count}
                </span>
            </Space>
        </Card>
    );
}
