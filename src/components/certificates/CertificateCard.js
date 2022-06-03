const CertificateCard = ({ certificate, deleteFile, sharing }) => {
    const imageMaxWidth = '20rem';

    const deleteCertificate = () => {
        if (window.confirm('Are you sure to delete this item?'))
            deleteFile(certificate.id);
    };

    return (
        <div
            className="card mt-5 p-2"
            style={{
                width: imageMaxWidth,
                height: '21rem',
            }}
        >
            <img
                src={certificate.url}
                style={{ maxWidth: imageMaxWidth, maxHeight: '13rem' }}
                className="card-img-top"
                alt={certificate.name}
            />
            <div className="card-body">
                <h5 className="card-title">{certificate.name}</h5>
                {!sharing && (
                    <button
                        className="btn btn-danger"
                        onClick={deleteCertificate}
                    >
                        Delete Certificate
                    </button>
                )}
            </div>
        </div>
    );
};

export default CertificateCard;
