import { useState } from "react";

const useFetch = (URL: string) => {
    const [data, setData] = useState<any>(null);
    const [loading, setloading] = useState(true);
    const [error, setError] = useState(null);

    const fetching = () => {
        fetch(URL)
            .then((res: any) => res.json())
            .then((json: any) => {
                setData(json);
                setError(null);
            })
            .catch((err) => {
                setError(err);
                setData(null);
            })
            .finally(() => setloading(false));
    };

    return { data, loading, error, fetching };
};
export default useFetch;
