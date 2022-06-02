import CertificateCard from './CertificateCard';

const CertificatesList = () => {
    return (
        <div className="container border rounded p-5 mt-5">
            <h1 className="text-center">Your Certificates</h1>
            <CertificateCard />
        </div>
    );
};

export default CertificatesList;
