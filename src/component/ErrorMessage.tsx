export default function ErrorMessage({ error }: { error: any }) {
    return (
        <>{error && <pre style={{ color: "red" }}>{JSON.stringify(error, undefined, 2)}</pre>}</>
    );
}
