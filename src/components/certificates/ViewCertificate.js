import './ViewCertificate.css';

const ViewCertificate = ({ certificate, setExpandedCertificate }) => {
    if (!certificate.name) return null;

    return (
        <>
            <div className="view-container text-center">
                <div className="container">
                    <h1>{certificate.name}</h1>
                    <div className="mt-5">
                        <img
                            src={certificate.url}
                            alt={certificate.name}
                            className="img-view"
                        />
                    </div>
                    <div className="text-center">
                        <button
                            className="btn btn-danger mt-5"
                            onClick={() => setExpandedCertificate({})}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewCertificate;
