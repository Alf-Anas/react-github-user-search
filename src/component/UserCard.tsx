import { Avatar, Button, Collapse, Empty, Skeleton } from "antd";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { GetSearchUserResponseItem } from "../types.ts/GetSearchUserResponse";
import { RepositoryResponse } from "../types.ts/RepositoryResponse";
import ErrorMessage from "./ErrorMessage";
import RepositoryCard from "./RepositoryCard";

const { Panel } = Collapse;

const initialCount = { open: 5, all: 0, more: 0 };

export default function UserCard({ data }: { data: GetSearchUserResponseItem }) {
    const listRepo = useFetch(data.repos_url);
    const [listRepoOpen, setListRepoOpen] = useState<RepositoryResponse[]>([]);
    const [count, setCount] = useState(initialCount);

    function collapseOnChange(key: string | string[]) {
        const username = key[0];
        if (username && listRepoOpen.length <= 0) {
            listRepo.fetching();
        }
    }

    useEffect(() => {
        const listRepoData = listRepo.data;
        if (Array.isArray(listRepoData)) {
            const sliced = listRepoData.slice(0, count.open);
            setListRepoOpen(sliced);
            setCount((oldState) => ({
                ...oldState,
                all: listRepoData.length,
                more: listRepoData.length - count.open,
            }));
        }
    }, [count.open, listRepo.data]);

    return (
        <Collapse onChange={collapseOnChange}>
            <Panel
                header={
                    <span>
                        <Avatar
                            src={<img src={data.avatar_url} alt="avatar" />}
                            style={{ marginRight: "0.5rem" }}
                        />
                        <b>{data.login} </b>
                    </span>
                }
                key={data.login}
            >
                {listRepo.loading && (
                    <>
                        {[1, 2, 3].map((_item, idx) => (
                            <Skeleton loading={listRepo.loading} active key={idx} />
                        ))}
                    </>
                )}

                <ErrorMessage error={listRepo.error} />

                {!listRepo.loading && listRepoOpen.length === 0 && (
                    <Empty description="Repository does not exist!" />
                )}
                {listRepoOpen.map((repo, idx) => (
                    <RepositoryCard data={repo} key={idx} />
                ))}
                {count.more > 0 && (
                    <Button
                        type="dashed"
                        block
                        onClick={() => setCount({ ...count, open: count.open + 5 })}
                    >
                        View more ({count.open}/{count.all})
                    </Button>
                )}
            </Panel>
        </Collapse>
    );
}
