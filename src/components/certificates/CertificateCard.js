const CertificateCard = ({ certificate }) => {
    const imageMaxWidth = '20rem';

    return (
        <div
            className="card mt-5 p-2"
            style={{ width: imageMaxWidth, height: '21rem' }}
        >
            <img
                src={certificate.url}
                style={{ maxWidth: imageMaxWidth, maxHeight: '14rem' }}
                className="card-img-top"
                alt={certificate.name}
            />
            <div className="card-body">
                <h5 className="card-title">{certificate.name}</h5>
            </div>
        </div>
    );
};

export default CertificateCard;
