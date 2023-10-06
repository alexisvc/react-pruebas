export const Pictogram = ({pictogram}) => {
    return (
        <div key={pictogram.id}>
        <strong><p>{pictogram.id}.- {pictogram.name}</p></strong>
        <p>{pictogram.url}</p>
        </div>
        )
    }