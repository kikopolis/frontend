export default function Error({error}: { error: string | null }) {
    return (
        <div className={'row'}>
            {error ?
                <div className={'alert alert-danger col-6 mx-auto mt-4'}>
                    <h4 className={'alert-heading'}>Error has occurred</h4>
                    <p className={'alert-info'}>{error}</p>
                </div>
                : null
            }
        </div>
    );
}
