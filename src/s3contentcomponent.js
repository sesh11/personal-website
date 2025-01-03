import React, { useState, useEffect } from 'react';

const S3Content = ({ bucketPath, fileName, className }) => {

    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchContent = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/s3content?bucketPath=${bucketPath}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch content');
                }           
                const data = await response.text();
                setContent(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, [bucketPath, fileName]);
    
    if (loading) {
        return <div className="text-gray-600">Loading...</div>
    }

    if (error) {
        return <div className="text-red-500">Error: {error.message}</div>
    }

    return (
        <div className={className}>
            {content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                    {paragraph}
                </p>
            )
            )}
        </div>
    );
};

export default S3Content;