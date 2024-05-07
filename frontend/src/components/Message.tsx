
export default function Message({ type, message }: { type: string, message: string }) {
    return (
        <article className="bg-slate-400">
            <p>Type: {type}</p>
            <p>Message: {message}</p>
        </article>
    );
}