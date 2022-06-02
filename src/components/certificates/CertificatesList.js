import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import { auth } from '../../firebase/config';
import {
    deleteItemById,
    getStorageItmesByUser,
} from '../../firebase/storageController';
import CertificateCard from './CertificateCard';

const CertificatesList = () => {
    const [certificates, setCertificates] = useState([]);
    const [user, loading] = useAuthState(auth);

    const fetchCertificates = async () => {
        const res = await getStorageItmesByUser();
        if (res.length > 0)
            Promise.all(res)
                .then((items) => setCertificates(items))
                .catch((error) =>
                    toast.error(
                        'Error getting certificate urls. Try again later',
                    ),
                );
    };

    const deleteFile = (id) => {
        deleteItemById(id)
            .then(() => {
                toast.info('Certificate deleted');
                setCertificates(
                    certificates.filter((certificate) => certificate.id != id),
                );
            })
            .catch(() =>
                toast.error('Error when deleting your file. Try again later.'),
            );
    };

    useEffect(() => {
        if (!loading) {
            if (user) fetchCertificates();
        }
    }, [user]);

    return (
        <div className="container border rounded p-5 mt-5">
            <h1 className="text-center">Your Certificates</h1>
            {certificates.length > 0 ? (
                <div className="container text-center">
                    <div className="row">
                        {certificates.map((certificate) => (
                            <div className="col" key={certificate.id}>
                                <CertificateCard
                                    certificate={certificate}
                                    deleteFile={deleteFile}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <h3 className="mt-5">You don't have certificates yet.</h3>
                    <h3>Press the {'"new"'} button to add one.</h3>
                </div>
            )}
        </div>
    );
};

export default CertificatesList;
