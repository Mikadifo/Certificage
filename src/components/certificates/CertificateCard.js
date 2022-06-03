import './CertificateCard.css';

const CertificateCard = ({
    certificate,
    deleteFile,
    sharing,
    setExpandedCertificate,
}) => {
    const deleteCertificate = () => {
        if (window.confirm('Are you sure to delete this item?'))
            deleteFile(certificate.id);
    };

    return (
        <div className="card mt-5 p-2 certificate-container">
            <img
                src={certificate.url}
                className="card-img-top certificate-img"
                alt={certificate.name}
                onClick={() => setExpandedCertificate(certificate)}
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
