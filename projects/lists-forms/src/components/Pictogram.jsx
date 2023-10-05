export const Pictogram = ({pictogram}) => {
    return (
        <div key={pictogram.id}>
        <strong><p>{pictogram.id}.- {pictogram.title}</p></strong>
        <p>{pictogram.body}</p>
        </div>
        )
    }