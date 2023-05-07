import { Col, Empty, Input, Pagination, Row, Skeleton } from "antd";
import { Octokit } from "octokit";
import { useEffect, useState } from "react";
import ErrorMessage from "../component/ErrorMessage";
import UserCard from "../component/UserCard";
import useResponsive from "../hooks/useResponsive";
import DisplaySize from "../types.ts/DisplaySize.enum";

const { Search } = Input;

const initialPaginationSetting = { page: 1, per_page: 5, total: 0 };

export default function Home() {
    const displaySize = useResponsive();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [paginationSetting, setPaginationSetting] = useState(initialPaginationSetting);
    const [searchText, setSearchText] = useState<string>("");
    const [listUser, setListuser] = useState<any[]>([]);
    const [isError, setIsError] = useState<any>();

    useEffect(() => {
        if (!searchText) {
            setListuser([]);
            return;
        }

        function searchUser() {
            setIsLoading(true);

            const octokit = new Octokit({
                auth: process.env.REACT_APP_GITHUB_API_TOKEN,
            });

            octokit
                .request(`GET /search/users`, {
                    q: searchText,
                    page: paginationSetting.page,
                    per_page: paginationSetting.per_page,
                    headers: {
                        "X-GitHub-Api-Version": "2022-11-28",
                    },
                })
                .then((res) => {
                    const resData = res.data;
                    setListuser(resData.items);
                    setPaginationSetting((oldState) => ({
                        ...oldState,
                        total: resData.total_count,
                    }));
                    setIsError(null);
                })
                .catch((err) => {
                    setIsError(err);
                    setListuser([]);
                })
                .finally(() => setIsLoading(false));
        }

        searchUser();
    }, [paginationSetting.page, paginationSetting.per_page, searchText]);

    return (
        <>
            <h1>Github User Search App</h1>
            <Row gutter={16} style={{ marginBottom: "1rem" }}>
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <Search
                        placeholder="Search user"
                        enterButton="Search"
                        size="large"
                        style={{ width: "100%" }}
                        onSearch={(val) => setSearchText(val)}
                        loading={isLoading}
                    />
                </Col>
            </Row>

            <Row gutter={16}>
                {isLoading && (
                    <>
                        {[1, 2, 3].map((_item, idx) => (
                            <Col xs={24} sm={24} md={12} lg={8} xl={8} key={idx}>
                                <Skeleton loading={isLoading} avatar active />
                            </Col>
                        ))}
                    </>
                )}

                <ErrorMessage error={isError} />

                {!isLoading && paginationSetting.total === 0 && (
                    <Col span={24}>
                        <Empty description={!searchText ? "Write username to search" : "No Data"} />
                    </Col>
                )}

                {!isLoading && (
                    <>
                        {listUser.map((user, idx) => (
                            <Col
                                xs={24}
                                sm={24}
                                md={12}
                                lg={8}
                                xl={8}
                                key={idx}
                                style={{ marginBottom: "1rem" }}
                            >
                                <UserCard data={user} />
                            </Col>
                        ))}
                    </>
                )}
            </Row>

            {paginationSetting.total !== 0 && (
                <Row gutter={16} justify="end" style={{ marginTop: "1rem" }}>
                    <Col>
                        <Pagination
                            total={paginationSetting.total}
                            current={paginationSetting.page}
                            pageSize={paginationSetting.per_page}
                            onChange={(page: number, pageSize: number) => {
                                setPaginationSetting({
                                    ...paginationSetting,
                                    page,
                                    per_page: pageSize,
                                });
                            }}
                            showTotal={
                                displaySize < DisplaySize.MobileL
                                    ? undefined
                                    : (total, range) => `${range[0]}-${range[1]} of ${total} items`
                            }
                            pageSizeOptions={[5, 10, 25, 50]}
                            size="small"
                        />
                    </Col>
                </Row>
            )}
        </>
    );
}
