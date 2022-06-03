import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../../firebase/config';
import {
    deleteItemById,
    getStorageItemsByUser,
} from '../../firebase/storageController';
import { fetchUserEmailByUid } from '../../firebase/userController';
import CertificateCard from './CertificateCard';
import ViewCertificate from './ViewCertificate';

const CertificatesList = ({ sharing }) => {
    const [certificates, setCertificates] = useState([]);
    const [user, loading] = useAuthState(auth);
    const [userEmail, setUserEmail] = useState('');
    const [expandedCertificate, setExpandedCertificate] = useState({});
    const sharingUid = useParams();

    const fetchCertificates = async () => {
        if (sharing)
            setUserEmail(await fetchUserEmailByUid(sharingUid.sharingUid));
        const res = await getStorageItemsByUser(
            sharing ? sharingUid.sharingUid : user.uid,
        );
        if (res.length > 0)
            Promise.all(res)
                .then((items) => setCertificates(items))
                .catch(() =>
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
        if (!loading || sharing) {
            if (user) fetchCertificates();
        }
    }, [user]);

    if (!user)
        return (
            <div className="container border rounded p-5 mt-5">
                Sorry. For security terms you must be logged in to see this
                user's certificates.
            </div>
        );

    return (
        <div className="container border rounded p-5 mt-5">
            <h1 className="text-center">
                {sharing && userEmail
                    ? `${userEmail}'s Certificates`
                    : 'Your Certificates'}
            </h1>
            {certificates.length > 0 ? (
                expandedCertificate.name ? (
                    <ViewCertificate
                        certificate={expandedCertificate}
                        setExpandedCertificate={setExpandedCertificate}
                    />
                ) : (
                    <div className="container text-center">
                        <div className="row">
                            {certificates.map((certificate) => (
                                <div className="col" key={certificate.id}>
                                    <CertificateCard
                                        certificate={certificate}
                                        deleteFile={deleteFile}
                                        sharing={sharing}
                                        setExpandedCertificate={
                                            setExpandedCertificate
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )
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
