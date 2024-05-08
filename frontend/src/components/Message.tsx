
export default function Message({ type, message }: { type: string, message: string }) {

    const getClasses = () => {
        let classes = "alert";
        switch (type) {
            case "success":
                classes += " alert-success";
                break;
            case "error":
                classes += " alert-error";
                break;
            case "warning":
                classes += " alert-warning";
                break;
            case "info":
                classes += " alert-info";
                break;
            default:
                break;
        }
        return classes;
    };

    return (
        <article role="alert" className={getClasses()}>
            <h2 className="text-xl">{message}</h2>
        </article>
    );
}